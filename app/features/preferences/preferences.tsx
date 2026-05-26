"use client";

// * React:
import { useState, useContext } from "react";
import { AppContext } from "@/app/page";

// * Actions:
import { getPlaces } from "./actions";

// * Types:
import type { Preference } from "@/app/types/Preference";

// * UI:
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/ui/select";
import { Card, CardContent, CardFooter } from "@/app/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/app/ui/field";
import { Button } from "@/app/ui/button";

// * Components:
import PreferenceItem from "./preference-item";

// * Icons:
import { SlidersHorizontal, MoveRight, MoveLeft } from "lucide-react";

// * Consts:
import { preferences } from "@/app/consts";

// * Styles:
import "./preferences.css";

const Preferences = () => {
    const [selected, setSelected] = useState<string>("");
    const {
        city,
        preferences: userPreferences,
        setPreferences: setUserPreferences,
        setView,
        setPlaces
    } = useContext(AppContext);
    const [pendingPreferences, setPendingPreferences] = useState<Preference[] | null>(userPreferences);;

    return (
        <div className='feature'>
            <div className='feature-header'>
                <h2 className="feature-title">
                    <SlidersHorizontal className="size-7" />
                    Preferences
                </h2>
                <p>Manage your location preferences to find the best matching districts.</p>
            </div>
            <div className='form'>
                <Card className='w-full max-w-md'>
                    <CardContent>
                        <Field>
                            <FieldLabel htmlFor="preference">Preference</FieldLabel>
                            <FieldDescription>Select a preference to find matching districts.</FieldDescription>
                            <Select value={selected} onValueChange={(value) => setSelected(value ?? "")}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {preferences.map((preference) => (
                                        <SelectItem
                                            key={preference.value}
                                            value={preference.name}
                                            disabled={pendingPreferences?.some(p => p.name === preference.name)}
                                        >
                                            {preference.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </CardContent>
                    <CardFooter className="flex flex-col items-stretch gap-(--spacing-sm)">

                        {/* Add selected preference to pending preferences */}
                        <Button
                            className='w-full'
                            disabled={!selected}
                            onClick={() => {
                                if (!selected) return;
                                const newPreference = preferences.find(p => p.name === selected);
                                if (!newPreference) return;
                                setPendingPreferences((prev: Preference[] | null) => {
                                    if (!prev) return [newPreference];
                                    if (prev.some(p => p.name === newPreference.name)) return prev;
                                    return [...prev, newPreference];
                                });
                                setSelected("");
                            }}
                        >
                            Add preference
                        </Button>

                        {/* Save preferences and fetch places */}
                        <Button
                            variant="outline"
                            onClick={() => {
                                if (!pendingPreferences || !city) return;
                                setUserPreferences(pendingPreferences);
                                getPlaces(city, pendingPreferences).then(places => {
                                    setPlaces(places);
                                });
                            }}
                        >
                            Save preferences
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Navigation buttons */}
            <div className='flex flex-row items-center gap-(--spacing-md)'>
                {!city && (
                    <Button
                        variant="default"
                        onClick={() => setView("search")}
                    >
                        <MoveLeft className="size-4" />
                        Back to search
                    </Button>
                )}
                {userPreferences && (
                    <Button
                        variant="default"
                        onClick={() => setView("map")}
                    >
                        Go to map
                        <MoveRight className="size-4" />
                    </Button>
                )}
            </div>

            {/* Pending preferences list */}
            {pendingPreferences && pendingPreferences.length > 0 && (
                <>
                    <p>{pendingPreferences.length} preference{pendingPreferences.length > 1 ? "s" : ""} selected:</p>
                    <div className="preferences-list">
                        {pendingPreferences.map((preference) => (
                            <PreferenceItem
                                key={preference.value}
                                preference={preference}
                                saved={userPreferences?.some(p => p.value === preference.value)}
                                onRemove={() => setPendingPreferences(prev => {
                                    const updated = prev?.filter(p => p.value !== preference.value) ?? null;
                                    return updated && updated.length > 0 ? updated : null;
                                })}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Preferences;