"use client";
 
// * React:
import { useContext } from "react";
import { AppContext } from "@/app/page";

// * Leaflet:
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

// * UI:
import { Card, CardContent } from "@/app/ui/card";
import MapFallback from "./map-fallback";
import InvalidateSize from "./invalidate-size";
import "./map.css";


const Map = () => {

    const { city, preferences, details } = useContext(AppContext);

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
                        {details?.geometry && (
                            <GeoJSON data={details.geometry} />
                        )}
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