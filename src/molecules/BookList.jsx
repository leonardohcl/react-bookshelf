import { Col, Row } from "react-bootstrap";
import BookCard from "../atoms/BookCard";

const BookList = props => {
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
        <p className={`text-${props.total > 0 ? "end" : "center"} text-muted`}>Found {props.total} books</p>
        {props.total > 0 && <Row xs="1" md="2" xl="3">
            {books}
        </Row>}
    </div>
}

export default BookList