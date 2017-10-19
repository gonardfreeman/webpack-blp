import hello from "module";

test("hello(1,2) equal to 3", () => {
    expect(hello(1,2)).toBe(3)
})