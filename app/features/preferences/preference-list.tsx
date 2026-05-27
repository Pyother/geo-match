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
        <div className="preferences-list">
            {saved && saved.length > 0 && 
            saved
                .filter(s => !pending.some(p => p.value === s.value))
                .map((preference) => (
                    <PreferenceItem 
                        key={preference.value}
                        preference={preference}
                        saved={true}
                        removable={false}
                    />
                ))}
            
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
