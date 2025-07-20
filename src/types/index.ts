// Common types used across the application

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  date: string;
  content?: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  slug: string;
  readingTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Nullable<T> = T | null;

// Component props types
export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ClassNameProps {
  className?: string;
}

// API error type
export interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
}

// Form field props
export interface FormFieldProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}
