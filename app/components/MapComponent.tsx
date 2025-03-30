"use client"

import { MapContainer, TileLayer, Circle, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
const icon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Custom component to update map center
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center);
  return null;
}

interface MapComponentProps {
  center: { lat: number; lng: number };
  radius: number;
  setCenter: (center: { lat: number; lng: number }) => void;
}

export default function MapComponent({ center, radius, setCenter }: MapComponentProps) {
  return (
    <div className="h-[calc(100vh-240px)]">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <ChangeView center={[center.lat, center.lng]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={[center.lat, center.lng]}
          radius={radius}
          pathOptions={{
            color: '#FF0000',
            fillColor: '#FF0000',
            fillOpacity: 0.15
          }}
        />
        <Marker
          position={[center.lat, center.lng]}
          icon={icon}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              setCenter({ lat: position.lat, lng: position.lng });
            },
          }}
          draggable={true}
        />
      </MapContainer>
    </div>
  );
} 