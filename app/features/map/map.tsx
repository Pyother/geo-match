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
import { getMatches } from "@/app/lib/match";

// * Types:
import type { Geometry } from 'geojson';

// * UI:
import { Card, CardContent } from "@/app/ui/card";
import { Button } from "@/app/ui/button";
import { ChartNoAxesColumn } from "lucide-react";
import MapFallback from "./map-fallback";
import MapPanel from "./map-panel";
import GridFallback from "./grid-fallback";
import CityBoundaries from "./city-boundaries";
import CityGrid from "./city-grid";
import CityPlaces from "./city-places";
import InvalidateSize from "./invalidate-size";
import "./map.css";

const Map = () => {

    const { city, preferences, details, places, matches, setMatches, grid, setGrid } = useContext(AppContext);
    const area = useMemo(() => details?.geometry ? getArea(details.geometry as Geometry) : null, [details]);
    const [isMatchCalculating, setIsMatchCalculating] = useState(false);
    const isGridCalculating = !!details?.geometry && grid === null;

    useEffect(() => {
        if (!details?.geometry) {
            setGrid(null);
            return;
        }
        if (grid !== null) return;
        const worker = new Worker(new URL('@/app/lib/grid.worker.ts', import.meta.url));
        worker.onmessage = (e: MessageEvent<ReturnType<typeof getGrid>>) => {
            setGrid(e.data);
            worker.terminate();
        };
        worker.postMessage(details.geometry);
        return () => worker.terminate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    const handleCalculate = () => {
        if (!grid || !places) return;
        setIsMatchCalculating(true);
        setTimeout(() => {
            setMatches(getMatches(places, grid.features));
            setIsMatchCalculating(false);
        }, 0);
    };

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
                        {details?.geometry && (
                            <>
                                <CityBoundaries geometry={details.geometry} />
                                {matches && <CityGrid matches={matches} />}
                                {places && <CityPlaces places={{ type: "FeatureCollection", features: places }} />}
                            </>
                        )}
                        {isGridCalculating && <GridFallback />}
                        {isMatchCalculating && <GridFallback calculating="matches" />}
                        {grid && places && !matches && !isMatchCalculating && !isGridCalculating && (
                            <div className="map-action">
                                <Button onClick={handleCalculate}>
                                    <ChartNoAxesColumn className="size-4" />
                                    Calculate matches
                                </Button>
                            </div>
                        )}
                        <InvalidateSize />
                        <MapPanel />
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