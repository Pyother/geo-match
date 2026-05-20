"use client";

// * React:
import { useState } from "react";

// * UI:
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/ui/select";
import { Card, CardContent } from "@/app/ui/card";

// * Consts:
import { categories } from "@/app/consts";

const PreferencesForm = () => {
    const [selected, setSelected] = useState<string>("");

    return (
        <Card className='form'>
            <CardContent>
                <Select value={selected} onValueChange={setSelected}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
}

export default PreferencesForm;