import { z } from 'zod';

// Auth schemas
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(['admin', 'user']),
  language: z.string().default('es'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Project schemas
export const projectSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1),
  year: z.number().int().min(2020).max(2050),
  status: z.enum(['draft', 'in_progress', 'completed']),
  templateId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createProjectSchema = z.object({
  name: z.string().min(1),
  year: z.number().int().min(2020).max(2050),
  templateId: z.string().optional(),
});

// Calendar month schemas
export const calendarMonthSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  monthNumber: z.number().int().min(1).max(12),
  year: z.number().int(),
  canvasTopJson: z.string().optional(),
  gridConfigJson: z.string(),
  bgType: z.enum(['color', 'image']),
  bgValue: z.string(),
  isCustomized: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const updateMonthSchema = z.object({
  canvasTopJson: z.string().optional(),
  gridConfigJson: z.string().optional(),
  bgType: z.enum(['color', 'image']).optional(),
  bgValue: z.string().optional(),
});

// Asset schemas
export const assetSchema = z.object({
  id: z.string(),
  userId: z.string(),
  folderId: z.string().optional(),
  filename: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  sizeBytes: z.number().int().positive(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  thumbPath: z.string().optional(),
  type: z.enum(['image', 'sticker']),
  createdAt: z.date(),
});

// Event schemas
export const eventSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1),
  day: z.number().int().min(1).max(31),
  month: z.number().int().min(1).max(12),
  year: z.number().int().optional(),
  type: z.enum(['birthday', 'anniversary', 'saint', 'custom']),
  color: z.string(),
  icon: z.string().optional(),
  isRecurring: z.boolean(),
  createdAt: z.date(),
});

export const createEventSchema = z.object({
  name: z.string().min(1),
  day: z.number().int().min(1).max(31),
  month: z.number().int().min(1).max(12),
  year: z.number().int().optional(),
  type: z.enum(['birthday', 'anniversary', 'saint', 'custom']),
  color: z.string().default('#C8502A'),
  icon: z.string().optional(),
  isRecurring: z.boolean().default(true),
});

// API response schemas
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    total: z.number().int(),
    page: z.number().int(),
    limit: z.number().int(),
    hasMore: z.boolean(),
  });

// Export types
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type User = z.infer<typeof userSchema>;
export type Project = z.infer<typeof projectSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
export type CalendarMonth = z.infer<typeof calendarMonthSchema>;
export type UpdateMonth = z.infer<typeof updateMonthSchema>;
export type Asset = z.infer<typeof assetSchema>;
export type Event = z.infer<typeof eventSchema>;
export type CreateEvent = z.infer<typeof createEventSchema>;