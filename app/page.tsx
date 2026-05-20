// * Components:
import App from "./app";

// * Features:
import Search from "./features/search/search";
import Preferences from "./features/preferences/preferences";
import Map from "./features/map";

export default function HomePage() {
    return (
        <App
            search={<Search />}
            preferences={<Preferences />}
            map={<Map />}
        />
    );
}