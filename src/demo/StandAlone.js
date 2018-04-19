// @flow

import React from "react";

import markdownToGraph, { ForceLayout } from "../lib";

import demoData from "./demoData";

export default class StandAlone extends React.Component<void, void> {
  render() {
    return <ForceLayout graph={markdownToGraph(demoData)} />;
  }
}
