/**
 * Global TypeScript Types
 * Warehouse AI Management System
 *
 * Central type definitions shared across the entire application.
 * Import from this file anywhere you need typed data structures.
 */

// ─────────────────────────────────────────────
// Generic Utilities
// ─────────────────────────────────────────────

/**
 * Standard API response wrapper used by all Route Handlers (app/api/**).
 * Always check `success` before accessing `data`.
 *
 * @example
 * const res: ApiResponse<Product[]> = await fetch('/api/products').then(r => r.json());
 * if (res.success) console.log(res.data);
 */
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// ─────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────

/**
 * Authenticated user record returned from Supabase Auth.
 * Available in Server Components via `supabase.auth.getUser()`.
 */
export type User = {
  id: string;
  email: string;
  created_at: string;
};

// ─────────────────────────────────────────────
// Core Entities
// ─────────────────────────────────────────────

/**
 * A product owned by a user, stored in the `products` table.
 * SKU must be unique per user. Price and category are optional at creation.
 */
export type Product = {
  id: string;
  user_id: string;
  name: string;
  /** Stock Keeping Unit — unique identifier for the product */
  sku: string;
  category: string | null;
  price: number | null;
  min_category: number | null;
  created_at: string;
};

/**
 * A physical warehouse location owned by a user, stored in the `warehouses` table.
 * `max_capacity` represents the total number of stock units the warehouse can hold.
 */
export type Warehouse = {
  id: string;
  user_id: string;
  name: string;
  location: string | null;
  max_capacity: number;
  created_at: string;
};

/**
 * A stock record linking a Product to a Warehouse, stored in the `stock` table.
 * Represents how many units of a product are in a specific warehouse.
 */
export type Stock = {
  id: string;
  product_id: string;
  warehouse_id: string;
  quantity: number;
  updated_at: string;
};

/**
 * Stock record with fully joined Product and Warehouse data.
 * Used in UI views where displaying names/details alongside quantity is needed,
 * e.g. the stock dashboard table or AI insight context.
 */
export type StockWithDetails = Stock & {
  product: Product;
  warehouse: Warehouse;
};

// ─────────────────────────────────────────────
// AI
// ─────────────────────────────────────────────

/**
 * A single actionable item within an AI insight report.
 * Priority drives visual ordering and urgency indicators in the UI.
 */
export type InsightItem = {
  title: string;
  description: string;
  /** Urgency level — used to sort and color-code items in the dashboard */
  priority: "critical" | "high" | "medium" | "low";
  /** Suggested next action, or null if no action is required */
  action: string | null;
};

/**
 * Full AI-generated warehouse insight report returned from `/api/ai/insight`.
 * Contains a summary and a list of prioritized insight items.
 * `model` records which Groq model was used to generate the report.
 */
export type AiInsight = {
  summary: string;
  items: InsightItem[];
  generated_at: string;
  model: string;
};

/**
 * A single message in the AI chat conversation, stored in the `chat_messages` table.
 * Role follows the OpenAI/Groq convention: 'user' for human input, 'assistant' for AI replies.
 */
export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};