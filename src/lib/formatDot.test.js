import formatDot from "./formatDot";

describe("formatDot", () => {
  it("throws", () => {
    expect(() => {
      formatDot();
    }).toThrow();
  });
});
