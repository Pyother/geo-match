// * Lucide icons:
import {
    MapPin,
    ShoppingCart,
    ShoppingBag,
    Coffee,
    Hospital,
    Pill,
    Beef,
    Beer,
    Bed,
    Dumbbell
} from "lucide-react";

export const icons = {
    "default": MapPin,
    "hospital": Hospital,
    "pharmacy": Pill,
    "supermarket": ShoppingCart,
    "shopping_mall": ShoppingBag,
    "restaurant": Beef,
    "cafe": Coffee,
    "bar": Beer,
    "hotel": Bed,
    "gym": Dumbbell
};

export type IconKey = keyof typeof icons;