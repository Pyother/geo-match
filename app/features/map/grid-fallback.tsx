"use client";

// * UI:
import { Alert, AlertDescription, AlertTitle } from "@/app/ui/alert";
import { Loader2 } from "lucide-react";
import "./map.css";

const GridFallback = () => {
    return (
        <Alert className="map-calculating w-full max-w-md">
            <AlertTitle className="flex flex-row items-center">
                <p>Calculating Grid</p>
                <Loader2 className="animate-spin ml-2 size-3" />
            </AlertTitle>
            <AlertDescription>
                The grid is being calculated based on your preferences. This may take a moment, especially for larger areas.
            </AlertDescription>
        </Alert>
    )
}

export default GridFallback;