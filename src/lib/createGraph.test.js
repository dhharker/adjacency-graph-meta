import { isEdgeList } from "./parseList.test.js";

import createGraph from "./createGraph";
import { _test } from "./createGraph";

const { _sluggify } = _test;

const isNodeList = (nl): boolean => {
  if (!Array.isArray(nl)) throw "NodeList must be an array";
  if (nl.length === 0) return true;
  for (let i in nl) {
    const mem = nl[i];
    if (typeof mem !== "object") throw "Members must be objects";
    if (typeof mem.id === "undefined") throw "id is required";
    if (typeof mem.level === "undefined") throw "level is required";
    if (typeof mem.label === "undefined") throw "label is required";
    if (typeof mem.weight === "undefined") throw "weight is required";
  }
};

const isGraph = (gr): boolean => {
  if (!Array.isArray(gr)) throw "Graph must be an array";
  if (gr.length !== 2) throw "Graph be tuple";
  if (!isNodeList(gr[0])) throw "Graph[0] must be a NodeList";
  if (!isEdgeList(gr[1])) throw "Graph[1] must be a EdgeList";
  return true;
};

describe("createGraph", () => {
  describe("_sluggify", () => {
    it("slugs", () => {
      expect(_sluggify(" Hello World ", 0)).toMatch("hello-world");
      expect(_sluggify("!£$%^&*(){}[];'", 100)).toMatch("node_100");
      expect(_sluggify("!£$%^hello&12345*(){world}[];'")).toMatch(
        "hello-12345-world"
      );
    });
  });
  it("Throws", () => {
    expect(() => createGraph()).toThrow();
    expect(() => createGraph("potato")).toThrow();
    expect(() => createGraph({ potato: "tomato" })).toThrow();
    expect(() => createGraph(false)).toThrow();
  });
  it("Returns a valid empty graph", () => {
    expect(isGraph(createGraph([]))).toBeTruthy();
  });
  // it("Returns a valid empty graph", () => {
  //   expect(isGraph(createGraph([

  //   ]))).toBeTruthy();
  // });
});
