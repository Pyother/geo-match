"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

const InvalidateSize = () => {
    const map = useMap();
    useEffect(() => {
        const container = map.getContainer();
        const observer = new ResizeObserver(() => {
            map.invalidateSize();
        });
        observer.observe(container);
        return () => observer.disconnect();
    }, [map]);
    return null;
};

export default InvalidateSize;
