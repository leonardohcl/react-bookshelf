import { useCallback, useContext, useEffect, useReducer, useState } from "react"
import { Card } from "react-bootstrap"
import { FavoritesContext } from "../../providers/favorites"
import { bookListReducer, emptyBookList } from "../../utils/book-list"
import BookList from "../molecules/BookList"


const FavoritesCard = () => {
    const [shouldRefreshList, setRefreshList] = useState(false)
    const [bookList, dispatchBookListUpdate] = useReducer(bookListReducer, { ...emptyBookList })
    const favorites = useContext(FavoritesContext)

    const handlePageChange = nextPage => {
        dispatchBookListUpdate({ type: "pageChange", value: nextPage })
    }

    const getPage = (page, pageSize) => favorites.getPage(page, pageSize);

    const handleToggleFavorite = () => {
        setRefreshList(true)
    }

    useEffect(() => {
        const { list, total } = getPage(bookList.page, bookList.pageSize)
        dispatchBookListUpdate({ type: "loadItems", books: list, total: total })
        if (shouldRefreshList) setRefreshList(false)
    }, [bookList.page, bookList.pageSize, shouldRefreshList])


    return <Card>
        <Card.Body>
            <Card.Title>My Favorite Books</Card.Title>
            {bookList.total > 0 ?
                <BookList books={bookList.books}
                    total={bookList.total}
                    currentPage={bookList.page}
                    pageSize={bookList.pageSize}
                    onPageChange={handlePageChange}
                    handleToggleFavorite={handleToggleFavorite} /> :
                <p className="text-center">No favorites found</p>}
        </Card.Body>
    </Card>
}

export default FavoritesCard