///logic

import React from "react";
import * as d3 from "d3";

const PieChart = () => {
    const student = [
        { subject: "math", value: 60, color: "red" },
        { subject: "physics", value: 70, color: "blue" },
        { subject: "hindi", value: 40, color: "pink" },
        { subject: "english", value: 50, color: "orange" },
    ];
    const svgHeight = window.innerHeight;
    const svgWidth = window.innerWidth;

    const arcs = d3.pie()(student.map((d) => d.value));

    const myArc = d3.arc().innerRadius(100).outerRadius(200);

    return (
        <div>
            <svg
                width={svgWidth}
                height={svgHeight}
                style={{ backgroundColor: "#0d0a29" }}
            >
                {arcs.map((sd, i) => {
                    return (
                        <g key={i}>
                            <g transform={`translate(${30},${30})`}>
                                <rect
                                    x={20}
                                    y={20 * i - 10}
                                    width={10}
                                    height={10}
                                    fill={student[i].color}
                                />
                                <text x={50} y={20 * i}>
                                    {student[i].subject}
                                </text>
                            </g>

                            <g
                                transform={`translate(${svgWidth / 2},${
                                    svgHeight / 2
                                })`}
                            >
                                <title>
                                    {student[i].subject}- {student[i].value}
                                </title>
                                <text x={30} y={-20}>
                                    Hi
                                </text>
                                <path
                                    d={myArc(sd)}
                                    fill={student[i].color}
                                    stroke="#0d0a29"
                                    strokeWidth={5}
                                    opacity={0.7}
                                />
                            </g>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default PieChart;
