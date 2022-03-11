import { Pagination } from "react-bootstrap";

const AutoPagination = props => {

    const pageCount = Math.ceil(props.total / props.pageSize) || 1

    const pageNumbers = [];
    for (let i = props.currentPage - 2; i <= props.currentPage + 2; i++) {
        pageNumbers.push(i)
    }

    const pages = pageNumbers.filter(x => x > 0 && x <= pageCount).map(x => {
        return <Pagination.Item key={x} active={x === props.currentPage} onClick={props.onChange}>{x}</Pagination.Item>
    })

    const prev = []
    if (props.currentPage > 3) {
        prev.push(<Pagination.First key="firstPage" onClick={props.onChange}/>)
    }
    if (props.currentPage > 1) {
        prev.push(<Pagination.Prev key="prevPage" onClick={props.onChange}/>)
    }

    const next = []
    if (props.currentPage < pageCount) {
        next.push(<Pagination.Next key="nextPage" onClick={props.onChange}/>)
    }


    return <Pagination>
        {prev}
        {pages}
        {next}
    </Pagination>
}

export default AutoPagination;