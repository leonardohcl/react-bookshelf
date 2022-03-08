import { Card } from "react-bootstrap"
import { useCallback, useEffect, useState } from "react";
import { list } from "../services/books-service"

import SearchForm from "../molecules/SearchForm"
import BookList from "../molecules/BookList";
import LoadingBlock from "../atoms/LoadingBlock";

const emptyBookList = { books: [], total: 0, page: 1 }
const initialPagination = { page: 1, pageSize: 12 }

const SearchCard = () => {
    const [pagination, setPagination] = useState(initialPagination)
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);
    const [activeQuery, setActiveQuery] = useState('')
    const [bookList, setBookList] = useState(emptyBookList)
    const [isLoading, setLoading] = useState(false)

    const searchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        if (activeQuery) {
            try {
                const { items, totalItems } = await list(activeQuery, pagination.page, pagination.pageSize)
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
    }, [activeQuery, pagination.page, pagination.pageSize])

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveQuery(query)
            setPagination({ page: 1, pageSize: 12 })
        }, 500)

        return () => clearTimeout(timer);
    }, [query])

    useEffect(() => {
        searchBooks()
    }, [searchBooks])



    const handleQueryChange = evt => setQuery(evt.target.value)

    const handleFormSubmit = evt => {
        evt.preventDefault();
    }

    const handlePageChange = evt => {
        const nextPageText = evt.target.innerText;
        let nextPage;
        if (isNaN(nextPageText)) {
            if (nextPageText.indexOf("›") >= 0) {
                nextPage = pagination.page + 1;
            }
            else if (nextPageText.indexOf("»") >= 0) {
                nextPage = Math.ceil(bookList.total / pagination.pageSize);
            }
            else if (nextPageText.indexOf("‹") >= 0) {
                nextPage = pagination.page - 1;
            }
            else {
                nextPage = 1;
            }
        } else {
            nextPage = +nextPageText;
        }
        setPagination(prev => {
            return { ...prev, page: nextPage }
        })
    }

    return <Card>
        <Card.Body>
            <Card.Title>Search for books</Card.Title>
            <SearchForm query={query} onChange={handleQueryChange} onSubmit={handleFormSubmit} />
            {isLoading ?
                <LoadingBlock /> :
                error ?
                    <p className="text-center text-danger">Something went wrong while searching for books related to '{activeQuery}'. Please try again.</p> :
                    activeQuery &&
                    <BookList
                        books={bookList.books}
                        total={bookList.total}
                        currentPage={pagination.page}
                        pageSize={pagination.pageSize}
                        onPageChange={handlePageChange} />
            }
        </Card.Body>
    </Card>
}

export default SearchCard