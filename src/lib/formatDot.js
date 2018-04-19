// @flow

import type { Graph } from "./";

const formatDot = (graph: Graph): string => {
  if (!Array.isArray(graph) || graph.length !== 2)
    throw new Error("Graph must be a tuple [nodes, edges]");
  const [nodes, edges] = graph;
  if (!Array.isArray(nodes)) throw new Error("Nodes must be an array");
  if (!Array.isArray(edges)) throw new Error("Edges must be an array");

  throw new Error("Not implemented");
};

export default formatDot;
