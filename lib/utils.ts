import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomAvatar() {
  const id = Math.floor(Math.random() * 1000);
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`;
}
