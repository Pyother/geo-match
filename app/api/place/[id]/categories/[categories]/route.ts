import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ 
        id: string,
        categories: string
    }> }
) {
    const { id: placeId, categories: categoriesString } = await params;
    const categories = categoriesString.split(",");
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v2/places?categories=${categories.join(",")}&filter=place:${placeId}&limit=50&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
}