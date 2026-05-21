export type City = {
    place_id: string;
    name: string;
    city?: string;
    county?: string;
    state?: string;
    state_code?: string;
    country: string;
    country_code: string;
    postcode?: string;
    lon: number;
    lat: number;
    formatted: string;
    address_line1: string;
    address_line2: string;
    result_type: "unknown" | "amenity" | "building" | "street" | "suburb" | "district" | "postcode" | "city" | "county" | "state" | "country";
    rank: {
        importance: number;
        popularity: number;
        confidence: number;
        confidence_city_level: number;
        confidence_street_level: number;
        confidence_building_level: number;
        match_type: "full_match" | "inner_part" | "match_by_building" | "match_by_street" | "match_by_postcode" | "match_by_city_or_district" | "match_by_country_or_state";
    };
    timezone?: {
        name: string;
        offset_STD: string;
        offset_STD_seconds: number;
        offset_DST: string;
        offset_DST_seconds: number;
        abbreviation_STD?: string;
        abbreviation_DST?: string;
    };
};