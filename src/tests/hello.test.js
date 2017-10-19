import hello from "../createHello";

test("Check text equal to Hello dima", () => {
  const forTest = hello();
  const text = forTest.innerHTML;
  expect(text).toBe("Hello dima");
});
