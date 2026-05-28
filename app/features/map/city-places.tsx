"use client";

// * React:
import React, { useState, useCallback, useMemo } from "react";

// * Leaflet:
import L from "leaflet";
import { useMap, useMapEvents, Marker } from 'react-leaflet';

// * Lib:
import getIcon from "@/app/lib/icon";
import { createSupercluster, getClusters, type ClusterItem } from "@/app/lib/supercluster";

// * Consts:
import { icons, type IconKey } from "@/app/consts/icons";
import { preferences } from "@/app/consts/preferences";

// * Types:
import type { FeatureCollection, Point } from 'geojson';

const CityPlaces = ({ places }: { places: FeatureCollection<Point> }) => {
    const map = useMap();
    const clusterIndex = useMemo(() => createSupercluster(places), [places]);

    const update = useCallback(() => getClusters(clusterIndex, map), [map, clusterIndex]);
    const [clusters, setClusters] = useState(() => update());

    useMapEvents({
        zoomend: () => setClusters(update()),
        moveend: () => setClusters(update()),
    });

    return (
        <>
            {clusters.map((cluster: ClusterItem, i: number) => {
                const [lng, lat] = cluster.geometry.coordinates;
                const props = cluster.properties;

                if (props?.cluster) {
                    return (
                        <Marker
                            key={`cluster-${props.cluster_id}`}
                            position={[lat, lng]}
                            icon={L.divIcon({
                                html: `<span>${props.point_count}</span>`,
                                className: "cluster-icon",
                                iconSize: [32, 32],
                                iconAnchor: [16, 16],
                            })}
                        />
                    );
                }

                const categories: string[] = props?.categories ?? [];
                const pref = preferences.find(p => categories.includes(p.value));
                const IconComponent = icons[(pref?.icon ?? "default") as IconKey];

                return (
                    <Marker
                        key={`place-${props?.place_id ?? i}`}
                        position={[lat, lng]}
                        icon={getIcon(React.createElement(IconComponent))}
                    />
                );
            })}
        </>
    );
};

export default CityPlaces;
