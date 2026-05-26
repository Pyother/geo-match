"use client";
 
// * React:
import { useContext, useMemo, useEffect, useState } from "react";
import { AppContext } from "@/app/page";

// * Leaflet:
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

// * Lib:
import { getArea } from "@/app/lib/area";
import { getGrid } from "@/app/lib/grid";

// * Types:
import type { Geometry } from 'geojson';

// * UI:
import { Card, CardContent } from "@/app/ui/card";
import MapFallback from "./map-fallback";
import GridFallback from "./grid-fallback";
import CityBoundaries from "./city-boundaries";
import CityGrid from "./city-grid";
import InvalidateSize from "./invalidate-size";
import "./map.css";

const Map = () => {

    const { city, preferences, details, places } = useContext(AppContext);
    const area = useMemo(() => details?.geometry ? getArea(details.geometry as Geometry) : null, [details]);
    const [grid, setGrid] = useState<ReturnType<typeof getGrid> | null>(null);
    const isCalculating = !!details?.geometry && grid === null;

    useEffect(() => {
        if (!details?.geometry) {
            const id = setTimeout(() => setGrid(null), 0);
            return () => clearTimeout(id);
        }
        const worker = new Worker(new URL('@/app/lib/grid.worker.ts', import.meta.url));
        worker.onmessage = (e: MessageEvent<ReturnType<typeof getGrid>>) => {
            setGrid(e.data);
            worker.terminate();
        };
        worker.postMessage(details.geometry);
        return () => worker.terminate();
    }, [details]);

    return (
        <Card className="map-container">
            <CardContent>
                {city && preferences && details?.geometry && (!area || area <= 2000) ? (
                    <MapContainer 
                        center={[city.lat, city.lon]} 
                        zoom={13} 
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {isCalculating && <GridFallback />}
                        {details?.geometry && (
                            <>
                                <CityBoundaries geometry={details.geometry} />
                                {grid && places && <CityGrid grid={grid} places={places} />}
                            </>
                        )}
                        <InvalidateSize />
                    </MapContainer>
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <MapFallback
                            areaExceeded={area && area > 2000 ? area : null}
                            noGeometry={!!(details && !details.geometry)}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default Map;