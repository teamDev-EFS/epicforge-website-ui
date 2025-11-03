import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import {
  ColDef,
  GridApi,
  ColumnApi,
  GridReadyEvent,
  RowClickedEvent,
  SelectionChangedEvent,
} from "ag-grid-community";
import {
  MessageSquare,
  Mail,
  AlertCircle,
  Search,
  RefreshCw,
  Download,
  Filter,
  Columns,
  Save,
  X,
  Eye,
  Trash2,
  MoreVertical,
  Copy,
  CheckCircle2,
  ExternalLink,
  Phone,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Notification {
  _id: string;
  type: string;
  date: string;
  path: string;
  metadata: any;
}

interface NotificationGridProps {
  notifications: Notification[];
  onRefresh: () => void;
  onDelete: (id: string) => void;
}

// Production: Uses VITE_API_BASE_URL from environment variables (Render backend)
// Development: Falls back to localhost:5000/api if not set
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const NotificationGrid: React.FC<NotificationGridProps> = ({
  notifications,
  onRefresh,
  onDelete,
}) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columnApi, setColumnApi] = useState<ColumnApi | null>(null);
  const [quickFilterText, setQuickFilterText] = useState("");
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [savedViews, setSavedViews] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState("Default View");
  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [density, setDensity] = useState<"compact" | "comfortable">("compact");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [filterChips, setFilterChips] = useState<Array<{ field: string; value: string }>>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved views from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notificationViews");
    if (saved) {
      const views = JSON.parse(saved);
      setSavedViews(views.map((v: any) => v.name || v));
    }
  }, []);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Enter" && gridApi && selectedRows.length === 1) {
        handleView(selectedRows[0]);
      }
      if (e.key === "Escape" && showDrawer) {
        setShowDrawer(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gridApi, selectedRows, showDrawer]);

  const handleView = (data: Notification) => {
    setSelectedNotification(data);
    setShowDrawer(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      onDelete(id);
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    if (window.confirm(`Delete ${selectedRows.length} notification(s)?`)) {
      selectedRows.forEach((row) => onDelete(row._id));
      setSelectedRows([]);
    }
  };

  const handleExport = () => {
    if (!gridApi) return;
    gridApi.exportDataAsCsv({
      fileName: `notifications_${new Date().toISOString().split("T")[0]}.csv`,
    });
  };

  const handleSaveView = () => {
    if (!gridApi || !columnApi) return;
    const viewName = prompt("Enter a name for this view:");
    if (!viewName) return;
    
    const view = {
      name: viewName,
      quickFilter: quickFilterText,
      columnState: columnApi.getColumnState(),
      sortModel: gridApi.getSortModel(),
      filterModel: gridApi.getFilterModel(),
      density,
    };
    const views = JSON.parse(localStorage.getItem("notificationViews") || "[]");
    const updated = views.filter((v: any) => (v.name || v) !== viewName);
    updated.push(view);
    localStorage.setItem("notificationViews", JSON.stringify(updated));
    setSavedViews(updated.map((v: any) => v.name || v));
    setCurrentView(viewName);
  };

  const handleLoadView = (viewName: string) => {
    if (viewName === "Default View") {
      if (gridApi && columnApi) {
        setQuickFilterText("");
        gridApi.setFilterModel(null);
        gridApi.setSortModel([]);
        columnApi.resetColumnState();
        setFilterChips([]);
      }
      setCurrentView("Default View");
      return;
    }
    
    const views = JSON.parse(localStorage.getItem("notificationViews") || "[]");
    const view = views.find((v: any) => (v.name || v) === viewName);
    if (view && gridApi && columnApi) {
      setQuickFilterText(view.quickFilter || "");
      if (view.columnState) columnApi.applyColumnState({ state: view.columnState });
      if (view.sortModel) gridApi.setSortModel(view.sortModel);
      if (view.filterModel) gridApi.setFilterModel(view.filterModel);
      if (view.density) setDensity(view.density);
      setCurrentView(viewName);
      
      // Update filter chips from filter model
      const chips: Array<{ field: string; value: string }> = [];
      if (view.filterModel) {
        Object.keys(view.filterModel).forEach((field) => {
          const filter = view.filterModel[field];
          if (filter.filter) {
            chips.push({ field, value: filter.filter });
          }
        });
      }
      setFilterChips(chips);
    }
  };

  // Premium cell renderers
  const typeCellRenderer = (params: any) => {
    const typeMap: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
      whatsapp_click: {
        icon: <MessageSquare size={14} />,
        color: "bg-teal-500/20 text-teal-400 border-teal-500/40",
        label: "WhatsApp Chat",
      },
      audit_request: {
        icon: <Mail size={14} />,
        color: "bg-blue-500/20 text-blue-400 border-blue-500/40",
        label: "Audit Request",
      },
      email: {
        icon: <Mail size={12} />,
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        label: "Email",
      },
      error: {
        icon: <AlertCircle size={12} />,
        color: "bg-red-500/20 text-red-400 border-red-500/30",
        label: "Error",
      },
    };

    const typeInfo = typeMap[params.value] || {
      icon: <Mail size={14} />,
      color: "bg-purple-500/20 text-purple-400 border-purple-500/40",
      label: params.value,
    };

    return (
      <div className="flex items-center h-full">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${typeInfo.color} text-xs font-semibold shadow-sm`}
          title={typeInfo.label}
        >
          <span className="flex items-center justify-center leading-none">{typeInfo.icon}</span>
          <span className="leading-tight">{typeInfo.label}</span>
        </span>
      </div>
    );
  };

  const nameCellRenderer = (params: any) => {
    const name = params.data?.metadata?.name || "N/A";
    const isNA = name === "N/A";

    return (
      <div
        className="flex items-center h-full cursor-pointer group"
        onClick={() => handleView(params.data)}
      >
        <span className={`font-semibold text-sm transition-colors ${isNA ? "text-slate-400" : "text-white group-hover:text-teal-400"}`}>
          {name}
        </span>
      </div>
    );
  };

  const emailCellRenderer = (params: any) => {
    const email = params.data?.metadata?.email;
    if (!email || email === "N/A") {
      return <span className="text-slate-400 text-sm">—</span>;
    }

    const handleCopy = (e: React.MouseEvent) => {
      e.stopPropagation();
      navigator.clipboard.writeText(email);
      // Toast would go here
    };

    return (
      <div className="flex items-center h-full gap-2 group">
        <span className="text-sm text-slate-200">{email}</span>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-700/50 rounded"
          title="Copy email"
          aria-label="Copy email to clipboard"
        >
          <Copy size={14} className="text-slate-400 hover:text-teal-400" />
        </button>
      </div>
    );
  };

  const phoneCellRenderer = (params: any) => {
    const phone = params.data?.metadata?.phone;
    if (!phone || phone === "N/A") {
      return <span className="text-slate-400 text-sm">—</span>;
    }

    return (
      <div className="flex items-center h-full">
        <a
          href={`tel:${phone}`}
          className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Phone size={14} />
          <span>{phone}</span>
        </a>
      </div>
    );
  };

  const sourceCellRenderer = (params: any) => {
    const source = params.data?.metadata?.source || "N/A";
    if (source === "N/A") {
      return <span className="text-slate-400 text-sm">—</span>;
    }

    const formatted = source
      .replace(/_/g, " ")
      .split(" ")
      .map((w: string) => w.toUpperCase())
      .join(" · ");

    return (
      <div className="flex items-center h-full">
        <span className="px-2.5 py-1.5 bg-slate-800/60 text-slate-200 rounded-md text-xs font-semibold border border-slate-700/50 uppercase tracking-wide" title={source}>
          {formatted}
        </span>
      </div>
    );
  };

  const projectCellRenderer = (params: any) => {
    const project = params.data?.metadata?.projectType || params.data?.metadata?.businessType || "N/A";
    if (project === "N/A") {
      return <span className="text-slate-400 text-sm">—</span>;
    }

    const colorMap: Record<string, string> = {
      Website: "bg-blue-500/20 text-blue-400 border-blue-500/40",
      "Mobile App": "bg-indigo-500/20 text-indigo-400 border-indigo-500/40",
      AI: "bg-purple-500/20 text-purple-400 border-purple-500/40",
      Automation: "bg-purple-500/20 text-purple-400 border-purple-500/40",
      ERP: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    };

    const color = colorMap[project] || "bg-slate-700/60 text-slate-300 border-slate-600/50";

    return (
      <div className="flex items-center h-full">
        <span className={`px-2.5 py-1.5 rounded-md border text-xs font-semibold ${color}`}>{project}</span>
      </div>
    );
  };

  const detailsCellRenderer = (params: any) => {
    const metadata = params.data?.metadata || {};
    const parts: string[] = [];
    if (metadata.name) parts.push(`Name: ${metadata.name}`);
    if (metadata.source) parts.push(`Source: ${metadata.source}`);
    if (metadata.projectType) parts.push(`Project: ${metadata.projectType}`);

    const text = parts.join(" | ") || "No details";
    const truncated = text.length > 100 ? text.substring(0, 100) + "..." : text;

    return (
      <div className="flex items-center h-full">
        <span className="text-xs text-slate-300 leading-relaxed" title={text}>
          {truncated}
        </span>
      </div>
    );
  };

  const dateCellRenderer = (params: any) => {
    const date = new Date(params.value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    let relative = "Just now";
    if (diffMins >= 60) {
      relative = `${diffHours}h ago`;
    } else if (diffMins > 0) {
      relative = `${diffMins}m ago`;
    } else if (diffDays >= 1) {
      relative = `${diffDays}d ago`;
    }

    const absolute = date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div className="flex flex-col h-full justify-center cursor-help" title={absolute}>
        <span className="text-sm text-white font-semibold mb-0.5">{relative}</span>
        <span className="text-xs text-slate-400">{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
      </div>
    );
  };

  const pathCellRenderer = (params: any) => {
    const path = params.value || "/";
    return (
      <div className="flex items-center h-full">
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition-colors group"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="truncate max-w-[80px]">{path}</span>
          <ExternalLink size={12} className="opacity-70 group-hover:opacity-100" />
        </a>
      </div>
    );
  };

  const actionsCellRenderer = (params: any) => {
    return (
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleView(params.data);
          }}
          className="p-2 text-teal-400 hover:text-white hover:bg-teal-500/20 rounded-md transition-all duration-200 border border-transparent hover:border-teal-500/30"
          title="View details"
          aria-label="View notification details"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(params.data._id);
          }}
          className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-md transition-all duration-200 border border-transparent hover:border-red-500/30"
          title="Delete notification"
          aria-label="Delete notification"
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "",
        width: 60,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        pinned: "left",
        lockPosition: true,
        sortable: false,
        filter: false,
        suppressMenu: true,
        cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        headerClass: 'ag-header-cell-checkbox',
      },
      {
        field: "type",
        headerName: "Type",
        width: 170,
        cellRenderer: typeCellRenderer,
        filter: true,
        sortable: true,
        pinned: "left",
        lockPosition: true,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        cellRenderer: nameCellRenderer,
        valueGetter: (params) => params.data?.metadata?.name || "N/A",
        filter: "agTextColumnFilter",
        sortable: true,
        lockPosition: true,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: "email",
        headerName: "Email",
        width: 240,
        cellRenderer: emailCellRenderer,
        valueGetter: (params) => params.data?.metadata?.email || "N/A",
        filter: "agTextColumnFilter",
        sortable: true,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 160,
        cellRenderer: phoneCellRenderer,
        valueGetter: (params) => params.data?.metadata?.phone || "N/A",
        filter: "agTextColumnFilter",
        sortable: true,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: "company",
        headerName: "Company",
        width: 180,
        valueGetter: (params) => params.data?.metadata?.company || "N/A",
        cellRenderer: (params: any) => {
          const company = params.value;
          if (company === "N/A") {
            return <span className="text-slate-400 text-sm">—</span>;
          }
          return (
            <div className="flex items-center h-full">
              <span className="px-2.5 py-1.5 bg-slate-800/40 text-slate-200 rounded-md text-xs font-medium border border-slate-700/50">
                {company}
              </span>
            </div>
          );
        },
        filter: "agTextColumnFilter",
        sortable: true,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: "source",
        headerName: "Source",
        width: 150,
        cellRenderer: sourceCellRenderer,
        valueGetter: (params) => params.data?.metadata?.source || "N/A",
        filter: true,
        sortable: true,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: "project",
        headerName: "Project",
        width: 150,
        cellRenderer: projectCellRenderer,
        valueGetter: (params) =>
          params.data?.metadata?.projectType || params.data?.metadata?.businessType || "N/A",
        filter: true,
        sortable: true,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: "details",
        headerName: "Details",
        flex: 1,
        minWidth: 250,
        cellRenderer: detailsCellRenderer,
        filter: "agTextColumnFilter",
        sortable: false,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: "date",
        headerName: "Date & Time",
        width: 180,
        cellRenderer: dateCellRenderer,
        filter: "agDateColumnFilter",
        sortable: true,
        sort: "desc",
        comparator: (valueA, valueB) => new Date(valueA).getTime() - new Date(valueB).getTime(),
        filterParams: {
          comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
            const cellDate = new Date(cellValue);
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
          browserDatePicker: true,
        },
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: "path",
        headerName: "Path",
        width: 140,
        cellRenderer: pathCellRenderer,
        filter: "agTextColumnFilter",
        sortable: true,
        cellStyle: { display: 'flex', alignItems: 'center' },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        cellRenderer: actionsCellRenderer,
        sortable: false,
        filter: false,
        pinned: "right",
        lockPosition: true,
        cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
      },
    ],
    []
  );

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };

  const onSelectionChanged = (params: SelectionChangedEvent) => {
    const selected = params.api.getSelectedRows();
    setSelectedRows(selected);
  };

  const onRowClicked = (params: RowClickedEvent) => {
    handleView(params.data);
  };

  const onFilterChanged = () => {
    if (!gridApi) return;
    const filterModel = gridApi.getFilterModel();
    const chips: Array<{ field: string; value: string }> = [];
    
    Object.keys(filterModel).forEach((field) => {
      const filter = filterModel[field];
      if (filter.filter) {
        chips.push({ field, value: filter.filter });
      } else if (filter.filterType === "set") {
        chips.push({ field, value: `${filter.values?.length || 0} selected` });
      } else if (filter.dateFrom || filter.dateTo) {
        chips.push({ 
          field, 
          value: `${filter.dateFrom || ""} to ${filter.dateTo || ""}` 
        });
      }
    });
    
    setFilterChips(chips);
  };

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      menuTabs: ["filterMenuTab", "generalMenuTab"],
      filterParams: {
        suppressAndOrCondition: false,
        buttons: ["reset", "apply"],
      },
    }),
    []
  );

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-bold text-white">Notifications</h2>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Quick search... (Press /)"
                value={quickFilterText}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuickFilterText(value);
                  // Debounce quick filter for performance
                  if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                  }
                  searchTimeoutRef.current = setTimeout(() => {
                    if (gridApi) {
                      gridApi.setQuickFilter(value);
                    }
                  }, 150);
                }}
                className="pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm"
              />
            </div>
            <div className="relative">
              <select
                value={currentView}
                onChange={(e) => handleLoadView(e.target.value)}
                className="pl-3 pr-8 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm appearance-none cursor-pointer"
              >
                <option>Default View</option>
                {savedViews.map((view) => (
                  <option key={view} value={view}>
                    {view}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
            <button
              onClick={handleSaveView}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white text-sm transition-colors flex items-center space-x-2"
              title="Save current view"
            >
              <Save size={14} />
              <span>Save View</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onRefresh}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white text-sm transition-colors flex items-center space-x-2"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setDensity(density === "compact" ? "comfortable" : "compact")}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white text-sm transition-colors"
            >
              {density === "compact" ? "Comfortable" : "Compact"}
            </button>
            <button
              onClick={() => {
                if (gridApi) {
                  gridApi.setFilterModel(null);
                  setQuickFilterText("");
                  setFilterChips([]);
                }
              }}
              className="px-3 py-2 text-slate-400 hover:text-white text-sm transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        {filterChips.length > 0 && (
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            {filterChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs"
              >
                <span>{chip.field}: {chip.value}</span>
                <button
                  onClick={() => {
                    const updated = filterChips.filter((_, i) => i !== idx);
                    setFilterChips(updated);
                  }}
                  className="hover:text-white"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-sm text-slate-400">
              {selectedRows.length} selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded text-sm transition-colors flex items-center space-x-1"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-sm transition-colors flex items-center space-x-1"
            >
              <Download size={14} />
              <span>Export Selected</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div
        className="ag-theme-quartz"
        style={{
          height: 600,
          width: "100%",
        }}
      >
        <AgGridReact
          rowData={notifications}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          onRowClicked={onRowClicked}
          onFilterChanged={onFilterChanged}
          rowSelection="multiple"
          suppressRowClickSelection={false}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[20, 50, 100, 500]}
          animateRows={true}
          rowHeight={density === "compact" ? 52 : 64}
          suppressCellFocus={false}
          rowModelType="clientSide"
          enableRangeSelection={true}
          enableCharts={false}
          suppressMenuHide={false}
        />
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between text-sm text-slate-400">
        <div className="flex items-center space-x-4">
          <span>
            {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
          </span>
          {selectedRows.length > 0 && (
            <span className="text-teal-400">
              {selectedRows.length} selected
            </span>
          )}
          {gridApi && (
            <span>
              Showing {((gridApi.paginationGetCurrentPage() || 0) * (gridApi.paginationGetPageSize() || 20)) + 1}-
              {Math.min(((gridApi.paginationGetCurrentPage() || 0) + 1) * (gridApi.paginationGetPageSize() || 20), notifications.length)} of{" "}
              {notifications.length}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-500">← → arrow keys to navigate pages</span>
        </div>
      </div>

      {/* Right Drawer */}
      <AnimatePresence>
        {showDrawer && selectedNotification && (
          <NotificationDrawer
            notification={selectedNotification}
            onClose={() => setShowDrawer(false)}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Drawer Component
interface NotificationDrawerProps {
  notification: Notification;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  notification,
  onClose,
  onDelete,
}) => {
  const metadata = notification.metadata || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        className="w-full max-w-[560px] h-full bg-slate-900 border-l border-slate-800 shadow-2xl overflow-y-auto"
      >
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs font-medium capitalize">
                  {notification.type.replace("_", " ")}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                {metadata.name || "Unknown User"}
              </h3>
              <p className="text-sm text-slate-400">
                {new Date(notification.date).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-400 hover:text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Core Fields */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Contact Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {metadata.name && (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Name</label>
                  <p className="text-white font-medium">{metadata.name}</p>
                </div>
              )}
              {metadata.email && (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Email</label>
                  <p className="text-white">{metadata.email}</p>
                </div>
              )}
              {metadata.phone && (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Phone</label>
                  <p className="text-white">{metadata.phone}</p>
                </div>
              )}
              {metadata.company && (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Company</label>
                  <p className="text-white">{metadata.company}</p>
                </div>
              )}
            </div>
          </div>

          {/* Context */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Context
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {metadata.source && (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Source</label>
                  <p className="text-white capitalize">{metadata.source.replace("_", " ")}</p>
                </div>
              )}
              {metadata.projectType && (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Project</label>
                  <p className="text-white">{metadata.projectType}</p>
                </div>
              )}
              {notification.path && (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Path</label>
                  <p className="text-white">{notification.path}</p>
                </div>
              )}
            </div>
          </div>

          {/* Message/Details */}
          {(metadata.problem || metadata.message || metadata.currentChallenges) && (
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                Details
              </h4>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <pre className="text-sm text-white whitespace-pre-wrap font-sans">
                  {metadata.problem || metadata.message || metadata.currentChallenges}
                </pre>
              </div>
            </div>
          )}

          {/* Raw Payload */}
          <div>
            <details className="cursor-pointer">
              <summary className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                Raw Payload
              </summary>
              <div className="mt-3 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <pre className="text-xs text-slate-300 overflow-auto font-mono">
                  {JSON.stringify(metadata, null, 2)}
                </pre>
              </div>
            </details>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 p-6">
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
            {metadata.email && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(metadata.email);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Copy size={14} />
                <span>Copy Email</span>
              </button>
            )}
            {metadata.phone && (
              <a
                href={`https://wa.me/${metadata.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <MessageSquare size={14} />
                <span>WhatsApp</span>
              </a>
            )}
            <button
              onClick={() => onDelete(notification._id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

