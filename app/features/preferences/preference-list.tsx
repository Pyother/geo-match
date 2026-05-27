"use client";

import type { Preference } from "@/app/types/Preference";
import PreferenceItem from "./preference-item";

const PreferenceList = ({
    pending,
    saved,
    onRemove,
}: {
    pending: Preference[];
    saved: Preference[] | null;
    onRemove: (preference: Preference) => void;
}) => (
    <div className="flex flex-col gap-(--spacing-sm)">
        <p className="text-xs text-muted-foreground">
            {pending.length} preference{pending.length > 1 ? "s" : ""} selected:
        </p>
        <div className="preferences-list">
            {pending.map((preference) => (
                <PreferenceItem
                    key={preference.value}
                    preference={preference}
                    saved={saved?.some(p => p.value === preference.value)}
                    onRemove={() => onRemove(preference)}
                />
            ))}
        </div>
    </div>
);

export default PreferenceList;
