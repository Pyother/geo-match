"use client";

// * React:
import { useContext } from "react";
import { AppContext } from "@/app/page";

// * Actions:
import { getCityDetails } from "./actions";

// * Types:
import { City, Details } from "@/app/types";

// * Icons:
import { Clock } from "lucide-react";

// * UI:
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
    CardFooter,
    CardHeader,
    CardAction,
} from "@/app/ui/card";
import { Button } from "@/app/ui/button";

const countryFlag = (code: string) =>
    String.fromCodePoint(
        ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
    );

const SearchItem = ({
    city,
    severity = "default",
    removable = false,
}: {
    city: City,
    severity?: "default" | "info",
    removable?: boolean
}) => {
    const flag = city.country_code ? countryFlag(city.country_code) : null;
    const tz = city.timezone;
    const { setCity, setDetails } = useContext(AppContext);

    return (
        <Card 
            size="sm" 
            severity={severity} 
            className='w-full max-w-md'
        >
            <CardHeader>
                <CardTitle className="flex items-center gap-1.5">
                    {flag && <span>{flag}</span>}
                    {city.city ?? city.name}
                </CardTitle>
                <CardAction>
                    <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {city.result_type}
                    </span>
                </CardAction>
                <CardDescription>{city.address_line2}</CardDescription>
            </CardHeader>
            {tz && (
                <CardContent>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="size-3 shrink-0" />
                        <span>
                            {tz.abbreviation_STD ?? tz.name}
                            {tz.offset_STD && ` · UTC${tz.offset_STD}`}
                        </span>
                    </div>
                </CardContent>
            )}
            <CardFooter className="flex-col gap-2">
                {!removable && (
                    <Button 
                        className="w-full" 
                        onClick={async () => { 
                            setCity(city); 
                            const details = await getCityDetails(city);
                            setDetails(details);
                        }}
                    >
                        Select
                    </Button>
                )}
                {removable && (
                    <Button 
                        variant="destructive" 
                        className="w-full" 
                        onClick={() => {
                            setCity(null);
                            setDetails(null);
                        }}
                    >
                        Remove
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default SearchItem;
