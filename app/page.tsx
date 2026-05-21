"use client";

// * React:
import { useState, createContext, type Dispatch, type SetStateAction } from "react";

// * UI:
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/ui/tabs";
import "./app.css";

// * Features:
import Search from "./features/search/search";
import Preferences from "./features/preferences/preferences";
import Map from "./features/map";

// * Types:
type View = "search" | "preferences" | "map";
import type { Preference } from "./types/Preference";

// * App context:
export const AppContext = createContext<{
    view: View;
    setView: (view: View) => void;
    preferences: Preference[] | null;
    setPreferences: Dispatch<SetStateAction<Preference[] | null>>;
}>({
    view: "search",
    setView: () => {},
    preferences: null,
    setPreferences: () => {},
});

export default function HomePage() {
    const [view, setView] = useState<View>("search");
    const [preferences, setPreferences] = useState<Preference[] | null>(null);

    return (
        <AppContext.Provider value={{ view, setView, preferences, setPreferences }}>
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
