const { useState, createContext } = require("react");

export const FavoritesContext = createContext({
    books: [],
    add: book => null,
    remove: id => null,
    isFavorite: id => false,
    getPage: (page, pageSize) => []
})

const deepCopy = obj => JSON.parse(JSON.stringify(obj))
const initFavorites = () => JSON.parse(localStorage.getItem("favorites") || "[]");
const saveFavorites = favorites => localStorage.setItem("favorites", JSON.stringify(favorites))

export const FavoritesProvider = props => {
    const [favorites, setFavorites] = useState(initFavorites())

    const updateFavorites = newValue => {
        setFavorites(newValue)
        saveFavorites(newValue)
    }

    const addFavorite = book => {
        const existing = favorites.find(x => x.id === book.id);
        if (!existing) {
            updateFavorites([...favorites, book])
        }
    }

    const removeFavorite = id => {
        const existingIndex = favorites.findIndex(x => x.id === id);
        if (existingIndex >= 0) {
            updateFavorites(favorites.filter(x => x.id !== id))
        }
    }

    const getFavoritesPage = (page, pageSize) => {
        const startIndex = (page - 1) * pageSize, endIndex = startIndex + pageSize;
        return deepCopy(favorites.slice(startIndex, endIndex + 1))
    }

    const isBookFavorite = id => favorites.findIndex(x => x.id === id) >= 0

    return <FavoritesContext.Provider
        value={{
            books: favorites,
            add: addFavorite,
            remove: removeFavorite,
            getPage: getFavoritesPage,
            isFavorite: isBookFavorite
        }}>
        {props.children}
    </FavoritesContext.Provider>
}