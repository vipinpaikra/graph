import React, { useState, useEffect } from "react";
import { scaleBand, scaleLinear, csv, max, format } from "d3";
import * as d3 from "d3";
const svgHeight = window.innerHeight;
const svgWidth = window.innerWidth;

const margin = { top: 40, bottom: 100, left: 100, right: 40 };

const innerHeight = svgHeight - margin.top - margin.bottom;
const innerWidth = svgWidth - margin.left - margin.right;
const csvUrl =
    "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const year = "2020";

const useData = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const row = (d) => {
            d.Population = +d[year] * 1000;
            d.Pop1 = +d["1959"] * 1000;

            return d;
        };
        csv(csvUrl, row).then((data) =>
            setData(
                data
                    .sort(function (a, b) {
                        return (
                            parseFloat(a.Population) - parseFloat(b.Population)
                        );
                    })
                    .reverse()
                    .slice(0, 20)
            )
        );
    }, []);
    return data;
};
const NewBarChart = () => {
    const data = useData();

    if (!data) {
        return <pre style={{ color: "whitesmoke" }}>Loading .... ...</pre>;
    }
    const xScale = scaleBand()
        .domain(data.map((d) => d.Country))
        .range([0, innerWidth])
        .paddingInner(0.4);
    const yScale = scaleLinear()
        .domain([0, max(data, (d) => d.Population)])
        .range([0, innerHeight]);

    return (
        <div>
            <svg
                width={svgWidth}
                height={svgHeight}
                style={{ backgroundColor: "purple" }}
            >
                <g transform={`translate(${margin.left},${margin.top})`}>
                    {data.map((d, i) => {
                        return (
                            <rect
                                key={i}
                                x={xScale(d.Country)}
                                y={innerHeight - yScale(d.Population)}
                                height={yScale(d.Population)}
                                width={xScale.bandwidth()}
                                fill="#f95d6a"
                                stroke="#2f4b7c"
                                strokeWidth={3}
                            >
                                <title>
                                    {format(".2s")(d.Population).replace(
                                        "G",
                                        "B"
                                    )}
                                </title>
                            </rect>
                        );
                    })}
                    {data.map((d, i) => {
                        return (
                            <rect
                                key={i}
                                x={xScale(d.Country) + 15}
                                y={innerHeight - yScale(d.Pop1)}
                                height={yScale(d.Pop1)}
                                width={xScale.bandwidth()}
                                fill="orange"
                                stroke="red"
                                strokeWidth={3}
                            >
                                <title>{d.Country}</title>
                            </rect>
                        );
                    })}

                    {yScale
                        .ticks()

                        .map((tickValue, i) => {
                            return (
                                <g
                                    key={i}
                                    transform={`translate(${0},${innerHeight})`}
                                >
                                    <line
                                        x1={0}
                                        y1={-yScale(tickValue)}
                                        x2={innerWidth}
                                        y2={-yScale(tickValue)}
                                        stroke="#bde0fe"
                                    />
                                    <text x={-60} y={-yScale(tickValue)}>
                                        {format(".2s")(tickValue).replace(
                                            "G",
                                            "B"
                                        )}
                                    </text>
                                </g>
                            );
                        })}
                    {xScale.domain().map((tickValue, i) => (
                        <g
                            className="tick"
                            style={{ textAnchor: "middle" }}
                            key={i}
                            transform={`translate(${
                                xScale(tickValue) + xScale.bandwidth() / 2
                            },${innerHeight})`}
                        >
                            <text y="20" fontSize="1em">
                                {tickValue.length <= 9
                                    ? tickValue
                                    : tickValue.slice(0, 9) + "..."}
                            </text>
                        </g>
                    ))}
                    {
                        <text
                            className="axis-label"
                            x={innerWidth / 2 - 100}
                            y={innerHeight}
                            dy="2.5em"
                        >
                            Population - {year}
                        </text>
                    }
                </g>
            </svg>
        </div>
    );
};

export default NewBarChart;
