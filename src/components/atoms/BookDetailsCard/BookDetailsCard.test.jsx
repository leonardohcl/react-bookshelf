import { render, screen } from "@testing-library/react"
import BookDetailsCard from "./BookDetailsCard"

test("render correctly", () => {
    const { container } = render(<BookDetailsCard categories={["cat1", "cat2", "cat3"]} description="sample description here" />)
    expect(container.getElementsByClassName("book-details-card")).toHaveLength(1)
    expect(container.getElementsByClassName("book-details-card--category")).toHaveLength(3)
    const element = screen.getByText("sample description here")
    expect(element).toBeInTheDocument()
})

test("parses html description", () => {
    render(<BookDetailsCard description="<p data-testid='htmlText'>I'm an html description</p>" />)
    const element = screen.getByTestId("htmlText")
    expect(element).toBeInTheDocument()
})