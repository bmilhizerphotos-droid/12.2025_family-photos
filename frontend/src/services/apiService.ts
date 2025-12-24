// This is the brain that helps the website find your home computer
export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:3000";

export type Photo = {
  id: number;
  filename: string;
  thumbnailUrl: string; // The "small" version of the photo
  fullUrl?: string;     // The "big" version of the photo
};

// This function adds your tunnel address to the start of every image link
function abs(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${API_BASE}${url}`;
  return `${API_BASE}/${url}`;
}

export async function getPhotos(limit = 200): Promise<Photo[]> {
  try {
    // This fetches the list of photos from your server
    const res = await fetch(`${API_BASE}/api/photos?limit=${limit}`);
    
    if (!res.ok) throw new Error(`API error ${res.status}`);

    const data = (await res.json()) as any[];

    // This part processes each photo so the browser knows where to load the image from
    return data.map((p) => ({
      ...p,
      thumbnailUrl: abs(p.thumbnailUrl),
      fullUrl: p.fullUrl ? abs(p.fullUrl) : undefined,
    }));
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Returns an empty list if things go wrong
  }
}
