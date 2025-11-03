import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Contact,
  FileText,
  Briefcase,
  UserCheck,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  RefreshCw,
  Eye,
  Clock,
  MapPin,
  MessageSquare,
  Mail,
  Cpu,
  AlertCircle,
  Download,
  Filter,
  Columns,
  Save,
  ChevronDown,
  Copy,
  Trash2,
  MoreVertical,
  Check,
  CheckCircle2,
  ExternalLink,
  Phone,
} from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { NotificationGrid } from "../components/NotificationGrid";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Production: Uses VITE_API_BASE_URL from environment variables (Render backend)
// Development: Falls back to localhost:5000/api if not set
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface MetricData {
  totalVisitors: number;
  totalFootfalls: number;
  totalCookies: number;
  totalAuditRequests: number;
  totalWhatsAppClicks: number;
  dailyVisitors: { date: string; count: number; uniqueCount: number }[];
  dailyFootfalls: { date: string; count: number }[];
}

interface Notification {
  _id: string;
  type: string;
  date: string;
  path: string;
  metadata: any;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    // Try to get user from localStorage first
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } catch (e) {
        // Fallback to API
        fetchUserInfo();
      }
    } else {
      // Fetch user info
      fetchUserInfo();
    }
    // Fetch metrics and notifications
    fetchMetrics();
    fetchNotifications();
    
    // Set up periodic refresh
    const interval = setInterval(() => {
      fetchMetrics();
      fetchNotifications();
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [currentView]);

  const fetchUserInfo = async () => {
    // User info is stored in localStorage after login
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/analytics/metrics?days=30`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/analytics/activity?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const allActivities = data.activities || [];
        
        // Filter only actionable notifications (not visitor/footfall/cookie)
        const actionableTypes = ["whatsapp_click", "audit_request"];
        const actionableNotifications = allActivities.filter((n: any) =>
          actionableTypes.includes(n.type)
        );
        
        setNotifications(actionableNotifications);
        
        // Count unread notifications (last 24 hours) - only actionable ones
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        const recent = actionableNotifications.filter(
          (n: any) => new Date(n.date) > oneDayAgo
        );
        setNotificationCount(recent.length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "contacts", label: "Contacts", icon: Contact },
    { id: "leads", label: "Leads", icon: FileText },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "team", label: "Team", icon: UserCheck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900 border-r border-slate-800 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } fixed left-0 top-0 bottom-0 z-40`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Toggle */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EF</span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">EpicForge</div>
                  <div className="text-xs text-slate-400">Admin Portal</div>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-teal-600 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon size={20} />
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Info */}
          {sidebarOpen && user && (
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">
                    {user.name}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {user.email}
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white capitalize">
              {currentView === "dashboard"
                ? "Dashboard"
                : menuItems.find((m) => m.id === currentView)?.label || ""}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <Search size={20} />
            </button>
            <button 
              onClick={() => { fetchMetrics(); fetchNotifications(); }}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RefreshCw size={20} />
            </button>
            {/* Notifications Icon with Badge */}
            <button
              onClick={() => setCurrentView("notifications")}
              className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              View Store
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-400 hover:text-white hover:bg-red-900/20 rounded-lg transition-colors flex items-center space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
            {!sidebarOpen && user && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {currentView === "dashboard" && <DashboardView metrics={metrics} notifications={notifications} />}
          {currentView === "users" && <UsersView />}
          {currentView === "contacts" && <ContactsView />}
          {currentView === "leads" && <LeadsView />}
          {currentView === "services" && <ServicesView />}
          {currentView === "team" && <TeamView />}
          {currentView === "notifications" && <NotificationsView notifications={notifications} />}
          {currentView === "settings" && <SettingsView />}
        </main>
      </div>
    </div>
  );
};

// View Components
const DashboardView: React.FC<{ metrics: any; notifications: any[] }> = ({ metrics, notifications }) => {
  // Prepare chart data
  const visitorChartData = metrics?.dailyVisitors?.map((d: any) => [
    new Date(d.date).getTime(),
    d.uniqueCount || d.count || 0,
  ]) || [];
  
  const footfallChartData = metrics?.dailyFootfalls?.map((d: any) => [
    new Date(d.date).getTime(),
    d.count || 0,
  ]) || [];

  const visitorChartOptions: Highcharts.Options = {
    chart: { type: "line", backgroundColor: "#0f172a", height: 300 },
    title: { text: "Daily Visitors (Last 30 Days)", style: { color: "#e2e8f0" } },
    xAxis: { type: "datetime", labels: { style: { color: "#94a3b8" } } },
    yAxis: { title: { text: "Visitors", style: { color: "#94a3b8" } }, labels: { style: { color: "#94a3b8" } } },
    series: [{ name: "Visitors", type: "line", data: visitorChartData, color: "#14b8a6" }],
    legend: { itemStyle: { color: "#e2e8f0" } },
    credits: { enabled: false },
    plotOptions: { line: { marker: { enabled: true } } },
  };

  const footfallChartOptions: Highcharts.Options = {
    chart: { type: "column", backgroundColor: "#0f172a", height: 300 },
    title: { text: "Daily Footfalls (Last 30 Days)", style: { color: "#e2e8f0" } },
    xAxis: { type: "datetime", labels: { style: { color: "#94a3b8" } } },
    yAxis: { title: { text: "Footfalls", style: { color: "#94a3b8" } }, labels: { style: { color: "#94a3b8" } } },
    series: [{ name: "Footfalls", type: "column", data: footfallChartData, color: "#8b5cf6" }],
    legend: { itemStyle: { color: "#e2e8f0" } },
    credits: { enabled: false },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Daily Visitors"
          value={metrics?.totalVisitors?.toLocaleString() || "0"}
          icon={Users}
          color="from-teal-600 to-indigo-600"
        />
        <StatCard
          title="Footfalls"
          value={metrics?.totalFootfalls?.toLocaleString() || "0"}
          icon={Contact}
          color="from-blue-600 to-cyan-600"
        />
        <StatCard
          title="Cookies Collected"
          value={metrics?.totalCookies?.toLocaleString() || "0"}
          icon={FileText}
          color="from-purple-600 to-pink-600"
        />
        <StatCard
          title="Audit Requests"
          value={metrics?.totalAuditRequests?.toLocaleString() || "0"}
          icon={Briefcase}
          color="from-orange-600 to-red-600"
        />
        <StatCard
          title="WhatsApp Clicks"
          value={metrics?.totalWhatsAppClicks?.toLocaleString() || "0"}
          icon={Bell}
          color="from-green-600 to-emerald-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <HighchartsReact highcharts={Highcharts} options={visitorChartOptions} />
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <HighchartsReact highcharts={Highcharts} options={footfallChartOptions} />
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
        <div className="ag-theme-quartz" style={{ height: 400 }}>
          <AgGridReact
            rowData={notifications.slice(0, 20)}
            columnDefs={[
              { field: "type", headerName: "Type", width: 150, cellRenderer: (params: any) => {
                const typeMap: Record<string, string> = {
                  visitor: "👤 Visitor",
                  footfall: "👣 Footfall",
                  cookie: "🍪 Cookie",
                  audit_request: "📋 Audit Request",
                  whatsapp_click: "📱 WhatsApp Click",
                };
                return typeMap[params.value] || params.value;
              }},
              { field: "date", headerName: "Date", width: 200, cellRenderer: (params: any) => {
                return new Date(params.value).toLocaleString();
              }},
              { field: "path", headerName: "Path", width: 200 },
              { field: "metadata", headerName: "Details", flex: 1, cellRenderer: (params: any) => {
                return params.value ? JSON.stringify(params.value).substring(0, 50) : "";
              }},
            ]}
            defaultColDef={{ sortable: true, filter: true, resizable: true }}
          />
        </div>
      </div>
    </div>
  );
};

const UsersView: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Users</h2>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="pb-4 text-slate-400 font-medium">Name</th>
              <th className="pb-4 text-slate-400 font-medium">Email</th>
              <th className="pb-4 text-slate-400 font-medium">Role</th>
              <th className="pb-4 text-slate-400 font-medium">Status</th>
              <th className="pb-4 text-slate-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800 text-slate-300">
              <td colSpan={5} className="py-8 text-center">
                No users found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ContactsView: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Contacts</h2>
      </div>
      <div className="text-slate-400">No contacts found</div>
    </div>
  );
};

