import { Card } from "react-bootstrap"
import { useEffect, useReducer, useState } from "react";
import { list } from "../../services/books-service"

import SearchForm from "../molecules/SearchForm"
import BookList from "../molecules/BookList";
import LoadingBlock from "../atoms/LoadingBlock/LoadingBlock";
import { bookListReducer, emptyBookList } from "../../utils/book-list";


const SearchCard = () => {
    const [error, setError] = useState(null);
    const [bookList, dispatchBookListUpdate] = useReducer(bookListReducer, { ...emptyBookList })
    const [isLoading, setLoading] = useState(false)

    const handlePageChange = nextPage => {
        dispatchBookListUpdate({ type: "pageChange", value: nextPage })
    }

    const handleFormSubmit = data => {
        dispatchBookListUpdate({ type: "queryChange", value: data })
    }

    const searchBooks = async (query, page = 1, pageSize = 12) => {
        setLoading(true);
        setError(null);
        if (query) {
            try {
                const { items, totalItems } = await list(query, page, pageSize)
                dispatchBookListUpdate({ type: "loadItems", books: items || [], total: totalItems })
            }
            catch (err) {
                setError(err);
                dispatchBookListUpdate({ type: "error" })
            }
        } else {
            dispatchBookListUpdate({ type: "queryChange", value: "" })
        }
        setLoading(false);
    }

    useEffect(
        () => searchBooks(bookList.query, bookList.page, bookList.pageSize),
        [bookList.query, bookList.page, bookList.pageSize]
    )

    return <Card>
        <Card.Body>
            <Card.Title>Search for books</Card.Title>
            <SearchForm onSubmit={handleFormSubmit} disabled={isLoading} />
            {isLoading ?
                <LoadingBlock /> :
                error ?
                    <p className="text-center text-danger">Something went wrong while searching for books related to '{bookList.query}'. Please try again.</p> :
                    bookList.query && [
                        <p key="searchResults" className={`text-${bookList.total > 0 ? "end" : "center"} text-muted`}>
                            Found {bookList.total} books related to "{bookList.query}"
                        </p>,
                        <BookList key="bookList"
                            books={bookList.books}
                            total={bookList.total}
                            currentPage={bookList.page}
                            pageSize={bookList.pageSize}
                            onPageChange={handlePageChange} />
                    ]
            }
        </Card.Body>
    </Card>
}

export default SearchCard