"use client";

// * React:
import { useContext } from "react";
import { AppContext } from "@/app/page";

// * Form:
import PreferencesForm from "./preferences-form";
import PreferenceItem from "./preference-item";

// * Icons:
import { SlidersHorizontal } from "lucide-react";

// * Styles:
import "./preferences.css";

const Preferences = () => {
    const { preferences: userPreferences } = useContext(AppContext);

    return (
        <div className='feature'>
            <div className='feature-header'>
                <h2 className="feature-title">
                    <SlidersHorizontal className="size-7" />
                    Preferences
                </h2>
                <p>Manage your location preferences to find the best matching districts.</p>
            </div>
            <PreferencesForm />
            {userPreferences && userPreferences.length > 0 && (
                <>
                    <p>{userPreferences.length} preference{userPreferences.length > 1 ? "s" : ""} selected:</p>
                    <div className="preferences-list">
                        {userPreferences.map((preference) => (
                            <PreferenceItem key={preference.value} preference={preference} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Preferences;