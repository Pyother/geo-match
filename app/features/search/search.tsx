"use server";

// * Icons:
import { MapPin } from "lucide-react";

// * Form:
import SearchForm from "./search-form";

// * UI:
import "./search.css";

const Search = async () => {
    return (
        <div className='feature'>
            <div className='header'>
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 flex items-center gap-2">
                    <MapPin className="size-7" />
                    Choose Your City
                </h2>
                <p>Select a city to start finding districts that match your location preferences.</p>
            </div>
            <SearchForm />
        </div>
    )
}

export default Search;