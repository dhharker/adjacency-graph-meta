// @flow

import type { ItemSequence, Graph } from "./";

const _sluggify = (str: string, index: number) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "-")
    .replace(/(^-*|-*$)/g, "")
    .replace(/-{2,}/g, "-") || `node_${index}`;

const createGraph = (seq: ItemSequence): Graph => {
  if (!seq || !Array.isArray(seq))
    throw new Error("Must provide an ItemSequence to createGraph");
  const nodeList = seq.map(({ level, label }, itemIndex) => ({
    id: _sluggify(label, itemIndex),
    level,
    label,
    weight: 0
  }));

  const edgeList = [];
  return [nodeList, edgeList];
};

export default createGraph;

export const _test = { _sluggify };
