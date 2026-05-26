// * Turf:
import * as turf from '@turf/turf';
import type { Polygon, MultiPolygon, Feature } from 'geojson';

// * Types:
import { Place } from "@/app/types";

export function getMatches(places: Place[], grid: Feature<Polygon | MultiPolygon>[]) {
    
    console.log("Places:", places);
    console.log("Grid:", grid);

    return grid.map((cell) => {
        const count = places.filter((place) =>
            turf.booleanPointInPolygon(
                turf.point(place.geometry.coordinates),
                cell
            )
        ).length;

        return {
            ...cell,
            properties: {
                ...cell.properties,
                count,
            },
        };
    });
}