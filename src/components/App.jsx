import { HashRouter, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "../providers/favorites";
import NotFound from "../pages/404";
import Details from "../pages/Details";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home"
import Navigation from "./organisms/Navigation";

const App = () => <HashRouter>
    <Navigation />
    <FavoritesProvider>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </FavoritesProvider>
</HashRouter>


export default App;