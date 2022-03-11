import { sanitize } from 'dompurify'
import { Badge, Card } from "react-bootstrap"

const BookDetailsCard = props => {
    return <Card className="book-details-card">
        <Card.Body>
            {props.categories && <div className="book-details-card--categories book-details-card--section">
                <b>Categories: </b>{props.categories.map((cat, idx) => <Badge key={idx} className='book-details-card--category me-1' pill bg="secondary">{cat}</Badge>)}
            </div>}

            <div className="book-details-card--description book-details-card--section" dangerouslySetInnerHTML={{
                __html: sanitize(`<b class="me-2">About</b>${props.description || "<p class='mb-0'> No description available</p>"}`)
            }} />

        </Card.Body>
    </Card>
}

export default BookDetailsCard