"use server";

import { City, Details } from "@/app/types";

export async function getPlaces(query: string): Promise<{ results: City[] } | null> {

    if (!query.trim()) return null;
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&format=json&apiKey=${apiKey}`;
    
    const places = await fetch(url);
    return places.json();
}

export async function getCityDetails(city: City): Promise<Details | null> {

    const apiKey = process.env.GEOAPIFY_API_KEY;
    const data = await fetch(`https://api.geoapify.com/v2/place-details?id=${city.place_id}&apiKey=${apiKey}`);
    
    const result = await data.json();
    return result.features?.[0] ?? null;
}