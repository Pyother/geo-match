"use client";

// * React:
import { useContext } from "react";
import { AppContext } from "@/app/page";

// * UI:
import PreferenceItem from "../preferences/preference-item";

const MapPanel = () => {

    const { preferences } = useContext(AppContext);

    return (
        <div className="map-panel">
            {preferences?.map(pref => (
                <PreferenceItem 
                    key={pref.value}
                    preference={pref}
                    removable={false}
                />
            ))}
        </div>
    )
}

export default MapPanel;