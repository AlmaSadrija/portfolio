/** URL of a file in /public, respecting the configured base path (e.g. GitHub Pages sub-paths). */
export function publicUrl(file: string): string {
  return `${import.meta.env.BASE_URL}${file}`;
}
