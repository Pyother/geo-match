"use client";

// * React and Next:
import { useState, createContext, type Dispatch, type SetStateAction } from "react";
import dynamic from "next/dynamic";

// * UI:
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/ui/tabs";
import "./app.css";

// * Features:
import Search from "./features/search/search";
import Preferences from "./features/preferences/preferences";
const Map = dynamic(() => import("./features/map/map"), { ssr: false });

// * Types:
type View = "search" | "preferences" | "map";
import type { Preference } from "./types/Preference";
import type { City } from "./types/City";

// * App context:
export const AppContext = createContext<{
    view: View;
    setView: (view: View) => void;
    preferences: Preference[] | null;
    setPreferences: Dispatch<SetStateAction<Preference[] | null>>;
    city: City | null;
    setCity: Dispatch<SetStateAction<City | null>>;
}>({
    view: "search",
    setView: () => {},
    preferences: null,
    setPreferences: () => {},
    city: null,
    setCity: () => {},
});

export default function HomePage() {

    const [city, setCity] = useState<City | null>(null);
    const [view, setView] = useState<View>("search");
    const [preferences, setPreferences] = useState<Preference[] | null>(null);

    return (
        <AppContext.Provider 
            value={{ 
                view, 
                setView, 
                preferences, 
                setPreferences, 
                city, 
                setCity 
            }}
        >
            <div className="app">
                <div className="w-full">
                    <Tabs
                        className="tabs"
                        value={view}
                        onValueChange={(value: View) => setView(value)}
                    >
                        <TabsList className="tabs-list" variant="default">
                            <TabsTrigger value="search">Search</TabsTrigger>
                            <TabsTrigger value="preferences">Preferences</TabsTrigger>
                            <TabsTrigger value="map">Map</TabsTrigger>
                        </TabsList>
                        <TabsContent value="search" className="tabs-content">
                            <Search />
                        </TabsContent>
                        <TabsContent value="preferences" className="tabs-content">
                            <Preferences />
                        </TabsContent>
                        <TabsContent value="map" className="tabs-content">
                            <Map />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppContext.Provider>
    );
}
