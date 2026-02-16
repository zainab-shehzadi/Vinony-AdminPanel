// src/components/admin/user-drawer/mock.ts

import { ModelToggle, Transaction } from "@/lib/types"

export type Generation = {
  id: string
  model: string
  type: "chat" | "image" | "video"
  cost: number
  timestamp: Date
}

export const mockGenerations: Generation[] = [
  {
    id: "gen_001",
    model: "gpt-4",
    type: "chat",
    cost: 50,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "gen_002",
    model: "dall-e-3",
    type: "image",
    cost: 200,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "gen_003",
    model: "gpt-4",
    type: "chat",
    cost: 75,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "gen_003",
    model: "gpt-4",
    type: "chat",
    cost: 75,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "gen_003",
    model: "gpt-4",
    type: "chat",
    cost: 75,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "gen_003",
    model: "gpt-4",
    type: "chat",
    cost: 75,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "gen_003",
    model: "gpt-4",
    type: "chat",
    cost: 75,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "gen_003",
    model: "gpt-4",
    type: "chat",
    cost: 75,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
]


export const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    userId: 'user_001',
    type: 'credit_purchase',
    amount: 100,
    vat: 20,
    total: 120,
    currency: 'USD',
    status: 'completed',
    providerRef: 'pi_stripe_001',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: 'txn_002',
    userId: 'user_002',
    type: 'subscription',
    amount: 29,
    vat: 5.8,
    total: 34.8,
    currency: 'USD',
    status: 'completed',
    providerRef: 'sub_stripe_002',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
  {
    id: 'txn_003',
    userId: 'user_003',
    type: 'topup',
    amount: 500,
    vat: 100,
    total: 600,
    currency: 'USD',
    status: 'completed',
    providerRef: 'pi_stripe_003',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  },
  {
    id: 'txn_004',
    userId: 'user_001',
    type: 'credit_purchase',
    amount: 250,
    vat: 50,
    total: 300,
    currency: 'USD',
    status: 'completed',
    providerRef: 'pi_stripe_004',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
  },
  {
    id: 'txn_005',
    userId: 'user_004',
    type: 'subscription',
    amount: 49,
    vat: 9.8,
    total: 58.8,
    currency: 'USD',
    status: 'failed',
    providerRef: 'sub_stripe_005',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
]


export const mockModels: ModelToggle[] = [
  {
    id: "m1",
    name: "GPT-4o Mini",
    modelKey: "openai:gpt-4o-mini",
    provider: "OpenAI",
    status: "healthy",
    errorRate: 0.12,
    latency: 420,
    lastChecked: new Date(Date.now() - 2 * 60 * 1000),
    disabled: false,
  },
  {
    id: "m2",
    name: "Claude 3.5 Sonnet",
    modelKey: "anthropic:claude-3-5-sonnet",
    provider: "Anthropic",
    status: "degraded",
    errorRate: 1.84,
    latency: 980,
    lastChecked: new Date(Date.now() - 21 * 60 * 1000),
    disabled: false,
  },
  {
    id: "m3",
    name: "Gemini 1.5 Pro",
    modelKey: "google:gemini-1.5-pro",
    provider: "Google",
    status: "down",
    errorRate: 12.45,
    latency: 0,
    lastChecked: new Date(Date.now() - 55 * 60 * 1000),
    disabled: true,
    disableReason: "Provider outage (auto-disabled by admin).",
  },
  {
    id: "m4",
    name: "Llama 3.1 70B",
    modelKey: "meta:llama-3.1-70b",
    provider: "Meta",
    status: "healthy",
    errorRate: 0.35,
    latency: 610,
    lastChecked: new Date(Date.now() - 6 * 60 * 1000),
    disabled: false,
  },
];


export type RecentTransaction = {
  id: string
  userEmail: string
  type: "subscription" | "topup"
  amount: number
  status: "succeeded" | "failed" | "past_due"
  createdAt: string
}

export type LowCreditUser = {
  id: string
  email: string
  creditsRemaining: number
}
export const dashboardData = {
  totalUsers: 2_547,
  activeUsers7d: 1_234,
  revenue30d: 12_450,
  refundCount30d: 23,
  totalCreditsIssued: 500_000,
  totalCreditsSpent: 345_000,
  creditsRefunded: 15_000,
  modelHealth: [
    { name: 'Healthy', value: 8, color: '#10b981' },
    { name: 'Degraded', value: 2, color: '#f59e0b' },
    { name: 'Down', value: 0, color: '#ef4444' },
  ],
  usersPerDay: [
    { date: 'Jan 1', users: 120 },
    { date: 'Jan 2', users: 150 },
    { date: 'Jan 3', users: 145 },
    { date: 'Jan 4', users: 180 },
    { date: 'Jan 5', users: 175 },
    { date: 'Jan 6', users: 200 },
    { date: 'Jan 7', users: 220 },
  ],
  creditsFlow: [
    { month: 'Week 1', issued: 125000, spent: 85000, refunded: 2000 },
    { month: 'Week 2', issued: 135000, spent: 95000, refunded: 3000 },
    { month: 'Week 3', issued: 140000, spent: 98000, refunded: 4000 },
    { month: 'Week 4', issued: 145000, spent: 102000, refunded: 6000 },
    { month: 'Week 5', issued: 155000, spent: 110000, refunded: 5000 },
  ],
  recentActions: [
    {
      id: '1',
      adminEmail: 'admin@example.com',
      action: 'Ban User',
      entityType: 'User',
      entityId: 'user_123',
      reason: 'TOS violation - spamming',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: '2',
      adminEmail: 'admin@example.com',
      action: 'Add Credits',
      entityType: 'User',
      entityId: 'user_456',
      reason: 'Compensation for outage',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: '3',
      adminEmail: 'admin@example.com',
      action: 'Disable Model',
      entityType: 'Model',
      entityId: 'gpt-4',
      reason: 'High error rate detected',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
  ],
    recentTransactions: [
    { id: "t1", userEmail: "user1@vinony.com", type: "subscription", amount: 24.99, status: "succeeded", createdAt: "2026-02-06" },
    { id: "t2", userEmail: "user2@vinony.com", type: "topup", amount: 9.99, status: "succeeded", createdAt: "2026-02-06" },
    { id: "t3", userEmail: "user3@vinony.com", type: "subscription", amount: 54.99, status: "past_due", createdAt: "2026-02-05" },
    { id: "t4", userEmail: "user4@vinony.com", type: "topup", amount: 19.99, status: "failed", createdAt: "2026-02-05" },
  ] as RecentTransaction[],

  lowCreditUsers: [
    { id: "u1", email: "low1@vinony.com", creditsRemaining: 12 },
    { id: "u2", email: "low2@vinony.com", creditsRemaining: 28 },
    { id: "u3", email: "low3@vinony.com", creditsRemaining: 41 },
    { id: "u4", email: "low4@vinony.com", creditsRemaining: 55 },
    { id: "u5", email: "low5@vinony.com", creditsRemaining: 63 },
  ] as LowCreditUser[],
}
