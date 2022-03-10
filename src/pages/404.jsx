import { faFrownOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NotFound = () => {
    return <div
        className="fill-body-min-height d-flex justify-content-center align-items-center"
    >
        <div className="text-center text-muted p-2">
            <h1><FontAwesomeIcon icon={faFrownOpen} size="2x" /> Oops...</h1>
            <p>Looks like the page you are trying to reach does not exist</p>
        </div>
    </div>
}

export default NotFound;