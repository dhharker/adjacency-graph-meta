// @flow

import React from "react";
import styled from "styled-components";

import ContainerDimensions from "react-container-dimensions";
import { ForceGraph2D } from "react-force-graph";

import type { Graph } from "./";

// @TODO something nicer w/aspect ratio, mobile detection
const Container = styled.div`
  width: 100%;
  height: 400px;
`;

type Props = {
  height: number,
  graph?: Graph
};

const defaultProps = {
  height: 400
};

export default class ForceLayout extends React.Component<Props, void> {
  static defaultProps: Props = defaultProps;

  render() {
    const { height, graph } = this.props;
    if (!graph || !Array.isArray(graph))
      throw new Error("Graph is required to graph.");
    const [nodes, edges] = graph;
    const data = {
      nodes,
      links: edges.map(([source, target]) => ({ source, target }))
    };

    return (
      <Container style={{ height: `${height}px` }}>
        <ContainerDimensions>
          {({ width, height }) => {
            return (
              <ForceGraph2D width={width} height={height} graphData={data} />
            );
          }}
        </ContainerDimensions>
      </Container>
    );
  }
}
