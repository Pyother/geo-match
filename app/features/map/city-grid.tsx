"use client";

import { GeoJSON } from 'react-leaflet';
import type { FeatureCollection, Polygon, MultiPolygon } from 'geojson';
import { palette } from '@/app/consts/palette';
import type { Match } from '@/app/lib/match';

type Props = {
    matches: Match[];
};

const CityGrid = ({ matches }: Props) => {

    const maxCount = Math.max(...matches.map((f) => f.properties.count), 1);
    const getColor = (count: number) => palette[Math.round((count / maxCount) * 6)];

    return (
        <GeoJSON
            key={matches.length}
            data={{ type: 'FeatureCollection', features: matches } as FeatureCollection<Polygon | MultiPolygon>}
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
