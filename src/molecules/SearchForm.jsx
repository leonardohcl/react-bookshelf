import { Form } from "react-bootstrap";

const SearchForm = (props) => {
    return <Form className="mb-3" onSubmit={props.onSubmit}>
        <Form.Group>
            <Form.Control
                type="text"
                value={props.query}
                onChange={props.onChange}
                placeholder="Enter a few words to start browsing" />
        </Form.Group>
    </Form>
}

export default SearchForm;