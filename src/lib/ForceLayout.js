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

const nodeCanvasObject = (node, ctx, scale) => {
  // console.log(node, canvasContext, scale);
  ctx.font = "10px Arial";
  ctx.textAlign = "center";
  const label = node.label;

  const { width, height } = ctx.measureText(label);
  node = { ...node, width, height };
  ctx.fillText(label, node.x, node.y);
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
              <ForceGraph2D
                width={width}
                height={height}
                graphData={data}
                nodeLabel="label"
                nodeAutoColorBy="level"
                d3AlphaDecay={0.01}
                d3VelocityDecay={0.2}
                d3Force="forceCentre"
                nodeCanvasObject={nodeCanvasObject}
              />
            );
          }}
        </ContainerDimensions>
      </Container>
    );
  }
}
