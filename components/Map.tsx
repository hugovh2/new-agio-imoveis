"use client";

import React from 'react';

interface MapProps {
  address: string;
}

const Map: React.FC<MapProps> = ({ address }) => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return (
      <div className="bg-gray-200 rounded-lg p-4 text-center">
        <p className="text-gray-600">A chave da API do Google Maps não está configurada.</p>
        <p className="text-sm text-gray-500">Configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY no seu arquivo .env.local</p>
      </div>
    );
  }

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(address)}`;

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <iframe
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapSrc}
      ></iframe>
    </div>
  );
};

export default Map;
