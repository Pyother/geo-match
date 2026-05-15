import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ name: string }> }
) {
    const { name } = await params;
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(name)}&format=json&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
}