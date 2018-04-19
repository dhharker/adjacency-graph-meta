// @flow

import React from "react";
import styled from "styled-components";

import ContainerDimensions from "react-container-dimensions";
import { ForceGraph2D } from "react-force-graph";

import type { Graph } from "./";

// @TODO something nicer w/aspect ratio, mobile detection
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  max-height: 90%;
`;

type Props = {
  height: number | string,
  graph?: Graph
};

const defaultProps = {
  height: "100%"
};

let nodeDims = {};

const nodeCanvasObject = (node, ctx, scale) => {
  // console.log(node, canvasContext, scale);
  ctx.font = "10px Arial";
  ctx.textAlign = "center";
  const label = node.label;
  if (!nodeDims[node.id]) {
    const { width, height } = ctx.measureText(label);
    nodeDims[node.id] = { width, height };
  }
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
      <Container
        style={{ height: `${height}${typeof height === "number" ? "px" : ""}` }}
      >
        <ContainerDimensions>
          {({ width, height }) => {
            return (
              <ForceGraph2D
                width={width}
                nodeVal={node => 5 - node.level}
                height={height}
                graphData={data}
                nodeLabel="label"
                nodeAutoColorBy="level"
                d3AlphaDecay={0.01}
                d3VelocityDecay={0.2}
                // d3Force="forceCentre"
                nodeCanvasObject={nodeCanvasObject}
              />
            );
          }}
        </ContainerDimensions>
      </Container>
    );
  }
}
