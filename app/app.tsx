"use client";

import { useState } from "react";

type View = "search" | "preferences" | "map";

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
        <div className="h-full">
            <nav className="flex gap-2 p-4">
                <button onClick={() => setView("search")}>Search</button>
                <button onClick={() => setView("preferences")}>Preferences</button>
                <button onClick={() => setView("map")}>Map</button>
            </nav>
            <main className="p-4">
                {view === "search" && search}
                {view === "preferences" && preferences}
                {view === "map" && map}
            </main>
        </div>
    );
}
