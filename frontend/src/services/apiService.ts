export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:3000";

export type Photo = {
  id: number;
  filename: string;
  thumbnailUrl: string; // absolute after normalization
  fullUrl?: string;     // absolute after normalization
};

function abs(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${API_BASE}${url}`;
  return `${API_BASE}/${url}`;
}

export async function getPhotos(limit = 200): Promise<Photo[]> {
  const res = await fetch(`${API_BASE}/api/photos?limit=${limit}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);

  const data = (await res.json()) as any[];

  return data.map((p) => ({
    ...p,
    thumbnailUrl: abs(p.thumbnailUrl),
    fullUrl: p.fullUrl ? abs(p.fullUrl) : undefined,
  }));
}