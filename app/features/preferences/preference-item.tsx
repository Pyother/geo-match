"use client";

// * Types:
import type { Preference } from "@/app/types/Preference";

// * Icons:
import { X } from "lucide-react";

// * UI:
import { Badge } from "@/app/ui/badge";

const PreferenceItem = ({ 
    preference, 
    saved, 
    removable = true,
    onRemove 
}: { 
    preference: Preference, 
    saved?: boolean, 
    removable?: boolean,
    onRemove?: () => void 
}) => {
    return (
        <Badge variant="secondary" className={`h-7 gap-(--spacing-md) px-(--spacing-md) text-xs${saved ? ' severity-info' : ''}`}>
            {preference.name}
            {removable && (
                <button
                    onClick={onRemove}
                    aria-label={`Remove ${preference.name}`}
                    className="ml-(--spacing-sm) rounded-full opacity-60 hover:opacity-100 focus:outline-none"
                >
                    <X className="size-3" />
                </button>
            )}
        </Badge>
    );
};

export default PreferenceItem;
