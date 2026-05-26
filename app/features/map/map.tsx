"use client";
 
// * React:
import { useContext, useMemo } from "react";
import { AppContext } from "@/app/page";

// * Leaflet:
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

// * Lib:
import { getArea } from "@/app/lib/area";

// * Types:
import type { Geometry } from 'geojson';

// * UI:
import { Card, CardContent } from "@/app/ui/card";
import MapFallback from "./map-fallback";
import InvalidateSize from "./invalidate-size";
import "./map.css";

const Map = () => {

    const { city, preferences, details } = useContext(AppContext);
    const area = useMemo(() => details?.geometry ? getArea(details.geometry as Geometry) : null, [details]);
    console.log("Map area:", area);

    return (
        <Card className="map-container">
            <CardContent>
                {city && preferences && details?.geometry && (!area || area <= 1000) ? (
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
                        <MapFallback
                            areaExceeded={area && area > 1000 ? area : null}
                            noGeometry={!!(details && !details.geometry)}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default Map;