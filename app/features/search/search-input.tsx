"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/app/ui/field";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { Spinner } from "@/app/ui/spinner";

const SearchInput = ({
    loading,
    error,
    onSearch,
}: {
    loading: boolean;
    error: string | null;
    onSearch: (query: string) => void;
}) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (!query.trim()) return;
        onSearch(query.trim());
    };

    return (
        <>
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
                        placeholder="e.g. Paris"
                    />
                    <Button disabled={!query.trim() || loading} onClick={handleSearch}>
                        {loading ? <Spinner /> : <SearchIcon className="size-4" />}
                    </Button>
                </div>
            </Field>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </>
    );
};

export default SearchInput;
