import { scaleLinear, sum, timeMonths, scaleTime, extent, max, bin } from "d3";
import React from "react";
import { Rect } from "./Rect";

// const width = 960;
// const height = 500;
const width = 1260;
const height = 500;

const margin = { top: 400, bottom: 0, left: 0, right: 0 };
function DateHistogram({ data }) {
    const xValue = (d) => d["Reported Date"];
    const xAxisLabel = "Time";

    const yValue = (d) => d["Total Dead and Missing"];
    const yAxisLabel = "Total Dead and Missing";
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();
    const [start, stop] = xScale.domain();
    const binnedData = bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeMonths(start, stop))(data)
        .map((array) => ({
            y: sum(array, yValue),
            x0: array.x0,
            x1: array.x1,
        }));
    const yScale = scaleLinear()
        .domain([0, max(binnedData, (d) => d.y)])
        .range([innerHeight - 10, 0]);
    return (
        <g transform={`translate(${margin.left},${margin.top})`}>
            <Rect
                binnedData={binnedData}
                xScale={xScale}
                yScale={yScale}
                tooltipFormat={(d) => d}
                circleRadius={2}
                innerHeight={innerHeight}
            />
        </g>
    );
}

export default DateHistogram;
