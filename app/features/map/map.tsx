"use client";

// * Leaflet:
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// * UI:
import { Card, CardContent } from "@/app/ui/card";
import "./map.css";

const InvalidateSize = () => {
    const map = useMap();
    useEffect(() => {
        const container = map.getContainer();
        const observer = new ResizeObserver(() => {
            map.invalidateSize();
        });
        observer.observe(container);
        return () => observer.disconnect();
    }, [map]);
    return null;
};

const Map = () => {
    return (
        <Card className="map-container">
            <CardContent>
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <InvalidateSize />
                </MapContainer>
            </CardContent>
        </Card>
    )
}

export default Map;