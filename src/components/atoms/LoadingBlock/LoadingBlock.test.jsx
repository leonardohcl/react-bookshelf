import { render, screen } from "@testing-library/react";
import LoadingBlock from "./LoadingBlock";

test("render correctly", () => {
    const {container} = render(<LoadingBlock />)
    expect(container.getElementsByClassName("loading-block")).not.toBe(null)
})