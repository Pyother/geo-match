"use client";

import { useState } from "react";
import type { Preference } from "@/app/types/Preference";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/ui/select";
import { Field, FieldDescription, FieldLabel } from "@/app/ui/field";
import { Button } from "@/app/ui/button";
import { preferences } from "@/app/consts";

const PreferenceSelect = ({
    pending,
    onAdd,
}: {
    pending: Preference[] | null;
    onAdd: (preference: Preference) => void;
}) => {
    const [selected, setSelected] = useState("");

    const handleAdd = () => {
        const pref = preferences.find(p => p.name === selected);
        if (!pref) return;
        onAdd(pref);
        setSelected("");
    };

    return (
        <Field>
            <FieldLabel>Preference</FieldLabel>
            <FieldDescription>Select preferences to find matching districts.</FieldDescription>
            <div className="flex gap-(--spacing-sm)">
                <Select value={selected} onValueChange={(value) => setSelected(value ?? "")}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {preferences.map((p) => (
                            <SelectItem
                                key={p.value}
                                value={p.name}
                                disabled={pending?.some(pp => pp.name === p.name)}
                            >
                                {p.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button disabled={!selected} onClick={handleAdd}>Add</Button>
            </div>
        </Field>
    );
};

export default PreferenceSelect;
