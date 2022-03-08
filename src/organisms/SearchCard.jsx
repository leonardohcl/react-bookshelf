import { Card } from "react-bootstrap"
import { useEffect, useState } from "react";
import { list } from "../services/books-service"

import SearchForm from "../molecules/SearchForm"
import BookList from "../molecules/BookList";
import LoadingBlock from "../atoms/LoadingBlock";

const emptyBookList = { books: [], total: 0, page: 1 }

const SearchCard = () => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);
    const [activeQuery, setActiveQuery] = useState('')
    const [bookList, setBookList] = useState(emptyBookList)
    const [isLoading, setLoading] = useState(false)

    const searchBooks = async (query) => {
        setLoading(true);
        setError(null);
        if (activeQuery) {
            try {

                const { items, totalItems } = await list(activeQuery)
                setBookList((prev) => {
                    return { ...prev, books: items || [], total: totalItems }
                })
            }
            catch (err) {
                setError(err);
                setBookList(emptyBookList)
            }
        } else {
            setBookList(emptyBookList)
        }
        setLoading(false);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveQuery(query)
        }, 500)

        return () => clearTimeout(timer);
    }, [query])

    useEffect(async () => {
        searchBooks(activeQuery)
    }, [activeQuery])



    const handleQueryChange = evt => setQuery(evt.target.value)

    const handleFormSubmit = evt => {
        evt.preventDefault();
    }

    return <Card>
        <Card.Body>
            <Card.Title>Search for books</Card.Title>
            <SearchForm query={query} onChange={handleQueryChange} onSubmit={handleFormSubmit} />
            {isLoading ?
                <LoadingBlock /> :
                error ?
                    <p className="text-center text-danger">Something went wrong while searching for books related to '{activeQuery}'. Please try again.</p> :
                    activeQuery && <BookList books={bookList.books} total={bookList.total} />
            }
        </Card.Body>
    </Card>
}

export default SearchCard