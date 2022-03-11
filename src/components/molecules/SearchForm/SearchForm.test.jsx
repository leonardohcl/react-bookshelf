import { render, screen } from "@testing-library/react"
import SearchForm from "./SearchForm"

test("render correctly", () => {
    render(<SearchForm/>)
    const element = screen.getByPlaceholderText("Type here your search")
    expect(element).toBeInTheDocument()
})