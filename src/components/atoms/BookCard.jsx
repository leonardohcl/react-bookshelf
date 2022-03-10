import { faCamera, faHeart, faSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../providers/favorites";

const BookCard = props => {
    const thumbnail = props.images ? props.images.smallThumbnail || props.images.thumbnail : "";
    const year = props.date && props.date.slice(0, 4)

    const favorites = useContext(FavoritesContext)

    const isFavorite = favorites.isFavorite(props.id);

    const handleToogleFavorite = evt => {
        if (isFavorite) favorites.remove(props.id)
        else favorites.add({
            id: props.id,
            images: props.images,
            title: props.title,
            subtitle: props.subtitle,
            authors: props.authors,
            publisher: props.publisher,
            date: year
        })
    }

    const classes = [
        "book-card",
        !props.disableNavigation && "book-card--clickable",
        props.vertical && "book-card--vertical"
    ].filter(x => x)

    return <Card className={classes.join(" ")} >
        <Card.Body className="book-card--body" as={props.disableNavigation ? "div" : Link} to={`books/${props.id}`}>
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
        <Card.Footer className="book-card--footer">
            <Button
                variant="link"
                onClick={handleToogleFavorite}>
                <FontAwesomeIcon icon={faHeart} className={isFavorite ? "text-danger" : "text-muted"} />
            </Button>
        </Card.Footer>
    </Card>
}

export default BookCard;