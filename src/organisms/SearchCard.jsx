import { Card } from "react-bootstrap"
import { useEffect, useReducer, useState } from "react";
import { list } from "../services/books-service"

import SearchForm from "../molecules/SearchForm"
import BookList from "../molecules/BookList";
import LoadingBlock from "../atoms/LoadingBlock";

const emptyBookList = { books: [], total: 0, query: "", page: 1, pageSize: 12 }

const bookListReducer = (state, action) => {
    switch (action.type) {
        case "pageChange":
            return { ...state, page: action.value }
        case "queryChange":
            return { ...state, query: action.value, page: 1 }
        case "loadItems":
            return { ...state, books: action.books, total: action.total }
    }
    return { ...emptyBookList }
}

const SearchCard = () => {
    const [error, setError] = useState(null);
    const [bookList, dispatchBookListUpdate] = useReducer(bookListReducer, { ...emptyBookList })
    const [isLoading, setLoading] = useState(false)

    const handlePageChange = evt => {
        const nextPageText = evt.target.innerText;
        let nextPage;
        if (isNaN(nextPageText)) {
            if (nextPageText.indexOf("›") >= 0) {
                nextPage = bookList.page + 1;
            }
            else if (nextPageText.indexOf("»") >= 0) {
                nextPage = Math.ceil(bookList.total / bookList.pageSize);
            }
            else if (nextPageText.indexOf("‹") >= 0) {
                nextPage = bookList.page - 1;
            }
            else {
                nextPage = 1;
            }
        } else {
            nextPage = +nextPageText;
        }
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
                    bookList.query && <BookList
                        query={bookList.query}
                        books={bookList.books}
                        total={bookList.total}
                        currentPage={bookList.page}
                        pageSize={bookList.pageSize}
                        onPageChange={handlePageChange} />
            }
        </Card.Body>
    </Card>
}

export default SearchCard