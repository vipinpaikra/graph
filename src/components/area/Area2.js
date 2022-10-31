import React from "react";
import * as d3 from "d3";

const data = [
    { year: "2017", count: 52 },
    { year: "2018", count: 72 },
    { year: "2019", count: 42 },
    { year: "2020", count: 82 },
    { year: "2021", count: 152 },
    { year: "2022", count: 44 },
    { year: "2023", count: 77 },
    { year: "2024", count: 11 },
    { year: "2025", count: 123 },
    { year: "2026", count: 30 },
];
const svgHeight = 600;
const svgWidth = 700;
const Area2 = () => {
    const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d3.timeParse("%Y")(d.year)))
        .range([0, svgWidth - 100]);
    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count)])
        .range([svgHeight - 100, 0]);
    return (
        <svg
            style={{ backgroundColor: "orange" }}
            width={svgWidth}
            height={svgHeight}
        >
            {data.map((ds, i) => {
                return (
                    <g key={i}>
                        <path
                            d={d3
                                .area()
                                .x((d) => xScale(d3.timeParse("%Y")(d.year)))
                                .y((d) => yScale(0))
                                .y1((d) => yScale(d.count))(data)}
                            fill="red"
                            strokeWidth={3}
                            stroke={"#f4a261"}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                        <text>Hi</text>
                    </g>
                );
            })}
        </svg>
    );
};

export default Area2;
