import { useEffect, useState } from "react";
import { getPhotos, Photo } from "./services/apiService";
import "./App.css";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<Photo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPhotos(200)
      .then(setPhotos)
      .catch((err) => {
        console.error(err);
        setError("Failed to load photos");
      });
  }, []);

  return (
    <div className="app">
      <h1>📸 Family Photo Gallery</h1>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.thumbnailUrl}
            alt={photo.filename}
            className="thumb"
            loading="lazy"
            onClick={() => setSelected(photo)}
          />
        ))}
      </div>

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <img
            src={selected.fullUrl || selected.thumbnailUrl}
            alt={selected.filename}
            className="full"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="close" onClick={() => setSelected(null)}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}