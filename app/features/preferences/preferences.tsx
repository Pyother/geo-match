"use server";

// * Form:
import PreferencesForm from "./preferences-form";

// * Icons:
import { SlidersHorizontal } from "lucide-react";

const Preferences = async () => {
    return (
        <div className='feature'>
            <div className='header'>
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 flex items-center gap-2">
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