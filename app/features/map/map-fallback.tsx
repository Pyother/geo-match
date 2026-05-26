"use client";

// * React and Next:
import { useContext } from "react";
import { AppContext } from "@/app/page";

// * UI:
import {
    Alert,
    AlertDescription,
    AlertTitle,
    AlertAction
} from "@/app/ui/alert";
import { Button } from "@/app/ui/button";
import "./map.css";

const MapFallback = ({ 
    areaExceeded, 
    noGeometry 
}: { 
    areaExceeded?: number | null, 
    noGeometry?: boolean 
}) => {

    const { city, preferences, setView } = useContext(AppContext);

    return (
        <Alert variant="default" className="map-fallback w-full max-w-md">
            <AlertTitle>Map Unavailable</AlertTitle>
            <AlertDescription>
                { !city || !preferences ? (
                    "Please choose a city and set your preferences to view the map."
                ) : noGeometry ? (
                    "The boundary of the selected area could not be determined. Please choose a different city."
                ) : areaExceeded ? (
                    `The selected area is ${areaExceeded.toFixed(2)} km². It's too large. Please choose a smaller area.`
                ) : (
                    "An unexpected error occurred while loading the map. Please try again."
                )}
            </AlertDescription>
                <AlertAction>
                    {(!city || areaExceeded || noGeometry) &&
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setView("search")}
                            className="flex flex-1"
                        >
                            Choose City
                        </Button>
                    }
                    {!preferences && 
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setView("preferences")}
                            className="flex flex-1"
                        >
                            Set Preferences
                        </Button>
                    }
                </AlertAction>
        </Alert>
    )
}

export default MapFallback;