// src/types/index.ts

// ============================================
// SUBSCRIPTION PLAN TYPES
// ============================================

interface SubscriptionPlan {
  id: string;
  name: string;
  minimumInvestment: number | string;
  roiPerMonth?: number | string | null;
  roiPerDay?: number | string | null;
  durationInMonths: number;
  description?: string | null;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

 interface CreateSubscriptionPlanInput {
  name: string;
  minimumInvestment: number;
  roiPerMonth?: number;
  roiPerDay?: number;
  durationInMonths: number;
  description?: string;
  isActive?: boolean;
}

interface UpdateSubscriptionPlanInput {
  name?: string;
  minimumInvestment?: number;
  roiPerMonth?: number;
  roiPerDay?: number;
  durationInMonths?: number;
  description?: string;
  isActive?: boolean;
}

// ============================================
// INVESTMENT TYPES
// ============================================

interface Investment {
  id: string;
  userId: string;
  planId: string;
  amountInvested: number | string;
  roiPercentage: number;
  status: InvestmentStatus;
  startDate: string | Date;
  endDate: string | Date;
  transactionId?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

 type InvestmentStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'PENDING';

 interface CreateInvestmentInput {
  userId: string;
  planId: string;
  amountInvested: number;
  roiPercentage: number;
  startDate: string;
  endDate: string;
  transactionId: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

 interface ApiResponse<T> {
  message?: string;
  data: T;
}
 interface ApiError {
  error: string;
  details?:any;
}

// ============================================
// USER TYPES
// ============================================
interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default SubscriptionPlan
