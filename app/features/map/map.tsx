"use client";
 
// * React:
import { useContext } from "react";
import { AppContext } from "@/app/page";

// * Leaflet:
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// * UI:
import { Card, CardContent } from "@/app/ui/card";
import MapFallback from "./map-fallback";
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

    const { city, preferences } = useContext(AppContext);

    return (
        <Card className="map-container">
            <CardContent>
                {city && preferences ? (
                    <MapContainer 
                        center={[city.lat, city.lon]} 
                        zoom={13} 
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <InvalidateSize />
                    </MapContainer>
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <MapFallback />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default Map;