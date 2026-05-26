import * as turf from '@turf/turf';
import type { Geometry, Polygon, MultiPolygon, Feature } from 'geojson';

export const getGrid = (geometry: Geometry) => {
    if (geometry.type !== 'Polygon' && geometry.type !== 'MultiPolygon') {
        throw new Error('geometry musi być Polygon albo MultiPolygon');
    }

    const polygon = turf.feature(geometry);
    const bbox = turf.bbox(polygon);

    const grid = turf.squareGrid(bbox, 2, { units: 'kilometers' });

    const clipped = grid.features
        .map((cell) =>
            turf.intersect(turf.featureCollection([cell, polygon]))
        )
        .filter((cell): cell is Feature<Polygon | MultiPolygon> => cell !== null);

    return turf.featureCollection(clipped);
};