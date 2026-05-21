"use server";

// * Form:
import PreferencesForm from "./preferences-form";

// * Icons:
import { SlidersHorizontal } from "lucide-react";

const Preferences = async () => {
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
        </div>
    )
}

export default Preferences;