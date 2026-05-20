"use client";

// * UI:
import { 
    Field,
    FieldDescription,
    FieldLabel 
} from "@/app/ui/field";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/app/ui/card";

const SearchForm = () => {
    return (
        <div className='form'>
            <Card>
                <CardContent>
                    <Field>
                        <FieldLabel htmlFor="search">Search</FieldLabel>
                        <FieldDescription>Enter your search query</FieldDescription>
                        <Input id="search" />
                    </Field>
                </CardContent>
                <CardFooter>
                    <Button 
                        type="submit" 
                        className="w-full"
                    >
                        Search
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SearchForm;