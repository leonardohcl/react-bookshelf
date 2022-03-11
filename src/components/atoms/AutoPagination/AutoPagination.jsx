import { Pagination } from "react-bootstrap";

const AutoPagination = props => {

    const handlePageChange = evt => {
        const nextPageText = evt.target.innerText;
        let nextPage;
        if (isNaN(nextPageText)) {
            if (nextPageText.indexOf("›") >= 0) {
                nextPage = props.currentPage + 1;
            }
            else if (nextPageText.indexOf("‹") >= 0) {
                nextPage = props.currentPage - 1;
            }
            else {
                nextPage = 1;
            }
        } else {
            nextPage = nextPageText;
        }

        props.onChange(nextPage)
    }

    const pageCount = Math.ceil(props.total / props.pageSize) || 1

    const pageNumbers = [];
    for (let i = props.currentPage - 2; i <= props.currentPage + 2; i++) {
        pageNumbers.push(i)
    }

    const pages = pageNumbers.filter(x => x > 0 && x <= pageCount).map(x => {
        return <Pagination.Item key={x} active={x === props.currentPage} onClick={handlePageChange}>{x}</Pagination.Item>
    })

    const prev = []
    if (props.currentPage > 1) {
        prev.push(<Pagination.Prev key="prevPage" onClick={handlePageChange}/>)
    }

    const next = []
    if (props.currentPage < pageCount) {
        next.push(<Pagination.Next key="nextPage" onClick={handlePageChange}/>)
    }


    return <Pagination>
        {prev}
        {pages}
        {next}
    </Pagination>
}

export default AutoPagination;