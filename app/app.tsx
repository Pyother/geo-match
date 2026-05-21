"use client";

// * React:
import { useState, createContext } from "react";

// * UI:
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/ui/tabs";
import "./app.css";

// * Types:
type View = "search" | "preferences" | "map";

// * App context:
export const AppContext = createContext<{
    view: View;
    setView: (view: View) => void;
}>({
    view: "search",
    setView: () => {},
});

export default function App({
    search,
    preferences,
    map,
}: {
    search: React.ReactNode;
    preferences: React.ReactNode;
    map: React.ReactNode;
}) {
    const [view, setView] = useState<View>("search");

    return (
        <AppContext.Provider value={{ view, setView }}>
            <div className="app">
                <div className='w-full'>
                    <Tabs
                        className="tabs"
                        value={view}
                        onValueChange={(value: View) => setView(value)}
                    >
                        <TabsList 
                            className="tabs-list" 
                            variant='default'
                        >
                            <TabsTrigger value="search">Search</TabsTrigger>
                            <TabsTrigger value="preferences">Preferences</TabsTrigger>
                            <TabsTrigger value="map">Map</TabsTrigger>
                        </TabsList>
                        <TabsContent value="search" className="tabs-content">   
                            {search}
                        </TabsContent>
                        <TabsContent value="preferences" className="tabs-content">
                            {preferences}
                        </TabsContent>
                        <TabsContent value="map" className="tabs-content">
                            {map}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppContext.Provider>
    );
}
