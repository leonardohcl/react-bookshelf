import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const SearchForm = (props) => {
    const [query, setQuery] = useState('');

    const handleQueryChange = evt => setQuery(evt.target.value)

    const handleFormSubmit = evt => {
        evt.preventDefault();
        props.onSubmit(query)
    }

    return <Form className="mb-3" onSubmit={handleFormSubmit}>
        <InputGroup>
            <Form.Control
                type="search"
                value={query}
                onChange={handleQueryChange}
                placeholder="Type here your search"
                disabled={props.disabled} />
            <Button type="submit" disabled={props.disabled}><FontAwesomeIcon icon={faSearch} /> Search</Button>
        </InputGroup>
    </Form>
}

export default SearchForm;