"use client";

import { useContext } from "react";
import { AppContext } from "@/app/page";
import { Alert, AlertDescription, AlertTitle } from "@/app/ui/alert";
import { Button } from "@/app/ui/button";

const PreferencesFallback = () => {
    const { setView } = useContext(AppContext);

    return (
        <Alert variant="default" className="preferences-fallback w-full max-w-md">
            <AlertTitle>No city selected</AlertTitle>
            <AlertDescription>
                Please choose a city first before setting your preferences.
            </AlertDescription>
            <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setView("search")}
            >
                Choose city
            </Button>
        </Alert>
    );
};

export default PreferencesFallback;
