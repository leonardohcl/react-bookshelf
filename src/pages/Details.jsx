import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { get } from "../services/books-service"
import LoadingBlock from "../atoms/LoadingBlock"
import BookCard from "../atoms/BookCard"

const Details = () => {
    const [isLoading, setLoading] = useState(true);
    const [book, setBook] = useState(null)

    const params = useParams()

    useEffect(async () => {
        setLoading(true)
        const response = await get(params.id);
        setBook(response);
        setLoading(false)
    }, [])

    return isLoading ?
        <LoadingBlock /> :
        <Container></Container>
}

export default Details