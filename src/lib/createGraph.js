// @flow

import type { ItemSequence, Graph, NodeSequence, EdgeList } from "./";
import { tail } from "./helpers";

const _sluggify = (str: string, index: number) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "-")
    .replace(/(^-*|-*$)/g, "")
    .replace(/-{2,}/g, "-") || `node_${index}`;

const _createNodeSequence = (seq: ItemSequence): NodeSequence => {
  return seq.map(({ level, label }, itemIndex) => ({
    id: _sluggify(label, itemIndex),
    level,
    label,
    weight: 0
  }));
};

const _createEdgeList = (nodeSeq: NodeSequence): EdgeList => {
  if (!nodeSeq || !Array.isArray(nodeSeq))
    throw new Error("nodeSeq must be an array");
  if (!nodeSeq.length) return [];

  let ancestry = [];
  return nodeSeq.reduce((edgeList, node, idx) => {
    while (ancestry.length && tail(ancestry).level >= node.level) {
      ancestry.pop();
    }
    ancestry.push(node);
    if (ancestry.length >= 2) {
      edgeList.push([tail(ancestry, 1).id, tail(ancestry).id]);
    }
    return edgeList;
  }, []);
};

const createGraph = (seq: ItemSequence): Graph => {
  if (!seq || !Array.isArray(seq))
    throw new Error("Must provide an ItemSequence to createGraph");
  const nodeSeq = _createNodeSequence(seq);

  return [nodeSeq, _createEdgeList(nodeSeq)];
};

const addRootNode = (graph: Graph): Graph => {
  const [nodes, edges] = graph;
  return [
    [
      ...nodes,
      {
        id: "root",
        label: "Root",
        level: -1,
        weight: 0
      }
    ],
    edges.concat(
      nodes.reduce((rootLinks, node) => {
        if (node.level === 0) {
          rootLinks.push(["root", node.id]);
        }
        return rootLinks;
      }, [])
    )
  ];
};

export default createGraph;
export { addRootNode };

export const _test = { _sluggify, _createNodeSequence, _createEdgeList };
