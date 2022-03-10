import { Col, Row } from "react-bootstrap";
import AutoPagination from "../atoms/AutoPagination";
import BookCard from "../atoms/BookCard";

const BookList = props => {
    const handlePageChange = evt => {
        const nextPageText = evt.target.innerText;
        let nextPage;
        if (isNaN(nextPageText)) {
            if (nextPageText.indexOf("›") >= 0) {
                nextPage = props.currentPage + 1;
            }
            else if (nextPageText.indexOf("»") >= 0) {
                nextPage = Math.ceil(props.total / props.pageSize);
            }
            else if (nextPageText.indexOf("‹") >= 0) {
                nextPage = props.currentPage - 1;
            }
            else {
                nextPage = 1;
            }
        } else {
            nextPage = nextPageText;
        }
        props.onPageChange(+nextPage, evt)
    }

    const books = props.books.map(book => {
        return <Col key={book.id} className="mb-3">
            <BookCard
                id={book.id}
                images={book.volumeInfo.imageLinks}
                title={book.volumeInfo.title}
                subtitle={book.volumeInfo.subtitle}
                authors={book.volumeInfo.authors}
                publisher={book.volumeInfo.publisher}
                date={book.volumeInfo.publishedDate} />
        </Col>
    });

    return <div className="book-list">
        {props.total > 0 && <Row xs="1" md="2" xl="3">
            {books}
        </Row>}
        <div className="d-flex justify-content-end">
            <AutoPagination pageSize={props.pageSize} total={props.total} currentPage={props.currentPage} onChange={handlePageChange} />
        </div>
    </div>
}

export default BookList