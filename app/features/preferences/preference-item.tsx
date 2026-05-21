"use client";

// * React:
import { useContext } from "react";
import { AppContext } from "@/app/page";

// * Types:
import type { Preference } from "@/app/types/Preference";

// * Icons:
import { X } from "lucide-react";

// * UI:
import { Badge } from "@/app/ui/badge";

const PreferenceItem = ({ preference }: { preference: Preference }) => {
    const { preferences, setPreferences } = useContext(AppContext);

    const handleRemove = () => {
        if (!preferences) return;
        const updated = preferences.filter(p => p.value !== preference.value);
        setPreferences(updated.length > 0 ? updated : null);
    };

    return (
        <Badge variant="outline" className="h-7 gap-(--spacing-md) px-(--spacing-md) text-xs">
            {preference.name}
            <button
                onClick={handleRemove}
                aria-label={`Remove ${preference.name}`}
                className="ml-(--spacing-sm) rounded-full opacity-60 hover:opacity-100 focus:outline-none"
            >
                <X className="size-3" />
            </button>
        </Badge>
    );
};

export default PreferenceItem;
