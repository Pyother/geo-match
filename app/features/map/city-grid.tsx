"use client";

import { GeoJSON } from 'react-leaflet';
import type { FeatureCollection, Polygon, MultiPolygon } from 'geojson';

const CityGrid = ({ grid }: { grid: FeatureCollection<Polygon | MultiPolygon> }) => {
    return (
        <GeoJSON
            data={grid}
            style={{ color: '#3b016e', weight: 1, fillOpacity: 0.1 }}
        />
    );
};

export default CityGrid;
