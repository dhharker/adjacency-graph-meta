import { isEdgeList } from "./parseList.test.js";

import createGraph from "./createGraph";
import { _test } from "./createGraph";

const { _sluggify, _createNodeSequence, _createEdgeList } = _test;

const isNodeSequence = (nl): boolean => {
  if (!Array.isArray(nl)) throw "NodeSequence must be an array";
  if (nl.length === 0) return true;
  for (let i in nl) {
    const mem = nl[i];
    expect(typeof mem).toBe("object");
    expect(typeof mem.id).toBe("string");
    expect(typeof mem.label).toBe("string");
    expect(typeof mem.level).toBe("number");
    expect(typeof mem.weight).toBe("number");
  }
};

const isGraph = (gr): boolean => {
  if (!Array.isArray(gr)) throw "Graph must be an array";
  if (gr.length !== 2) throw "Graph be tuple";
  if (!isNodeSequence(gr[0])) throw "Graph[0] must be a NodeSequence";
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
  describe("_createNodeSequence", () => {
    it("works", () => {
      expect(
        _createNodeSequence([
          { label: " My First Node $1 ", level: 0 },
          { label: " My Second Node $2 ", level: 1 }
        ])
      ).toEqual([
        {
          label: " My First Node $1 ",
          level: 0,
          weight: 0,
          id: "my-first-node-1"
        },
        {
          label: " My Second Node $2 ",
          level: 1,
          weight: 0,
          id: "my-second-node-2"
        }
      ]);
    });
  });
  describe("_createEdgeList", () => {
    it("produces a valid edge list on empty input", () => {
      expect(isEdgeList(_createEdgeList([]))).toBeTruthy();
    });
    it("throws", () => {
      expect(() => {
        isEdgeList(_createEdgeList(false));
      }).toThrow();
      expect(() => {
        isEdgeList(_createEdgeList(""));
      }).toThrow();
      expect(() => {
        isEdgeList(_createEdgeList("potato"));
      }).toThrow();
      expect(
        _createEdgeList([
          {
            label: " My First Node $1 ",
            level: 0,
            weight: 0,
            id: "my-first-node-1"
          },
          {
            label: " My Second Node $2 ",
            level: 1,
            weight: 0,
            id: "my-second-node-2"
          },
          {
            label: " My Third Node $3 ",
            level: 1,
            weight: 0,
            id: "my-third-node-3"
          },
          {
            label: " My Fourth Node $4 ",
            level: 0,
            weight: 0,
            id: "my-fourth-node-4"
          },
          {
            label: " My Fifth Node $5 ",
            level: 1,
            weight: 0,
            id: "my-fifth-node-5"
          },
          {
            label: " My Sixth Node $6 ",
            level: 2,
            weight: 0,
            id: "my-sixth-node-6"
          }
        ])
      ).toEqual([
        ["my-first-node-1", "my-second-node-2"],
        ["my-first-node-1", "my-third-node-3"],
        ["my-fourth-node-4", "my-fifth-node-5"],
        ["my-fifth-node-5", "my-sixth-node-6"]
      ]);
    });
    it("returns expected EdgeList for a given NodeSequence", () => {
      expect(_createEdgeList([]));
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
