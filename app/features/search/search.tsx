"use client";

// * React:
import { useState } from "react";

// * Icons:
import { Loader2, MapPin } from "lucide-react";

// * Types:
import type { City } from "@/app/types";

// * Actions:
import { getPlaces } from "./actions";

// * UI:
import { Field, FieldDescription, FieldLabel } from "@/app/ui/field";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { Card, CardContent, CardFooter } from "@/app/ui/card";
import "./search.css";

// * Components:
import SearchItem from "./search-item";

const Search = () => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const data = await getPlaces(query.trim());
            setResults(data?.results ?? []);

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
                <Card>
                    <CardContent>
                        <Field>
                            <FieldLabel htmlFor="search">Search</FieldLabel>
                            <FieldDescription>Enter your search query</FieldDescription>
                            <Input
                                id="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Field>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={!query.trim() || loading}
                            onClick={handleSubmit}
                        >
                            {loading
                                ? <Loader2 className="animate-spin" />
                                : "Search"
                            }
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            {results.length > 0 && (
                <>
                    <p>{results.length} results found:</p>
                    <div className="search-results">
                        {results.map((city) => (
                            <SearchItem key={city.place_id} city={city} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Search;
