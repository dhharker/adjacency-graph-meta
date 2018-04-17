// @flow

import parseList from "./parseList";

// // to/from parseList.js: // //
// raw markdown-style nested list
export type TextList = string;
// parse the lines in the TextList into Items
export type Item = {
  depth: number, // the number of spaces before the bullet
  label: string, // trimmed
  level?: number // normalised version of depth
};
// ...in a Sequence
export type ItemSequence = Item[];

// // to/from createGraph.js: // //
export type Edge = Array<string, string>;
export type EdgeList = Array<Edge>;
export type Node = {
  label: Item.label,
  level: Item.level
};

// export type ParserConfig = {
//   groupByLabel: boolean
// };
// const defaultParserConfig = {
//   // Where nodes with the same label appear > once, group them into one node
//   groupByLabel: true
// };

export { parseList };
