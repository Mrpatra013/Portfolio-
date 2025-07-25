/**
 * Utilities for handling file paths in Next.js
 */

/**
 * Formats a path for static files in the public directory
 * @param path The relative path to format
 * @returns A properly formatted path for Next.js public directory
 */
export function formatPublicPath(path: string): string {
  if (!path) return '';
  
  // Remove leading slash if it exists
  let formattedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Handle spaces in path for URLs
  formattedPath = formattedPath.replace(/ /g, '%20');
  
  return formattedPath;
}

/**
 * Validates if a URL is valid
 * @param url The URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
