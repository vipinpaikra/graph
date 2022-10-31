import React from "react";
import * as d3 from "d3";
import { useRef } from "react";
import { useEffect } from "react";

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
const data2 = [
    { year: "2017", count: 53 },
    { year: "2018", count: 172 },
    { year: "2019", count: 20 },
    { year: "2020", count: 28 },
    { year: "2021", count: 120 },
    { year: "2022", count: 144 },
    { year: "2023", count: 22 },
    { year: "2024", count: 110 },
    { year: "2025", count: 122 },
    { year: "2026", count: 130 },
];

const AreaChart = () => {
    const areaChart = useRef();
    const svgDimention = { width: 800, height: 400 };
    useEffect(() => {
        const svg = d3
            .select(areaChart.current)
            .attr("width", svgDimention.width)
            .attr("height", svgDimention.height)
            .style("background-color", " #34446e");

        const xScale = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => d3.timeParse("%Y")(d.year)))
            .range([0, svgDimention.width - 100]);
        svg.append("g")
            .call(d3.axisBottom(xScale))
            .attr("transform", "translate(20,350)");
        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.count)])
            .range([svgDimention.height - 100, 0]);

        svg.append("g")
            .call(d3.axisLeft(yScale))
            .attr("transform", "translate(20,50)");

        const area = d3
            .area()
            .x((d) => xScale(d3.timeParse("%Y")(d.year)))
            .y((d) => yScale(0))
            .x1((d) => xScale(d3.timeParse("%Y")(d.year)))
            .y1((d) => yScale(d.count));

        svg.append("path")
            .datum(data)
            .attr("d", area)
            .attr("fill", null)
            .attr("stroke", "#c70469")
            .attr("stroke-width", 2)
            .attr("transform", "translate(20,50)");
        // svg.append("path")
        //     .datum(data2)
        //     .attr("d", area)
        //     .attr("fill", null)
        //     .attr("stroke", "black")
        //     .attr("stroke-width", 2)
        //     .attr("transform", "translate(20,50)");
    }, []);

    return (
        <div id="chartArea">
            <svg ref={areaChart}></svg>
        </div>
    );
};

export default AreaChart;
