import { faCamera, faSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Image } from "react-bootstrap";

const BookCard = props => {

    const thumbnail = props.images ? props.images.smallThumbnail || props.images.small : "";
    const year = props.date && props.date.slice(0,4)

    return <Card className="book-card">
        <Card.Body className="book-card--body">
            <div className="book-card--image-container">
                {thumbnail ?
                    <Image src={thumbnail} className="book-card--thumbnail" thumbnail /> :
                    <div className="book-card--thumbnail book-card--thumbnail-empty">
                        <div className="fa-layers fa-fw">
                            <FontAwesomeIcon icon={faCamera} />
                            <FontAwesomeIcon icon={faSlash} />
                        </div>
                    </div>
                }
            </div>
            <div className="book-card--details">
                <Card.Title className="book-card--title">
                    {props.title}
                    {props.subtitle && <small><br/>{props.subtitle}</small>}
                </Card.Title>
                {props.authors && <Card.Subtitle className="book-card--authors text-muted">{props.authors.join(", ")}</Card.Subtitle>}
            
                <div className="book-card--publication">
                    {props.publisher} {year && `(${year})`}
                </div>
            </div>
        </Card.Body>
    </Card>
}

export default BookCard;