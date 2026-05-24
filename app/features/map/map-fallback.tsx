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

const MapFallback = () => {

    const { city, preferences, setView } = useContext(AppContext);

    return (
        <Alert variant="default" className="map-fallback">
            <AlertTitle>Map Unavailable</AlertTitle>
            <AlertDescription>
                To view the map, first select a city and your preferences.
            </AlertDescription>
                <AlertAction>
                    {!city &&
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