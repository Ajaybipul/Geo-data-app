import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import "leaflet/dist/leaflet.css";

const Map = ({ geojsonData }) => {
  const [parsedGeoJSON, setParsedGeoJSON] = useState(null);

  // Parse the GeoJSON data when it is received
  useEffect(() => {
    if (geojsonData) {
      try {
        const parsedData = JSON.parse(geojsonData);
        setParsedGeoJSON(parsedData);
      } catch (error) {
        console.error("Invalid GeoJSON data", error);
      }
    }
  }, [geojsonData]);

  const handleDrawCreated = (event) => {
    const { layerType, layer } = event;
    const shapeData = {};
    if (layerType === 'polygon') {
      shapeData.type = 'Polygon';
      shapeData.coordinates = layer.getLatLngs().map(latlng => [latlng.lng, latlng.lat]);
    } else if (layerType === 'circle') {
      shapeData.type = 'Circle';
      shapeData.center = [layer.getLatLng().lng, layer.getLatLng().lat];
      shapeData.radius = layer.getRadius();
    }
    // Update drawn shapes if necessary
  };

  const handleDownloadGeoJSON = () => {
    const geoJSONData = {
      type: 'FeatureCollection',
      features: [], // You can add features from drawn shapes here
    };
    const blob = new Blob([JSON.stringify(geoJSONData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawn_shapes.geojson';
    a.click();
  };

  return (
    <div style={{ width: '90%', height: '80vh', margin: 'auto', borderRadius: '5px' }}>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Only render the GeoJSON layer if the data is valid */}
        {parsedGeoJSON && <GeoJSON data={parsedGeoJSON} />}
        
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleDrawCreated}
            draw={{
              rectangle: false,
              marker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>

      <button onClick={handleDownloadGeoJSON}>Download GeoJSON</button>
    </div>
  );
};

export default Map;
