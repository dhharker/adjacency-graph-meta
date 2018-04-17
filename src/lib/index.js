// @flow

import parseList from "./parseList";

// raw markdown-style nested list
export type TextList = string;

export type Item = {
  depth: number, // the number of spaces before the bullet
  label: string, // trimmed
  level?: number // normalised version of depth
};
export type ItemSequence = Item[];

export type Edge = Array<string, string>;
export type EdgeList = Array<Edge>;

// export type ParserConfig = {
//   groupByLabel: boolean
// };
// const defaultParserConfig = {
//   // Where nodes with the same label appear > once, group them into one node
//   groupByLabel: true
// };

export { parseList };
