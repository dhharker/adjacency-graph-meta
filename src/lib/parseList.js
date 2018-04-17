// @flow

import type { TextList, Item, ItemSequence } from "./";
import { compareNumbers } from "./helpers";

const lineBreaker = /^(\s*)(-|\*)\s*(\w.*)$/i;

const _parseLine = (line: string): ?Item => {
  const m = lineBreaker.exec(line);
  if (!m) throw new Error(`Unable to parse line: ${line}`);
  return {
    depth: m[1].length, // number of spaces before the bullet
    label: m[3].trim() // characters after the bullet without any padding spaces
  };
};

const _normaliseDepthToLevel = (nodes: ItemSequence): ItemSequence => {
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
): ItemSequence => {
  // split the list into lines, removing completely blank lines
  const lines = text
    .trim()
    .split("\n")
    .filter(chunk => chunk.trim().length);

  // @todo get some pipeline operator
  // turn number of spaces into list heirarchy level
  return _normaliseDepthToLevel(
    lines.map(_parseLine) // parse each line into a Item object { depth, label }
  );
};

export default parseList;

export const _test = { _parseLine, _normaliseDepthToLevel };