const LeadsView: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Leads</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="pb-4 text-slate-400 font-medium">Name</th>
              <th className="pb-4 text-slate-400 font-medium">Email</th>
              <th className="pb-4 text-slate-400 font-medium">Phone</th>
              <th className="pb-4 text-slate-400 font-medium">Source</th>
              <th className="pb-4 text-slate-400 font-medium">Date</th>
              <th className="pb-4 text-slate-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800 text-slate-300">
              <td colSpan={6} className="py-8 text-center">
                No leads found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ServicesView: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Services</h2>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Add Service
        </button>
      </div>
      <div className="text-slate-400">No services found</div>
    </div>
  );
};

const TeamView: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Team</h2>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Add Member
        </button>
      </div>
      <div className="text-slate-400">No team members found</div>
    </div>
  );
};

const NotificationsView: React.FC<{ notifications: any[] }> = ({ notifications }) => {
  const handleDelete = async (notificationId: string) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/analytics/activity/${notificationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Failed to delete notification: ${error.error || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error("Error deleting notification:", error);
      alert(`Error deleting notification: ${error.message}`);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <NotificationGrid
      notifications={notifications}
      onRefresh={handleRefresh}
      onDelete={handleDelete}
    />
  );
};

const NotificationsViewOld: React.FC<{ notifications: any[] }> = ({ notifications }) => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleView = (data: any) => {
    setSelectedNotification(data);
    setShowViewModal(true);
  };

  const handleDelete = async (notificationId: string) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) {
      return;
    }

    try {
      setRefreshing(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/analytics/activity/${notificationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        // Remove from local state and refresh
        const updatedNotifications = notifications.filter((n: any) => n._id !== notificationId);
        // We'll need to pass a refresh function or use window.location
        // For now, reload to ensure data consistency
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Failed to delete notification: ${error.error || "Unknown error"}`);
        setRefreshing(false);
      }
    } catch (error: any) {
      console.error("Error deleting notification:", error);
      alert(`Error deleting notification: ${error.message}`);
      setRefreshing(false);
    }
  };

  const formatNotificationDetails = (metadata: any) => {
    if (!metadata) return "No details";
    
    const parts: string[] = [];
    if (metadata.name) parts.push(`Name: ${metadata.name}`);
    if (metadata.email) parts.push(`Email: ${metadata.email}`);
    if (metadata.phone) parts.push(`Phone: ${metadata.phone}`);
    if (metadata.company) parts.push(`Company: ${metadata.company}`);
    if (metadata.source) parts.push(`Source: ${metadata.source}`);
    if (metadata.projectType) parts.push(`Project: ${metadata.projectType}`);
    if (metadata.pages) parts.push(`Pages: ${metadata.pages}`);
    if (metadata.budget) parts.push(`Budget: ${metadata.budget}`);
    if (metadata.website) parts.push(`Website: ${metadata.website}`);
    
    return parts.join(" | ");
  };

  const columnDefs = [
    {
      field: "type",
      headerName: "Type",
      width: 150,
      cellRenderer: (params: any) => {
        const typeMap: Record<string, { icon: string; label: string }> = {
          whatsapp_click: { icon: "📱", label: "WhatsApp Click" },
          audit_request: { icon: "📋", label: "Audit Request" },
        };
        const typeInfo = typeMap[params.value] || { icon: "🔔", label: params.value };
        return (
          <div className="flex items-center space-x-2">
            <span>{typeInfo.icon}</span>
            <span>{typeInfo.label}</span>
          </div>
        );
      },
      filter: true,
      sortable: true,
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      valueGetter: (params: any) => {
        return params.data?.metadata?.name || "N/A";
      },
      filter: true,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params: any) => {
        return params.data?.metadata?.email || "N/A";
      },
      filter: true,
      sortable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      valueGetter: (params: any) => {
        return params.data?.metadata?.phone || "N/A";
      },
      filter: true,
      sortable: true,
    },
    {
      field: "company",
      headerName: "Company",
      width: 150,
      valueGetter: (params: any) => {
        return params.data?.metadata?.company || "N/A";
      },
      filter: true,
      sortable: true,
    },
    {
      field: "source",
      headerName: "Source",
      width: 150,
      valueGetter: (params: any) => {
        const source = params.data?.metadata?.source || "N/A";
        return typeof source === "string" ? source.replace("_", " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) : source;
      },
      filter: true,
      sortable: true,
    },
    {
      field: "projectType",
      headerName: "Project",
      width: 150,
      valueGetter: (params: any) => {
        return params.data?.metadata?.projectType || params.data?.metadata?.businessType || "N/A";
      },
      filter: true,
      sortable: true,
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      minWidth: 300,
      cellRenderer: (params: any) => {
        return (
          <div className="text-xs text-slate-300 py-2">
            {formatNotificationDetails(params.data?.metadata)}
          </div>
        );
      },
      filter: true,
    },
    {
      field: "date",
      headerName: "Date & Time",
      width: 200,
      cellRenderer: (params: any) => {
        const date = new Date(params.value);
        return (
          <div className="flex flex-col">
            <span className="text-sm">{date.toLocaleDateString()}</span>
            <span className="text-xs text-slate-400">{date.toLocaleTimeString()}</span>
          </div>
        );
      },
      filter: true,
      sortable: true,
      comparator: (valueA: any, valueB: any) => {
        return new Date(valueA).getTime() - new Date(valueB).getTime();
      },
    },
    {
      field: "path",
      headerName: "Path",
      width: 150,
      filter: true,
      sortable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center space-x-2 h-full">
            <button
              onClick={() => handleView(params.data)}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Eye size={14} className="inline mr-1" />
              View
            </button>
            <button
              onClick={() => handleDelete(params.data._id)}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        );
      },
      sortable: false,
      filter: false,
      pinned: "right",
    },
  ];

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const onFilterTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (gridApi) {
      gridApi.setQuickFilter(e.target.value);
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Notifications</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchText}
              onChange={onFilterTextBoxChange}
              className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
          {(!notifications || notifications.length === 0) && (
            <span className="text-sm text-slate-400">No notifications found</span>
          )}
          {notifications && notifications.length > 0 && (
            <span className="text-sm text-slate-400">{notifications.length} notification{notifications.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>
      
      {refreshing && (
        <div className="mb-4 p-3 bg-teal-600/20 border border-teal-500/30 rounded-lg text-teal-400 text-sm">
          Deleting notification...
        </div>
      )}

      <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={notifications || []}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            floatingFilter: true,
          }}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={20}
          animateRows={true}
          rowSelection="single"
          overlayNoRowsTemplate={
            '<div class="ag-overlay-loading-center" style="padding: 20px; color: #94a3b8;"><div style="font-size: 48px; margin-bottom: 10px;">🔔</div><div style="font-size: 18px; font-weight: bold; color: #e2e8f0; margin-bottom: 5px;">No Notifications</div><div style="font-size: 14px;">You\'re all caught up! New notifications will appear here when users interact with your forms.</div></div>'
          }
        />
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedNotification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 rounded-xl border border-slate-800 p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Notification Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X size={24} className="text-slate-400 hover:text-white" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Type */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-3xl">
                    {selectedNotification.type === "whatsapp_click" ? "📱" : "📋"}
                  </span>
                  <span className="px-4 py-2 bg-teal-600/20 text-teal-400 rounded-full text-sm font-medium capitalize">
                    {selectedNotification.type.replace("_", " ")}
                  </span>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-sm mb-1 block">Date & Time</label>
                    <p className="text-white">
                      {new Date(selectedNotification.date).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-1 block">Path</label>
                    <p className="text-white">{selectedNotification.path || "N/A"}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="border-t border-slate-800 pt-4">
                  <h4 className="text-lg font-bold text-white mb-4">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedNotification.metadata?.name && (
                      <div>
                        <label className="text-slate-400 text-sm mb-1 block">Name</label>
                        <p className="text-white font-medium">{selectedNotification.metadata.name}</p>
                      </div>
                    )}
                    {selectedNotification.metadata?.email && (
                      <div>
                        <label className="text-slate-400 text-sm mb-1 block">Email</label>
                        <p className="text-white">{selectedNotification.metadata.email}</p>
                      </div>
                    )}
                    {selectedNotification.metadata?.phone && (
                      <div>
                        <label className="text-slate-400 text-sm mb-1 block">Phone</label>
                        <p className="text-white">{selectedNotification.metadata.phone}</p>
                      </div>
                    )}
                    {selectedNotification.metadata?.company && (
                      <div>
                        <label className="text-slate-400 text-sm mb-1 block">Company</label>
                        <p className="text-white">{selectedNotification.metadata.company}</p>
                      </div>
                    )}
                    {selectedNotification.metadata?.website && (
                      <div>
                        <label className="text-slate-400 text-sm mb-1 block">Website</label>
                        <a
                          href={selectedNotification.metadata.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-400 hover:text-teal-300 underline"
                        >
                          {selectedNotification.metadata.website}
                        </a>
                      </div>
                    )}
                    {selectedNotification.metadata?.source && (
                      <div>
                        <label className="text-slate-400 text-sm mb-1 block">Source</label>
                        <p className="text-white capitalize">
                          {selectedNotification.metadata.source.replace("_", " ")}
                        </p>
                      </div>
                    )}
                    {selectedNotification.metadata?.projectType && (
                      <div>
                        <label className="text-slate-400 text-sm mb-1 block">Project Type</label>
                        <p className="text-white">{selectedNotification.metadata.projectType}</p>
                      </div>
                    )}
                    {selectedNotification.metadata?.businessType && (
                      <div>
                        <label className="text-slate-400 text-sm mb-1 block">Business Type</label>
                        <p className="text-white">{selectedNotification.metadata.businessType}</p>
                      </div>
                    )}
                    {selectedNotification.metadata?.pages && (
                      <div>
                        <label className="text-slate-400 text-sm mb-1 block">Pages</label>
                        <p className="text-white">{selectedNotification.metadata.pages}</p>
                      </div>
                    )}
                    {selectedNotification.metadata?.budget && (
                      <div>
                        <label className="text-slate-400 text-sm mb-1 block">Budget</label>
                        <p className="text-white">{selectedNotification.metadata.budget}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Details */}
                {(selectedNotification.metadata?.problem || selectedNotification.metadata?.currentChallenges || selectedNotification.metadata?.message) && (
                  <div className="border-t border-slate-800 pt-4">
                    <h4 className="text-lg font-bold text-white mb-4">Additional Information</h4>
                    {selectedNotification.metadata?.problem && (
                      <div className="mb-4">
                        <label className="text-slate-400 text-sm mb-1 block">Problem/Message</label>
                        <p className="text-white text-sm bg-slate-800/50 p-3 rounded-lg">
                          {selectedNotification.metadata.problem}
                        </p>
                      </div>
                    )}
                    {selectedNotification.metadata?.currentChallenges && (
                      <div className="mb-4">
                        <label className="text-slate-400 text-sm mb-1 block">Challenges</label>
                        <p className="text-white text-sm bg-slate-800/50 p-3 rounded-lg">
                          {selectedNotification.metadata.currentChallenges}
                        </p>
                      </div>
                    )}
                    {selectedNotification.metadata?.message && (
                      <div className="mb-4">
                        <label className="text-slate-400 text-sm mb-1 block">Message</label>
                        <p className="text-white text-sm bg-slate-800/50 p-3 rounded-lg">
                          {selectedNotification.metadata.message}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Raw JSON (for debugging) */}
                <div className="border-t border-slate-800 pt-4">
                  <details className="cursor-pointer">
                    <summary className="text-slate-400 text-sm mb-2">Raw JSON (Click to expand)</summary>
                    <pre className="text-xs text-slate-300 bg-slate-800/50 p-4 rounded-lg overflow-auto">
                      {JSON.stringify(selectedNotification.metadata, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-slate-800">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleDelete(selectedNotification._id);
                  }}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SettingsView: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h2 className="text-lg font-bold text-white mb-6">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-2">
            Site Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            defaultValue="EpicForge Software"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-2">
            Site Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            defaultValue="info@epicforgesoftware.com"
          />
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400">{title}</div>
    </div>
  );
};

export default AdminDashboard;

