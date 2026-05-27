"use client";

// * UI:
import { Alert, AlertDescription, AlertTitle } from "@/app/ui/alert";
import { Loader2 } from "lucide-react";
import "./map.css";

const messages = {
    grid: {
        title: "Calculating Grid",
        description: "The grid is being calculated based on your preferences. This may take a moment, especially for larger areas.",
    },
    matches: {
        title: "Calculating Matches",
        description: "Matching places to grid cells. This may take a moment for larger areas.",
    },
};

const GridFallback = ({ calculating = "grid" }: { calculating?: "grid" | "matches" }) => {
    const { title, description } = messages[calculating];
    return (
        <Alert className="map-calculating w-full max-w-md">
            <AlertTitle className="flex flex-row items-center">
                <p>{title}</p>
                <Loader2 className="animate-spin ml-2 size-3" />
            </AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    );
};

export default GridFallback;