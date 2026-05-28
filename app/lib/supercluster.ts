// * Supercluser:
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – no types for supercluster
import Supercluster from 'supercluster';

// * Types:
import type { FeatureCollection, Point, GeoJsonProperties } from 'geojson';
import type { Map } from 'leaflet';
import { getBounds } from '@/app/lib/bounds';

export type ClusterItem = {
    geometry: { coordinates: [number, number] };
    properties: GeoJsonProperties & {
        cluster?: boolean;
        cluster_id?: number;
        point_count?: number;
        place_id?: string;
        categories?: string[];
    };
};

type SuperclusterIndex = { getClusters(bbox: [number, number, number, number], zoom: number): ClusterItem[] };

export function createSupercluster(places: FeatureCollection<Point>): SuperclusterIndex {
    return new Supercluster({
        radius: 60,
        maxZoom: 16,
    }).load(places.features) as unknown as SuperclusterIndex;
}

export function getClusters(index: SuperclusterIndex, map: Map): ClusterItem[] {
    return index.getClusters(getBounds(map), map.getZoom());
}