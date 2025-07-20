import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type { ClassValue };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | number) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function absoluteUrl(path: string): string {
  const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || '';
  return `${baseUrl}${path}`;
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function isArrayOfType<T>(
  arr: unknown[], 
  typeGuard: (value: unknown) => value is T
): arr is T[] {
  return arr.every(typeGuard);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getFromLocalStorage<T>(key: string): T | null {
  if (!isBrowser()) return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setToLocalStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromLocalStorage(key: string): void {
  if (!isBrowser()) return;
  localStorage.removeItem(key);
}

// Type guard for error handling
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  );
}

// Generate a unique ID
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
