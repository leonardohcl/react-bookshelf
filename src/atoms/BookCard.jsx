import { faCamera, faSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookCard = props => {
    const navigate = useNavigate()

    const thumbnail = props.images ? props.images.smallThumbnail || props.images.small : "";
    const year = props.date && props.date.slice(0, 4)

    const handleClick = evt => {
        if (!props.disableNavigation) navigate(`books/${props.id}`)
    }

    const classes = [
        "book-card", 
        !props.disableNavigation && "book-card--clickable",
        props.vertical && "book-card--vertical"
    ].filter(x => x)

    return <Card className={classes.join(" ")} onClick={handleClick}>
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
            <Card.Title className="book-card--info book-card--title">
                {props.title}
                {props.subtitle && <small><br />{props.subtitle}</small>}
            </Card.Title>
            <div className="book-card--info book-card--authors">
                {props.authors && <Card.Subtitle className="book-card--authors text-muted">{props.authors.join(", ")}</Card.Subtitle>}
            </div>
            <div className="book-card--info book-card--publication">
                {props.publisher} {year && `(${year})`}
            </div>
        </Card.Body>
    </Card>
}

export default BookCard;