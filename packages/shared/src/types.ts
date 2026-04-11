// Tipos compartidos entre frontend y backend
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  year: number;
  status: 'draft' | 'in_progress' | 'completed';
  templateId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarMonth {
  id: string;
  projectId: string;
  monthNumber: number; // 1-12
  year: number;
  canvasTopJson?: string; // Fabric.js canvas state
  gridConfigJson: string; // Grid configuration
  bgType: 'color' | 'image';
  bgValue: string;
  isCustomized: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DayCell {
  id: string;
  monthId: string;
  dayNumber: number;
  contentJson?: string; // Cell content (image, sticker, text)
  bgColor?: string;
  hasEvent: boolean;
  hasHoliday: boolean;
}

export interface Asset {
  id: string;
  userId: string;
  folderId?: string;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  thumbPath?: string;
  type: 'image' | 'sticker';
  createdAt: Date;
}

export interface AssetFolder {
  id: string;
  userId: string;
  name: string;
  parentId?: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  userId: string;
  name: string;
  day: number;
  month: number;
  year?: number; // NULL for recurring events
  type: 'birthday' | 'anniversary' | 'saint' | 'custom';
  color: string;
  icon?: string;
  isRecurring: boolean;
  createdAt: Date;
}

export interface Holiday {
  id: string;
  year: number;
  month: number;
  day: number;
  nameEs: string;
  nameEn: string;
  scope: 'national' | 'autonomy';
  autonomyCode?: string;
}

export interface Template {
  id: string;
  userId: string;
  name: string;
  configJson: string; // Template configuration
  isDefault: boolean;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser extends User {
  // Additional fields if needed
}