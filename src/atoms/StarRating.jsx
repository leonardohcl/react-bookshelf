import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StarRating = props => {
    const stars = new Array(props.max || 5).fill(<FontAwesomeIcon icon={faStar} className="text-warning" />)
    const percent = 100 * (props.rating || 0) / stars.length

    return <div className="star-rating">
        <div className="star-rating--container">
            <div className="star-rating--average me-1" >{props.rating || "??"}</div>
            {props.count && <div className="star-rating--stars" style={{ 'width': `${percent}%`, 'margin-right': `-${percent}%` }}>
                {stars}
            </div>}
            {props.count && <div className="star-rating--count">({props.count} ratings)</div>}
        </div>
    </div>
}

export default StarRating