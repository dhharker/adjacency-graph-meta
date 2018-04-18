import { tail } from "./helpers";

describe("Helpers", () => {
  describe("tail", () => {
    it("selects the last element", () => {
      expect(tail([1])).toEqual(1);
      expect(tail([1, 2, 3])).toEqual(3);
    });
    it("throws empty/non array input", () => {
      expect(() => {
        tail();
      }).toThrow();
      expect(() => {
        tail(false);
      }).toThrow();
      expect(() => {
        tail([]);
      }).toThrow();
      expect(() => {
        tail({});
      }).toThrow();
    });
    it("throws on offset out of bounds", () => {
      expect(() => {
        tail([1], 1);
      }).toThrow();
      expect(() => {
        tail([1, 2, 3], 3);
      }).toThrow();
    });
    it("returns the last-minus-offset element", () => {
      expect(tail([1, 2, 3])).toEqual(3);
      expect(tail([1, 2, 3], 0)).toEqual(3);
      expect(tail([1, 2, 3], 1)).toEqual(2);
      expect(tail([1, 2, 3], 2)).toEqual(1);
    });
  });
});
