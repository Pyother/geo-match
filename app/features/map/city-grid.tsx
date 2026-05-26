"use client";

import { GeoJSON } from 'react-leaflet';
import type { FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import { getMatches } from '@/app/lib/match';
import { palette } from '@/app/consts/palette';
import type { Place } from '@/app/types';

type Props = {
    grid: FeatureCollection<Polygon | MultiPolygon>;
    places: Place[];
};

const CityGrid = ({ grid, places }: Props) => {
    const matched = getMatches(places, grid.features);
    console.log(matched);
    const maxCount = Math.max(...matched.map((f) => f.properties.count), 1);

    const getColor = (count: number) =>
        palette[Math.round((count / maxCount) * 6)];

    return (
        <GeoJSON
            key={places.length}
            data={{ type: 'FeatureCollection', features: matched } as FeatureCollection<Polygon | MultiPolygon>}
            style={(feature) => ({
                color: '#3b016e',
                weight: 1,
                fillColor: getColor(feature?.properties?.count ?? 0),
                fillOpacity: feature?.properties?.count > 0 ? 0.6 : 0.1,
            })}
        />
    );
};

export default CityGrid;
