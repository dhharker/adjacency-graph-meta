import type { EdgeList } from "./";

import parseList, { type Item, ItemSequence } from "./parseList";

import { _test } from "./parseList";
const { _parseLine, _normaliseDepthToLevel } = _test;

export const isEdgeList = (el: any) => {
  expect(Array.isArray(el)).toBeTruthy();
  expect(typeof el.length).toBe("number");
  if (el.length === 0) return true;
  for (let i in el) {
    const mem = el[i];
    expect(Array.isArray(mem)).toBeTruthy();
    expect(mem.length).toBe(2);
    expect(typeof mem[0]).toBe("string");
    expect(typeof mem[1]).toBe("string");
    return true;
  }
};

const isItemSequence = ns => {
  if (!Array.isArray(ns)) {
    throw new Error("Must be an array");
  }
  if (!ns.length) return true;
  for (let i in ns) {
    const mem = ns[i];
    if (typeof mem !== "object") throw new Error("Children must be objects");
    if (typeof mem.depth === undefined) throw new Error("depth is required");
    if (typeof mem.level === undefined) throw new Error("level is required");
    if (typeof mem.label === undefined) throw new Error("label is required");
    return true;
  }
};

// even though these might look a bit funny, they are all valid!
const sampleLists = [
  `
  - a
  - b
  `,
  `
  - a
    - b
  `,
  `
    - a
  - b
  `,
  `
  - a
    - b
    - c
  `,
  `
  - a
    - b
  - c
    -d
  `,
  `
  - a
    - b
      - c
    - d
      - e
  - f
  `,
  `
  - a
  - a
  `
];

describe("parseList", () => {
  describe("_parseLine", () => {
    it("Returns a valid Item", () => {
      expect(_parseLine("   - Thing")).toMatchObject(
        expect.objectContaining({
          depth: expect.any(Number),
          label: expect.any(String)
        })
      );
    });
    it("Returns a correct Item", () => {
      expect(_parseLine("   - Thing")).toMatchObject(
        expect.objectContaining({
          depth: 3,
          label: "Thing"
        })
      );
    });
    it("Throws on invalid input", () => {
      expect(_parseLine("  ")).toEqual(null);
      expect(_parseLine("  - ")).toEqual(null);
      expect(_parseLine("  - -")).toEqual(null);
      expect(_parseLine("  --")).toEqual(null);
      expect(_parseLine("  Thing ")).toEqual(null);
      expect(_parseLine("Thing Boo")).toEqual(null);
      expect(_parseLine("  - Boo\n   - Thing")).toEqual(null);
    });
  });

  describe("_normaliseDepthToLevel", () => {
    it("Normalises depths", () => {
      expect(
        _normaliseDepthToLevel([
          { label: "one", depth: 5 },
          { label: "two", depth: 1 },
          { label: "three", depth: 100 }
        ])
      ).toEqual([
        { label: "one", level: 1 },
        { label: "two", level: 0 },
        { label: "three", level: 2 }
      ]);
    });
  });

  it("Returns a valid ItemSequence", () => {
    sampleLists.map(lis => {
      isItemSequence(parseList(lis));
    });
  });

  it("Returns a correct ItemSequence (by not being confused by initial leading space in text list)", () => {
    const seq = parseList(`


  - A
    - a1
    - a2
  - B


   - C



    `);
    expect(seq).toEqual([
      { label: "A", level: 0 },
      { label: "a1", level: 2 },
      { label: "a2", level: 2 },
      { label: "B", level: 0 },
      { label: "C", level: 1 }
    ]);
  });
});
