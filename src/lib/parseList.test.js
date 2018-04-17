// @flow

import type { EdgeList } from "./";

import parseList, { type Item, ItemSequence } from "./parseList";

import { _test } from "./parseList";
const { _parseLine, _normaliseDepthToLevel } = _test;

const isValidEdgeList = (iut: any) => {
  if (!Array.isArray(iut)) {
    throw new Error("Must be an array");
  }
  if (!iut.length) return true;
  for (let i in iut) {
    const mem = iut[i];
    if (!Array.isArray(mem)) throw new Error("Children must be arrays");
    if (mem.length !== 2) throw new Error("Must have 2 children");
    if (typeof mem[0] !== "string")
      throw new Error("child[0] must be a string");
    if (typeof mem[1] !== "string")
      throw new Error("child[0] must be a string");
    return true;
  }
};

const isValidItemSequence = ns => {
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
      expect(() => _parseLine("  ")).toThrow();
      expect(() => _parseLine("  - ")).toThrow();
      expect(() => _parseLine("  - -")).toThrow();
      expect(() => _parseLine("  --")).toThrow();
      expect(() => _parseLine("  Thing ")).toThrow();
      expect(() => _parseLine("Thing Boo")).toThrow();
      expect(() => _parseLine("  - Boo\n   - Thing")).toThrow();
    });
  });

  describe("_normaliseDepthToLevel", () => {
    it("Normalises depths", () => {
      expect(
        _normaliseDepthToLevel([{ depth: 5 }, { depth: 1 }, { depth: 100 }])
      ).toEqual([
        { depth: 5, level: 1 },
        { depth: 1, level: 0 },
        { depth: 100, level: 2 }
      ]);
    });
  });
  it("Returns a valid ItemSequence", () => {
    sampleLists.map(lis => {
      isValidItemSequence(parseList(lis));
    });
  });
});
