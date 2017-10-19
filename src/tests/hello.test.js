import { hello } from "module";

test("Check text equal to Hello dima", () => {
    expect(hello().innerHTML).toBe("Hello dima")
})