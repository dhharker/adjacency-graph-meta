// @flow

import React from "react";
import styled from "styled-components";

import { parseList, createGraph, addRootNode, ForceLayout } from "../lib";
import type { TextList, ItemSequence, NodeSequence, EdgeList } from "../lib";

import defaultListText from "./demoData";

type State = {
  textList: TextList,
  itemSequence: ItemSequence,
  graph?: [NodeSequence, EdgeList]
};

const DemoWrapper = styled.div`
  max-width: 40em;
  margin: 1em auto;
  padding: 1em
  background-color: #ffcc99;
  color: #14100c;
`;
const ScrollList = styled.ul`
  max-height: 6em;
  overflow-y: scroll;
`;

class App extends React.Component<void, State> {
  constructor() {
    super();
    this.state = this.calcState(defaultListText);
  }

  onTextChange = (text: string): void => {
    this.setState(this.calcState(text));
  };

  calcState = (text: string): State => {
    const parsed = parseList(text);
    const graph = createGraph(parsed);
    const st = {
      textList: text,
      itemSequence: parsed,
      graph: addRootNode(graph)
    };
    return st;
  };

  render() {
    const { textList, itemSequence, graph } = this.state;
    console.log("ren", graph);
    return (
      <DemoWrapper>
        <span>1. Markdown style nested list</span>
        <textarea
          rows={7}
          style={{ width: "100%" }}
          value={textList}
          onChange={ev => {
            this.setState({ textList: ev.target.value });
            this.onTextChange(ev.target.value);
          }}
        />
        <span>2. List of items with normalised depth</span>
        <ScrollList>
          {itemSequence.map(({ label, level }, i) => (
            <li key={i}>
              @{level}: {label}
            </li>
          ))}
        </ScrollList>
        <span>3. List of nodes and edges</span>
        <ScrollList>
          {graph &&
            graph[0] &&
            graph[0].map(({ id, label, level, weight }) => (
              <li key={id}>
                @{level} {id}: {label} = {weight}
              </li>
            ))}
        </ScrollList>
        <ScrollList>
          {graph &&
            graph[1] &&
            graph[1].map(([left, right], i) => (
              <li key={i}>
                {left} -> {right}
              </li>
            ))}
        </ScrollList>
        <span>4. Force layout</span>
        {graph && <ForceLayout graph={graph} />}
      </DemoWrapper>
    );
  }
}

export default App;
