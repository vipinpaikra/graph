// Temperature Time Line Graph
import React, { useEffect, useState } from "react";
import {
    csv,
    extent,
    line,
    scaleLinear,
    scaleTime,
    timeFormat,
    curveNatural,
} from "d3";

const csvUrl =
    "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv";

const svgHeight = window.innerHeight;
const svgWidth = window.innerWidth;
const margin = { top: 20, bottom: 100, left: 100, right: 20 };

const useData = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const row = (d) => {
            d.timestamp = new Date(d.timestamp);
            d.temperature = +d.temperature;

            return d;
        };
        csv(csvUrl, row).then(setData);
    }, []);
    return data;
};

const TempTimeLine = () => {
    const data = useData();

    if (!data) {
        return <h3 style={{ color: "white" }}>Loading. . . . . .</h3>;
    }

    const xValue = (d) => d.timestamp;
    const yValue = (d) => d.temperature;
    const innerHeight = svgHeight - margin.top - margin.bottom;
    const innerWidth = svgWidth - margin.left - margin.right;

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();
    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    return (
        <div>
            <svg width={svgWidth} height={svgHeight}>
                {
                    <g transform={`translate(${margin.left},${margin.top})`}>
                        {xScale.ticks().map((tickValue, i) => {
                            return (
                                <g key={i}>
                                    <text
                                        x={xScale(tickValue)}
                                        y={innerHeight + 30}
                                    >
                                        {timeFormat("%d %b")(tickValue)}
                                    </text>
                                    <line
                                        x1={xScale(tickValue)}
                                        y1={0}
                                        x2={xScale(tickValue)}
                                        y2={innerHeight}
                                        stroke="#B1A8B9"
                                    />
                                </g>
                            );
                        })}
                        {yScale.ticks().map((tickValue, i) => {
                            return (
                                <g key={i}>
                                    <text x={-30} y={yScale(tickValue)}>
                                        {tickValue}
                                    </text>
                                    <line
                                        x1={0}
                                        y1={yScale(tickValue)}
                                        x2={innerWidth}
                                        y2={yScale(tickValue)}
                                        stroke="#B1A8B9"
                                    />
                                </g>
                            );
                        })}
                        {data.map((d, i) => {
                            console.log(d);
                            return (
                                <g key={i}>
                                    <path
                                        d={line()
                                            .x((d) => xScale(xValue(d)))
                                            .y((d) => yScale(yValue(d)))
                                            .curve(curveNatural)(data)}
                                        fill="none"
                                        strokeWidth={3}
                                        stroke={"#f4a261"}
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    />

                                    <circle
                                        cx={xScale(xValue(d))}
                                        cy={yScale(yValue(d))}
                                        r={5}
                                        fill={"#FFA7FF"}
                                        // fill={"none"}
                                        stroke="#45546D"
                                        cursor={"pointer"}
                                    >
                                        <title>{d.temperature}</title>
                                    </circle>
                                </g>
                            );
                        })}

                        <text
                            x={0}
                            y={0}
                            textAnchor="middle"
                            transform={`translate(${-50},${
                                innerHeight / 2
                            }) rotate(-90)`}
                        >
                            temperature
                        </text>
                        <text
                            x={innerWidth / 2}
                            y={innerHeight + 50}
                            textAnchor="middle"
                        >
                            Day
                        </text>
                        <text
                            x={innerWidth / 2}
                            y={innerHeight + 80}
                            textAnchor="middle"
                        >
                            Temperature VS Day
                        </text>
                    </g>
                }
            </svg>
        </div>
    );
};

export default TempTimeLine;
