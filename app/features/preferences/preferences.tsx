"use client";

// * React:
import { useState, useContext } from "react";
import { AppContext } from "@/app/page";

// * Actions:
import { getPlaces } from "./actions";

// * Types:
import type { Preference } from "@/app/types/Preference";

// * UI:
import { Card, CardContent, CardFooter } from "@/app/ui/card";
import { Button } from "@/app/ui/button";
import { Spinner } from "@/app/ui/spinner";
import PreferenceSelect from "./preference-select";
import PreferenceList from "./preference-list";
import PreferencesFallback from "./preferences-fallback";
import { SlidersHorizontal, MoveRight, MoveLeft } from "lucide-react";
import "./preferences.css";


const Preferences = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { 
        city, 
        preferences: saved, 
        setPreferences, 
        setView, 
        setPlaces 
    } = useContext(AppContext);
    const [pending, setPending] = useState<Preference[] | null>(saved);

    const hasPending = pending && pending.length > 0;

    const handleAdd = (pref: Preference) => {
        setPending(prev => {
            if (!prev) return [pref];
            if (prev.some(p => p.name === pref.name)) return prev;
            return [...prev, pref];
        });
    };

    const handleRemove = (pref: Preference) => {
        const filter = (prev: Preference[] | null) => {
            const updated = prev?.filter(p => p.value !== pref.value) ?? null;
            return updated?.length ? updated : null;
        };
        setPending(filter);
        setPreferences(filter);
    };

    const handleSave = async () => {
        if (!pending || !city) return;
        setLoading(true);
        setError(null);
        try {
            const places = await getPlaces(city, pending);
            setPreferences(pending);
            setPlaces(places);
            setView("map");
        } catch {
            setError("Failed to fetch places. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature">
            <div className="feature-header">
                <h2 className="feature-title">
                    <SlidersHorizontal className="size-7" />
                    Preferences
                </h2>
                <p>Manage your location preferences to find the best matching districts.</p>
            </div>
            <div className="form">
                {!city ? (
                    <PreferencesFallback />
                ) : (
                    <Card className="w-full max-w-md">
                        <CardContent className="flex flex-col gap-(--spacing-md)">
                            <PreferenceSelect pending={pending} onAdd={handleAdd} />
                            {hasPending && 
                                <PreferenceList 
                                    pending={pending} 
                                    saved={saved} 
                                    onRemove={handleRemove} 
                                />
                            }
                            {error && 
                                <p className="text-sm text-destructive">{error}</p>
                            }
                        </CardContent>
                        <CardFooter className="flex flex-col items-stretch gap-(--spacing-sm)">
                            <Button disabled={!hasPending || loading} onClick={handleSave}>
                                {loading ? <><Spinner /> Searching for places…</> : "Save & go to map"}
                            </Button>
                            <div className="flex gap-(--spacing-sm)">
                                <Button variant="outline" className="flex-1" onClick={() => setView("search")}>
                                    <MoveLeft className="size-4" /> Back to search
                                </Button>
                                {saved && (
                                    <Button variant="outline" className="flex-1" onClick={() => setView("map")}>
                                        Go to map <MoveRight className="size-4" />
                                    </Button>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Preferences;