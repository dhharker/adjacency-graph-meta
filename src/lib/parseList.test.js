// @flow

import parseList from "./parseList";

import type { AdjacencyList } from "./";

const isValidAdjacencyList = (iut: any) => {
  console.log(iut);
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

it("Returns a valid AdjacencyList", () => {
  sampleLists.map(lis => {
    isValidAdjacencyList(parseList(lis));
  });
});
