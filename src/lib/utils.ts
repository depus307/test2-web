import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from 'jsonwebtoken';
import { Metadata } from "next";

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Formats a duration in seconds to a readable string (HH:MM:SS)
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  let result = '';
  
  if (hours > 0) {
    result += `${hours}:${minutes.toString().padStart(2, '0')}`;
  } else {
    result += `${minutes}`;
  }
  
  result += `:${remainingSeconds.toString().padStart(2, '0')}`;
  
  return result;
}

/**
 * Truncates a string to a specified length
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Generates a JWT token
 */
export function generateToken(payload: any, expiresIn = '7d'): string {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * Verifies a JWT token
 */
export function verifyToken(token: string): any {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

/**
 * Constructs metadata for a page
 */
export function constructMetadata({
  title = 'TrueSpace - Educational Platform',
  description = 'Modern educational platform for video courses with high-quality content',
  image = '/og-image.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    icons,
    metadataBase: new URL('https://truespace.com'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
} 