import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import React, { Component } from "react";
import LiquidFillGauge from "react-liquid-gauge";

export default class LiquidGauge extends Component {
  state = {
    value: this.props.emotion
  };
  startColor = "#6495ed"; // cornflowerblue
  endColor = "#dc143c"; // crimson

  render() {
    // console.log("Emotion inside component: ", this.state.value);
    // const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // let sum = Object.values(this.state.value).reduce(reducer);
    // console.log("This is sum inside component: ", sum);

    const radius = 50;
    const interpolate = interpolateRgb(this.startColor, this.endColor);
    const fillColor = interpolate(this.state.value / 100);
    const gradientStops = [
      {
        key: "0%",
        stopColor: color(fillColor)
          .darker(0.5)
          .toString(),
        stopOpacity: 1,
        offset: "0%"
      },
      {
        key: "50%",
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: "50%"
      },
      {
        key: "100%",
        stopColor: color(fillColor)
          .brighter(0.5)
          .toString(),
        stopOpacity: 0.5,
        offset: "100%"
      }
    ];

    return (
      <div>
        <LiquidFillGauge
          style={{ margin: "0 auto" }}
          width={radius * 2}
          height={radius * 2}
          value={this.state.value}
          percent="%"
          textSize={1}
          textOffsetX={0}
          textOffsetY={0}
          textRenderer={props => {
            const value = Math.round(props.value);
            const radius = Math.min(props.height / 2, props.width / 2);
            const textPixels = (props.textSize * radius) / 2;
            const valueStyle = {
              fontSize: textPixels
            };
            const percentStyle = {
              fontSize: textPixels * 0.6
            };

            return (
              <tspan>
                <tspan className="value" style={valueStyle}>
                  {value}
                </tspan>
                <tspan style={percentStyle}>{props.percent}</tspan>
              </tspan>
            );
          }}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={1}
          gradient
          gradientStops={gradientStops}
          circleStyle={{
            fill: fillColor
          }}
          waveStyle={{
            fill: fillColor
          }}
          textStyle={{
            fill: color("#444").toString(),
            fontFamily: "Arial"
          }}
          waveTextStyle={{
            fill: color("#fff").toString(),
            fontFamily: "Arial"
          }}
        />
      </div>
    );
  }
}
