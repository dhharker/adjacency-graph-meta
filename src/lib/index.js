// @flow

import parseList from "./parseList";
import createGraph, { addRootNode } from "./createGraph";
import ForceLayout from "./ForceLayout";

// // to/from parseList.js: // //
// raw markdown-style nested list
export type TextList = string;
// parse the lines in the TextList into Items
export type RawItem = {
  depth: number, // the number of spaces before the bullet
  label: string // trimmed
};
export type Item = {
  level: number, // normalised version of depth
  label: string
};

// ...in a Sequence
export type RawItemSequence = RawItem[];
export type ItemSequence = Item[];

// // to/from createGraph.js: // //
export type NodeId = string;
export type Node = {
  id: NodeId,
  label: string,
  level: number,
  weight: number
};
export type NodeSequence = Array<Node>;

export type Edge = [NodeId, NodeId];
export type EdgeList = Array<Edge>;

export type Graph = [NodeSequence, EdgeList];

// export type ParserConfig = {
//   groupByLabel: boolean
// };
// const defaultParserConfig = {
//   // Where nodes with the same label appear > once, group them into one node
//   groupByLabel: true
// };

export { parseList, createGraph, addRootNode, ForceLayout };
