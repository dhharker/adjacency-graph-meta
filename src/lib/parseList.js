// @flow

import type { TextList, AdjacencyList } from "./";
import { compareNumbers } from "./helpers";

export type Node = {
  depth: number, // the number of spaces before the bullet
  label: string, // trimmed
  level?: number // normalised version of depth
};

export type ParserConfig = {
  groupByLabel: boolean
};
const defaultParserConfig = {
  // Where nodes with the same label appear > once, group them into one node
  groupByLabel: true
};

const lineBreaker = /^(\s*)(-|\*)\s*(\w.*)$/i;

const _parseLine = (line: string): ?Node => {
  const m = lineBreaker.exec(line);
  if (!m) throw new Error(`Unable to parse line: ${line}`);
  return {
    depth: m[1].length, // number of spaces before the bullet
    label: m[3].trim() // characters after the bullet without any padding spaces
  };
};

const _normaliseDepthToLevel = (nodes: Node[]): Node[] => {
  console.log(nodes);
  const uqDepths = nodes
    .reduce(
      (acc, { depth }) => (acc.includes(depth) ? acc : acc.push(depth) && acc),
      []
    )
    .sort(compareNumbers);

  return nodes.map(node => ({ ...node, level: uqDepths.indexOf(node.depth) }));
};

const parseList = (
  text: TextList,
  _config: ParserConfig = {}
): AdjacencyList => {
  // configurations
  const { groupByLabel } = { ...defaultParserConfig, ..._config };

  // split the list into lines, removing completely blank lines
  const lines = text
    .trim()
    .split("\n")
    .filter(chunk => chunk.trim().length);

  const nodes = _normaliseDepthToLevel(
    // turn number of spaces into list heirarchy level
    lines.map(_parseLine) // parse each line into a Node object { depth, label }
  );

  return [["a", "a"]];
};

export default parseList;

export const _test = { _parseLine, _normaliseDepthToLevel };
