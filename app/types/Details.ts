export type GeoJSONGeometry =
    | { type: "Point"; coordinates: [number, number] }
    | { type: "MultiPoint"; coordinates: [number, number][] }
    | { type: "LineString"; coordinates: [number, number][] }
    | { type: "MultiLineString"; coordinates: [number, number][][] }
    | { type: "Polygon"; coordinates: [number, number][][] }
    | { type: "MultiPolygon"; coordinates: [number, number][][][] };

export type Details = {
    type: "Feature";
    geometry: GeoJSONGeometry | null;
    properties: {
        feature_type: "details";

        place_id: string;
        name?: string;
        city?: string;
        county?: string;
        state?: string;
        state_code?: string;
        country?: string;
        country_code?: string;
        postcode?: string;
        street?: string;
        housenumber?: string;
        lat: number;
        lon: number;
        formatted?: string;
        address_line1?: string;
        address_line2?: string;
        result_type?: string;

        timezone?: {
            name: string;
            name_alt?: string;
            offset_STD: string;
            offset_STD_seconds: number;
            offset_DST: string;
            offset_DST_seconds: number;
            abbreviation_STD?: string;
            abbreviation_DST?: string;
        };

        website?: string;
        description?: string;
        opening_hours?: string;

        contact?: {
            phone?: string;
            phone_other?: string[];
            email?: string;
            email_other?: string[];
            fax?: string;
        };

        wiki_and_media?: {
            wikidata?: string;
            wikipedia?: string;
            wikimedia_commons?: string;
            image?: string;
        };

        internet_access?: boolean;
        wheelchair?: boolean;
        smoking?: boolean;
        outdoor_seating?: boolean;
        takeaway?: boolean;
        delivery?: boolean;
    };
};
