import { render } from "@testing-library/react"
import list from "../../../mocks/book-list.json"
import BookList from "./BookList"

test("render correctly", () => {
    const { container } = render(
        <BookList
            books={list.items}
            total={list.items.length}
            pageSize={12}
            page={1}
            disableNavigation
        />
    )

    expect(container.getElementsByClassName("book-list")).toHaveLength(1)
    expect(container.getElementsByClassName("book-card")).toHaveLength(12)
})