export type Place = {
    type: "Feature";
    geometry: {
        type: "Point";
        coordinates: [number, number];
    };
    properties: {
        place_id: string;
        name?: string;
        lat: number;
        lon: number;
        categories: string[];
        formatted?: string;
        address_line1?: string;
        address_line2?: string;
        country?: string;
        state?: string;
        city?: string;
        postcode?: string;
        street?: string;
        housenumber?: string;
        distance?: number;
    };
};
