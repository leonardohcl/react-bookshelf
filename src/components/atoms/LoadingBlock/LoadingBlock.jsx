import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LoadingBlock = () => {
    return <div className="loading-block text-center">
        <FontAwesomeIcon icon={faSpinner} pulse />
    </div>
}

export default LoadingBlock;