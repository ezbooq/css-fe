"use client";

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyA5YvqbOmSB2A1Q20FDgg-V7jCnTOoO8ow";

type Props = {
  mapUrl: string;
  height?: string;
};

const extractCoordinates = (
  url: string
): { lat: number; lng: number } | null => {
  const dMatch = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (dMatch) {
    return {
      lat: parseFloat(dMatch[1]),
      lng: parseFloat(dMatch[2]),
    };
  }

  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) {
    return {
      lat: parseFloat(atMatch[1]),
      lng: parseFloat(atMatch[2]),
    };
  }

  const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (qMatch) {
    return {
      lat: parseFloat(qMatch[1]),
      lng: parseFloat(qMatch[2]),
    };
  }

  const pathMatch = url.match(/\/(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (pathMatch) {
    return {
      lat: parseFloat(pathMatch[1]),
      lng: parseFloat(pathMatch[2]),
    };
  }

  return null;
};

const getCoordinatesFromPlace = async (
  place: string
): Promise<{ lat: number; lng: number } | null> => {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    place
  )}&key=${GOOGLE_MAPS_API_KEY}`;

  const res = await fetch(geocodeUrl);
  const data = await res.json();

  if (data.status === "OK" && data.results[0]) {
    return data.results[0].geometry.location;
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
        let finalUrl = mapUrl;

        if (mapUrl.includes("maps.app.goo.gl")) {
          const res = await fetch(
            `/api/expand-map-url?url=${encodeURIComponent(mapUrl)}`
          );
          const data = await res.json();
          if (!data.expandedUrl) throw new Error("URL expansion failed.");
          finalUrl = data.expandedUrl;
        }

        const coords = extractCoordinates(finalUrl);
        if (coords) {
          setLocation(coords);
        } else {
          const placeMatch = finalUrl.match(/\/maps\/place\/([^\/@]+)/);
          const placeName = placeMatch
            ? decodeURIComponent(placeMatch[1].replace(/\+/g, " "))
            : "";

          if (placeName) {
            const geoCoords = await getCoordinatesFromPlace(placeName);
            if (geoCoords) {
              setLocation(geoCoords);
              return;
            }
          }

          setError("Failed to extract coordinates or resolve place.");
        }
      } catch (err) {
        console.error("Error resolving map URL:", err);
        setError("Map URL resolution failed.");
      }
    };

    resolveUrl();
  }, [mapUrl]);

  if (error) return <div className="text-red-600">{error}</div>;

  return location ? (
    <a
      href={mapUrl} // ✅ Use the original URL
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", height }}
      className="rounded-[8px] overflow-hidden"
    >
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          center={location}
          zoom={16}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            pointerEvents: "none", // make it clickable
          }}
          options={{
            disableDefaultUI: true,
          }}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
    </a>
  ) : null;
}
