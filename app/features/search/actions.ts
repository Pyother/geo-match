"use server";

import type { City } from "@/app/types/City";

export async function getPlaces(query: string): Promise<{ results: City[] } | null> {

    if (!query.trim()) return null;
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&format=json&apiKey=${apiKey}`;
    
    const places = await fetch(url);
    return places.json();
}