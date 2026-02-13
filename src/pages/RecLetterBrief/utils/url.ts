export function toInternalUrl(relPath: string): string {
  return `${import.meta.env.BASE_URL}${relPath.replace(/^\/+/, '')}`;
}

export function isExternalUrl(link: string): boolean {
  return /^https?:\/\//.test(link);
}
