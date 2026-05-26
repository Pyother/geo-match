"use server";

// * Types:
import { Preference, City, Place } from "@/app/types";

export async function getPlaces(
    city: City,
    preferences: Preference[]
): Promise<Place[]> {
    
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const preferencesString = preferences.map(p => p.value).join(",");
    const cityId = city.place_id;

    const url = `https://api.geoapify.com/v2/places?categories=${preferencesString}&filter=place:${cityId}&limit=500&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.features || [];
}