// @flow

import type { TextList, RawItem, RawItemSequence, ItemSequence } from "./";
import { compareNumbers } from "./helpers";

const lineBreaker = /^(\s*)(-|\*)\s*(\w.*)$/i;

const _parseLine = (line: string): ?RawItem => {
  const m = lineBreaker.exec(line);
  return !m
    ? null
    : {
        depth: m[1].length, // number of spaces before the bullet
        label: m[3].trim() // characters after the bullet without any padding spaces
      };
};

const _normaliseDepthToLevel = (nodes: RawItemSequence): ItemSequence => {
  const uqDepths = nodes
    .reduce(
      (acc, { depth }) => (acc.includes(depth) ? acc : [...acc, depth]),
      []
    )
    .sort(compareNumbers);
  return nodes.map(node => ({
    label: node.label,
    level: uqDepths.indexOf(node.depth)
  }));
};

const parseList = (text: TextList): ItemSequence => {
  // split the list into lines, removing completely blank lines
  const lines = text.split("\n").filter(chunk => chunk.trim().length);

  // parse each line into a Item object { depth, label }
  const rawItems: RawItemSequence = lines.map(_parseLine).filter(a => a);

  // @todo get some pipeline operator
  // turn number of spaces into list heirarchy level
  return _normaliseDepthToLevel(rawItems);
};

export default parseList;

export const _test = { _parseLine, _normaliseDepthToLevel };
