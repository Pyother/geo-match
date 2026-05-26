"use client";

import { GeoJSON } from 'react-leaflet';
import type { GeoJSONGeometry } from '@/app/types';

const CityBoundaries = ({ geometry }: { geometry: GeoJSONGeometry }) => {
    return (
        <GeoJSON
            data={geometry}
            style={{ color: '#3b016e', weight: 2, fill: false }}
        />
    );
};

export default CityBoundaries;
