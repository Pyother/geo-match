"use client";

// * Leaflet:
import L from "leaflet";
import { GeoJSON } from 'react-leaflet';

// * Lib:
import getIcon from "@/app/lib/icon";

// * Types:
import type { FeatureCollection, Point } from 'geojson';

// * UI:
import { FlagTriangleRight } from "lucide-react";

const CityPlaces = ({ places }: { places: FeatureCollection<Point> }) => {
    return (
        <GeoJSON
            data={places}
            style={{
                color: '#3b016e',
                weight: 1,
                fillColor: '#3b016e'
            }}
            pointToLayer={(feature, latlng) => {
                return L.marker(latlng, { icon: getIcon(<FlagTriangleRight />) });
            }}
        />
    );
}

export default CityPlaces;
