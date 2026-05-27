"use client";

import type { City } from "@/app/types";
import { X } from "lucide-react";
import { Badge } from "@/app/ui/badge";

export const countryFlag = (code: string) =>
    String.fromCodePoint(
        ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
    );

const CityChip = ({ city, onRemove }: { city: City; onRemove: () => void }) => (
    <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-2">
        <div className="flex items-center gap-2 text-sm font-medium">
            {city.country_code && <span>{countryFlag(city.country_code)}</span>}
            <span>{city.city ?? city.name}</span>
            <Badge variant="outline" className="text-[10px]">{city.result_type}</Badge>
        </div>
        <button
            onClick={onRemove}
            aria-label="Remove selected city"
            className="rounded-full p-0.5 opacity-60 hover:opacity-100"
        >
            <X className="size-3.5" />
        </button>
    </div>
);

export default CityChip;
