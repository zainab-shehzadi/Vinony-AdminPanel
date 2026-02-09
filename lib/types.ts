// User & Auth Types
export interface User {
  id: string
  email: string
  createdAt: Date
  lastLogin?: Date
  plan: 'free' | 'pro' | 'enterprise'
  creditsBalance: number
  status: 'active' | 'suspended' | 'banned' | 'deleted'
  monthlySpend: number
}

export interface AdminUser {
  id: string
  email: string
  role: 'super_admin' | 'admin'
  createdAt: Date
}

// Credit Types
export interface CreditLedger {
  id: string
  userId: string
  delta: number
  balanceAfter: number
  adminId: string
  timestamp: Date
  reason: string
  source: 'manual' | 'system' | 'refund'
  referenceId?: string
}

// Refund Types
export interface Refund {
  id: string
  userId: string
  transactionId: string
  creditsRefunded: number
  status: 'pending' | 'completed' | 'failed'
  reason: string
  initiatedBy: string
  initiatedAt: Date
  completedAt?: Date
}

// Transaction Types
export interface Transaction {
  id: string
  userId: string
  type: 'subscription' | 'topup' | 'credit_purchase' | 'refund'
  amount: number
  vat: number
  total: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  providerRef: string
  createdAt: Date
}


export type ModelStatus = "healthy" | "degraded" | "down";

export interface ModelToggle {
  id: string;
  name: string;
  modelKey: string; // ✅ added
  provider: string;
  status: ModelStatus;
  errorRate: number; // %
  latency: number; // ms
  lastChecked: Date;
  disabled: boolean;
  disableReason?: string;
}
// Free Tier Config
export interface FreeTierConfig {
  id: string
  freeCreditsOnSignup: number
  freeCreditsEnabled: boolean
  availableModels: string[]
  rateLimitPerMin: number
  generationsPerDay: number
  watermarkEnforced: boolean
  watermarkTypes: string[]
  lastUpdated: Date
  updatedBy: string
}

// Admin Action Log
export interface AdminActionLog {
  id: string
  adminId: string
  adminEmail: string
  action: string
  entityType: string
  entityId: string
  before?: unknown
  after?: unknown
  reason: string
  timestamp: Date
  ipAddress?: string
}

export interface DashboardMetrics {
  totalUsers: number
  activeUsers7d: number
  revenue30d: number
  refundCount30d: number
  totalCreditsIssued: number
  totalCreditsSpent: number
  creditsRefunded: number
  modelHealthSummary: {
    healthy: number
    degraded: number
    down: number
  }
}
