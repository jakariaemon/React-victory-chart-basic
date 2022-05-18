import React from "react";
import PropTypes from "prop-types";
import { merge, random, range } from "lodash";
import { VictoryChart } from "victory-chart";
import { VictoryLine } from "victory-line";
import { VictoryContainer, VictoryTheme } from "victory-core";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData(),
      transitionData: this.getTransitionData(),
      arrayData: this.getArrayData(),
      style: {
        stroke: "blue",
        strokeWidth: 2
      }
    };
    this.points = 10;
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        transitionData: this.getTransitionData(),
        style: this.getStyles()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getTransitionData() {
    this.points += 1;
    return range(this.points).map((line) => {
      return { x: line, y: random(2, 10) };
    });
  }

  getData() {
    return range(100).map((i) => {
      return {
        x: i,
        y: Math.random()
      };
    });
  }
  getArrayData() {
    return range(40).map((i) => [i, i + Math.random() * 3]);
  }

  getStyles() {
    const colors = ["red", "orange", "cyan", "green", "blue", "purple"];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5)
    };
  }

  render() {
    const parentStyle = {
      border: "1px solid #ccc",
      margin: "2%",
      maxWidth: "40%"
    };
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo" style={containerStyle}>
        <VictoryLine
          style={{ parent: parentStyle, data: { stroke: "blue" } }}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          sample={25}
        />

        <VictoryChart
          style={{ parent: parentStyle }}
          theme={VictoryTheme.material}
        >
          <VictoryLine
            style={{ parent: parentStyle, data: this.state.style }}
            data={this.state.transitionData}
            animate={{ duration: 1000 }}
            interpolation="natural"
          />
        </VictoryChart>
      </div>
    );
  }
}
