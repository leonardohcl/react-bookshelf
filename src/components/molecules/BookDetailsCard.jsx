import { sanitize } from 'dompurify'
import { Badge, Card } from "react-bootstrap"

const BookDetailsCard = props => {
    return <Card className="book-details-card">
        <Card.Body>
            {props.categories && <div className="book-details-card--genres book-details-card--section">
                <b>Categories: </b>{props.categories.map((cat, idx) => <Badge key={idx} className='me-1' pill bg="secondary">{cat}</Badge>)}
            </div>}

            <div className="book-details-card--description book-details-card--section" dangerouslySetInnerHTML={{
                __html: sanitize(`<b>About</b>${props.description || "<p class='mb-0'> No description available</p>"}`)
            }} />

        </Card.Body>
    </Card>
}

export default BookDetailsCard