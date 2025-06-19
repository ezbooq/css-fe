"use client";

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyBEmGDUu1gAvSw1zaOIu1Ip4NbMo3c6rIo";

type Props = {
  mapUrl: string;
  height?: string;
};

const extractCoordinates = (
  url: string
): { lat: number; lng: number } | null => {
  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return {
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    };
  }
  return null;
};

export default function GoogleMapFromUrl({ mapUrl, height = "300px" }: Props) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const resolveUrl = async () => {
      try {
        if (mapUrl.includes("maps.app.goo.gl")) {
          const res = await fetch(
            `/api/expand-map-url?url=${encodeURIComponent(mapUrl)}`
          );
          const data = await res.json();

          if (data.expandedUrl) {
            const coords = extractCoordinates(data.expandedUrl);
            if (coords) {
              setLocation(coords);
            } else {
              setError("Coordinates not found in expanded URL.");
            }
          } else {
            setError("URL expansion failed.");
          }
        } else {
          const coords = extractCoordinates(mapUrl);
          if (coords) {
            setLocation(coords);
          } else {
            setError("Coordinates not found in URL.");
          }
        }
      } catch (err) {
        console.error("Error resolving map URL:", err);
        setError("Map URL resolution failed.");
      }
    };

    resolveUrl();
  }, [mapUrl]);

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="rounded-[8px]" style={{ height }}>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        {location && (
          <GoogleMap
            center={location}
            zoom={16}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            <Marker position={location} />
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
}
