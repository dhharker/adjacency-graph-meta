// @flow

import type { TextList, AdjacencyList } from "./";

type Node = {
  depth: number,
  label: string
};

const lineBreaker = /^(\s*)(-|\*)\s*(.*)$/;

const _parseLine = (line: string): ?Node => {
  const m = lineBreaker.exec(line);
  if (!m) throw new Error(`Unable to parse line: ${line}`);
};

const parseList = (text: TextList): AdjacencyList => {
  const lines = text.trim().split("\n");
  const nodes = lines.map(_parseLine);

  return [["a", "a"]];
};

export default parseList;
