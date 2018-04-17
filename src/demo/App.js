// @flow

import React from "react";
import { parseList } from "../lib";
import type { TextList, AdjacencyList } from "../lib";

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
  adjacencyList: AdjacencyList
};

class App extends React.Component<void, State> {
  constructor() {
    super();
    this.state = {
      textList: defaultListText,
      adjacencyList: []
    };
  }

  onTextChange = (text: string): void => {
    this.setState({ adjacencyList: parseList(text) });
  };

  render() {
    const { textList, adjacencyList } = this.state;

    return (
      <div id="app">
        <textarea
          rows={25}
          cols={80}
          value={textList}
          onChange={ev => {
            this.setState({ textList: ev.target.value });
            this.onTextChange(ev.target.value);
          }}
        />
        <ul id="adjacencyList">
          {adjacencyList.map(([left, right]) => (
            <li>
              {left} -> {right}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
