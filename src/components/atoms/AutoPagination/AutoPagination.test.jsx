import { text } from '@fortawesome/fontawesome-svg-core';
import { fireEvent, render, screen } from '@testing-library/react';
import AutoPagination from "./AutoPagination"

test("render correctly", () => {
  render(<AutoPagination currentPage={1} />)
  const component = screen.getByText("1", { exact: false });
  expect(component).toBeInTheDocument()
})

test("render correct number of items", () => {

  const cases = [
    { currentPage: 1, total: 1, pageSize: 1, expected: 1 },
    { currentPage: 1, total: 2, pageSize: 1, expected: 3 },
    { currentPage: 2, total: 4, pageSize: 1, expected: 6 },
    { currentPage: 4, total: 4, pageSize: 1, expected: 5 },
  ]

  const { rerender } = render(<AutoPagination currentPage={1} />)
  for (let i = 0; i < cases.length; i++) {
    rerender(<AutoPagination
      currentPage={cases[i].currentPage}
      pageSize={cases[i].pageSize}
      total={cases[i].total}
    />)

    const buttons = screen.getAllByText(/[0-9]+|Next|Previous|Last|First/)
    expect(buttons).toHaveLength(cases[i].expected)
  }

})

test("render correct page as current", () => {
  const {container} = render(<AutoPagination currentPage={3} pageSize={1} total={9} />)
  const component = screen.getByText("3");
  expect(component).toHaveTextContent("(current)")
})