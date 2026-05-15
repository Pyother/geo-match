import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ placeId: string }> }
) {
    const { placeId } = await params;
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const boundary = data.features[0]?.geometry || null;

    return NextResponse.json(boundary);
}