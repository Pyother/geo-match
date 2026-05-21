"use client";

// * React:
import { useState, useContext } from "react";
import { AppContext } from "@/app/page";

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

// * Consts:
import { preferences } from "@/app/consts";

const PreferencesForm = () => {
    const [selected, setSelected] = useState<string>("");
    const { 
        preferences: userPreferences, 
        setPreferences: setUserPreferences
    } = useContext(AppContext);

    return (
        <Card className='form'>
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
                                    disabled={userPreferences?.some(p => p.name === preference.name)}
                                >
                                    {preference.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
            </CardContent>
            <CardFooter>
                <Button
                    className='w-full'
                    disabled={!selected}
                    onClick={() => {
                        if (!selected) return;
                        const newPreference = preferences.find(p => p.name === selected);
                        if (!newPreference) return;
                        setUserPreferences((prev: Preference[] | null) => {
                            if (!prev) return [newPreference];
                            if (prev.some(p => p.name === newPreference.name)) return prev;
                            return [...prev, newPreference];
                        });
                        setSelected("");
                    }}
                >
                    Add preference
                </Button>
            </CardFooter>
        </Card>
    );
}

export default PreferencesForm;