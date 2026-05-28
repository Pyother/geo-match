// * Leaflet:
import type { Map } from 'leaflet';

export type BBox = [number, number, number, number];

export function getBounds(map: Map): BBox {
    const b = map.getBounds();
    return [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()];
}