export const emptyBookList = {
    books: [],
    total: 0,
    query: "",
    page: 1,
    pageSize: 12
}

export const bookListReducer = (state, action) => {
    switch (action.type) {
        case "pageChange":
            return {
                ...state, page: action.value
            };
        case "queryChange":
            return {
                ...state, query: action.value, page: 1
            };
        case "loadItems":
            return {
                ...state, books: action.books, total: action.total
            };
        default:
            return {
                ...emptyBookList
            };
    }
}