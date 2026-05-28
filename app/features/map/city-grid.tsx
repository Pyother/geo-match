"use client";

// * Leaflet:
import { GeoJSON } from 'react-leaflet';

// * Types:
import type { FeatureCollection, Polygon, MultiPolygon } from 'geojson';

// * Constants:
import { palette } from '@/app/consts/palette';

// * Lib:
import type { Match } from '@/app/lib/match';

const CityGrid = ({ matches }: { matches: Match[] }) => {

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
