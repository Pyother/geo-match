"use client";

// * React:
import { useState, useContext } from "react";
import { AppContext } from "@/app/page";

// * Types:
import type { City } from "@/app/types";

// * Actions:
import { getPlaces } from "./actions";

// * UI:
import { Card, CardContent, CardFooter } from "@/app/ui/card";
import { Button } from "@/app/ui/button";
import { MapPin, MoveRight } from "lucide-react";
import { Alert } from "@/app/ui/alert";
import CityChip from "./city-chip";
import SearchInput from "./search-input";
import SearchItem from "./search-item";
import "./search.css";

const Search = () => {

    const [results, setResults] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { city, setCity, setDetails, setView } = useContext(AppContext);

    const handleSearch = async (query: string) => {
        setLoading(true);
        setError(null);
        setResults([]);
        try {
            const data = await getPlaces(query);
            setResults(data?.results ?? []);
            if (!data?.results?.length) setError("No results found. Try a different query.");
        } catch {
            setError("Search failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature">
            <div className="feature-header">
                <h2 className="feature-title">
                    <MapPin className="size-7" />
                    Choose Your City
                </h2>
                <p>Select a city to start finding districts that match your location preferences.</p>
            </div>
            <div className="form">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col gap-(--spacing-md)">
                        {city && <CityChip city={city} onRemove={() => { setCity(null); setDetails(null); }} />}
                        <SearchInput loading={loading} error={error} onSearch={handleSearch} />
                    </CardContent>
                    {city && (
                        <CardFooter>
                            <Button className="w-full" onClick={() => setView("preferences")}>
                                Go to preferences
                                <MoveRight className="size-4" />
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
            {results.length > 0 && (
                <>
                    <p className="text-xs text-muted-foreground">{results.length} result{results.length > 1 ? "s" : ""} found:</p>
                    <div className="search-results">
                        {results.map((result) => (
                            <SearchItem key={result.place_id} city={result} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Search;
