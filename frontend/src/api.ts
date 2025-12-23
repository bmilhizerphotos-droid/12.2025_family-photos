export const API_BASE = "https://photos.milhizerfamilyphotos.org";

export async function fetchPhotos() {
  const res = await fetch(`${API_BASE}/api/photos?limit=20`);
  if (!res.ok) throw new Error("Failed to fetch photos");
  const data = await res.json();
  return data.photos ?? [];
}