import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { get } from "../services/books-service"
import LoadingBlock from "../components/atoms/LoadingBlock/LoadingBlock"
import BookCard from "../components/atoms/BookCard/BookCard"
import BookDetailsCard from "../components/atoms/BookDetailsCard/BookDetailsCard"

const Details = () => {
    const [isLoading, setLoading] = useState(true);
    const [book, setBook] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const response = await get(params.id);
                setBook(response);
                setLoading(false)
            }
            catch (err) {
                navigate("/404")
            }
        }
        load();
    }, [params.id])

    return isLoading ?
        <LoadingBlock /> :
        <Container>
            <Row className="align-items-start">
                <Col md={4} lg={3} className="mb-3">
                    <BookCard
                        id={book.id}
                        images={book.volumeInfo.imageLinks}
                        title={book.volumeInfo.title}
                        subtitle={book.volumeInfo.subtitle}
                        authors={book.volumeInfo.authors}
                        publisher={book.volumeInfo.publisher}
                        date={book.volumeInfo.publishedDate}
                        vertical
                        disableNavigation
                    />
                </Col>
                <Col>
                    <BookDetailsCard
                        categories={book.volumeInfo.categories}
                        description={book.volumeInfo.description}
                    />
                </Col>
            </Row>
        </Container>
}

export default Details