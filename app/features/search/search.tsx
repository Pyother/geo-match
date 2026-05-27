"use client";

// * React:
import { useState, useContext } from "react";
import { AppContext } from "@/app/page";

// * Icons:
import { MapPin, MoveRight, Search as SearchIcon, X } from "lucide-react";

// * Types:
import type { City } from "@/app/types";

// * Actions:
import { getPlaces } from "./actions";

// * UI:
import { Field, FieldDescription, FieldLabel } from "@/app/ui/field";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { Card, CardContent, CardFooter } from "@/app/ui/card";
import { Spinner } from "@/app/ui/spinner";
import { Badge } from "@/app/ui/badge";
import "./search.css";

// * Components:
import SearchItem from "./search-item";

const countryFlag = (code: string) =>
    String.fromCodePoint(
        ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
    );

const Search = () => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { city, setCity, setDetails, setView } = useContext(AppContext);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getPlaces(query.trim());
            setResults(data?.results ?? []);
            if (!data?.results?.length) setError("No results found. Try a different query.");
        } catch {
            setError("Search failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='feature'>
            <div className='feature-header'>
                <h2 className="feature-title">
                    <MapPin className="size-7" />
                    Choose Your City
                </h2>
                <p>Select a city to start finding districts that match your location preferences.</p>
            </div>
            <div className='form'>
                <Card className='w-full max-w-md'>
                    <CardContent className="flex flex-col gap-(--spacing-md)">
                        {city && (
                            <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    {city.country_code && <span>{countryFlag(city.country_code)}</span>}
                                    <span>{city.city ?? city.name}</span>
                                    <Badge variant="outline" className="text-[10px]">{city.result_type}</Badge>
                                </div>
                                <button
                                    onClick={() => { setCity(null); setDetails(null); }}
                                    aria-label="Remove selected city"
                                    className="rounded-full p-0.5 opacity-60 hover:opacity-100"
                                >
                                    <X className="size-3.5" />
                                </button>
                            </div>
                        )}
                        <Field>
                            <FieldLabel htmlFor="search">Search</FieldLabel>
                            <FieldDescription>Enter a city name to search</FieldDescription>
                            <div className="flex gap-(--spacing-sm)">
                                <Input
                                    id="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !loading) handleSearch();
                                    }}
                                    placeholder="e.g. New York, NY"
                                />
                                <Button
                                    disabled={!query.trim() || loading}
                                    onClick={handleSearch}
                                >
                                    {loading ? <Spinner /> : <SearchIcon className="size-4" />}
                                </Button>
                            </div>
                        </Field>
                        {error && <p className="text-sm text-destructive">{error}</p>}
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
                    <p className="text-sm text-muted-foreground">{results.length} result{results.length > 1 ? "s" : ""} found:</p>
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
