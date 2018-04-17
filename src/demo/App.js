// @flow

import React from "react";
import styled from "styled-components";

import { parseList, createGraph } from "../lib";
import type { TextList, ItemSequence, Graph, NodeList, EdgeList } from "../lib";

const defaultListText = `
  - Javascript​:
    - ES6
    - node
    - Flow
    - React
    - Express
    - MobX
    - Redux
    - yarn
    - npm
    - lerna
    - Webpack
    - rollup
    - Jest
    - mocha
    - chai
    - webdriver
    - selenium
    - phantomJs
  - Apps​:
    - Web application & architecture security
    - REST & realtime API design
    - Accessibility
    - Web sockets
    - Latest browser APIs
    - Usability
    - UI design and build
    - Mobile first/responsive
    - A/B Testing
    - Micro-UIs
  - Ops​:
    - Ansible
    - Docker
    - Consul
    - AWS (EC2 and S3)
    - Networks
    - haproxy
    - Apache
    - Lighttpd
    - Chaos engineering
  - APIs:
    - I have implemented OAuth1/2
  - Databases​:
    - SQL
      - PostgreSQL
      - MySQL
      - SQLite
      - Oracle
      - monetdb
    - NoSQL
      - MongoDB
      - Redis
      - InfluxDB
    - Schema design, migrations, ORMs, ODMs, query optimisation etc.
  - General/Other​:
    - git
    - svn
    - TDD
    - Agile
      - Scrum
      - Kanban
      - SAFe
    - Information architecture
    - Hardware
    - General Linux admin.
    - Microservices architecture design and implementation.
`;

type State = {
  textList: TextList,
  itemSequence: ItemSequence,
  graph?: {
    nodes: NodeList,
    edges: EdgeList
  }
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
    this.state = {
      textList: defaultListText,
      itemSequence: parseList(defaultListText)
    };
  }

  onTextChange = (text: string): void => {
    const parsed = parseList(text);
    this.setState({ itemSequence: parsed });
  };

  onItemsChange = (items: ItemSequence): void => {
    const [nodes, edges] = createGraph(items);
    this.setState({ graph: { nodes, edges } });
  };

  render() {
    const { textList, itemSequence } = this.state;

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
          {/*itemSequence.map(([left, right]) => (
            <li>
              {left} -> {right}
            </li>
          ))*/}
        </ScrollList>
      </DemoWrapper>
    );
  }
}

export default App;
