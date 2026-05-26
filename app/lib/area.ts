// * Turf:
import * as turf from '@turf/turf';
import type { Geometry } from 'geojson';

export const getArea = (geometry: Geometry): number => {
    const areaM2 = turf.area(geometry);
    const areaKm2 = areaM2 / 1_000_000;
    return areaKm2;
}
