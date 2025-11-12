// Backend API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export interface Lead {
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  company?: string;
  businessType: string;
  projectType: string;
  budget: number;
  problem: string;
  source?: string;
  language?: string;
  additionalServices?: string[];
  pages?: number;
}

export interface AuditRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  website?: string;
  businessType: string;
  currentChallenges: string;
  goals?: string;
  source?: string;
  language?: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  data: {
    leadId: string;
    budgetInfo: {
      formatted: string;
      category: string;
      priority: string;
    };
    projectEstimate: {
      duration: string;
      category: string;
      priority: string;
    };
  };
}

export const saveLead = async (leadData: Lead): Promise<LeadResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save lead");
    }

    const result: LeadResponse = await response.json();
    console.log("Lead saved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error in saveLead:", error);
    throw error;
  }
};

export const getLeadStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads/stats/overview`);

    if (!response.ok) {
      throw new Error("Failed to fetch lead statistics");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching lead stats:", error);
    throw error;
  }
};

export const saveAuditRequest = async (auditData: AuditRequest) => {
  try {
    const response = await fetch(`${API_BASE_URL}/audit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auditData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save audit request");
    }

    const result = await response.json();
    console.log("Audit request saved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error in saveAuditRequest:", error);
    throw error;
  }
};
