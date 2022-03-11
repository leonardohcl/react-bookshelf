import { fireEvent, render } from "@testing-library/react"
import { BrowserRouter, matchPath, Route, Routes, useLocation } from "react-router-dom"
import book from "../../../mocks/book.json"
import { FavoritesProvider } from "../../../providers/favorites"
import BookCard from "./BookCard"


test("render correctly", () => {
    const { container } = render(
        <BookCard
            id={book.id}
            images={book.volumeInfo.imageLinks}
            title={book.volumeInfo.title}
            subtitle={book.volumeInfo.subtitle}
            authors={book.volumeInfo.authors}
            publisher={book.volumeInfo.publisher}
            date={book.volumeInfo.publishedDate}
            disableNavigation
        />
    )

    expect(container.getElementsByClassName("book-card")).toHaveLength(1)
})

test("render vertical correctly", () => {
    const { container } = render(<BookCard
        id={book.id}
        images={book.volumeInfo.imageLinks}
        title={book.volumeInfo.title}
        subtitle={book.volumeInfo.subtitle}
        authors={book.volumeInfo.authors}
        publisher={book.volumeInfo.publisher}
        date={book.volumeInfo.publishedDate}
        disableNavigation
        vertical
    />)

    expect(container.getElementsByClassName("book-card--vertical")).toHaveLength(1)

})

test("navigate to correct page on click", () => {
    const { container } = render(<BrowserRouter>
        <Routes>
            <Route path="/" element={
                <BookCard
                    id={book.id}
                    images={book.volumeInfo.imageLinks}
                    title={book.volumeInfo.title}
                    subtitle={book.volumeInfo.subtitle}
                    authors={book.volumeInfo.authors}
                    publisher={book.volumeInfo.publisher}
                    date={book.volumeInfo.publishedDate}
                />
            } />
            <Route path="/books/:id" element={<div>Book Page</div>} />
        </Routes>
    </BrowserRouter>)

    fireEvent.click(container.getElementsByClassName("book-card--body")[0])


    expect(window.location.pathname).toBe(`/books/${book.id}`)
})

test("toggles favorite correctly", () => {
    const { container } = render(<FavoritesProvider>
        <BookCard
            id={book.id}
            images={book.volumeInfo.imageLinks}
            title={book.volumeInfo.title}
            subtitle={book.volumeInfo.subtitle}
            authors={book.volumeInfo.authors}
            publisher={book.volumeInfo.publisher}
            date={book.volumeInfo.publishedDate}
            disableNavigation
        />
    </FavoritesProvider>)

    const btn = container.getElementsByClassName("book-card--favorite-btn")[0]

    fireEvent.click(btn)
    
    expect(container.getElementsByClassName("book-card--favorite")).toHaveLength(1)
    
    fireEvent.click(btn)

    expect(container.getElementsByClassName("book-card--favorite")).toHaveLength(0)
})