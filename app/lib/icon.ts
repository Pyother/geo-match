// * React:
import React from "react";
import { renderToString } from "react-dom/server";

// * Leaflet:
import L from "leaflet";

const getIcon = (
    icon: React.ReactElement
) => {
    const size = 24;

    return new L.DivIcon({
        html: renderToString(icon),
        className: "custom-leaflet-icon",
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size],
    });
};

export default getIcon;