import React, { useEffect, useState } from "react";

import * as d3 from "d3";
import "./IntractiveLegend.css";
import { scaleOrdinal, range, format, extent, max, scaleLinear } from "d3";
import Dropdown from "./Dropdown";
import ColorLegend from "./ColorLegend";

const margin = { top: 20, bottom: 100, left: 100, right: 20 };
const svgHeight = window.innerHeight - 40;
const svgWidth = window.innerWidth;
const csvUrl =
    "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

const useData = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const row = (d) => {
            d.petal_length = +d.petal_length;
            d.petal_width = +d.petal_width;
            d.sepal_length = +d.sepal_length;
            d.sepal_width = +d.sepal_width;
            return d;
        };
        d3.csv(csvUrl, row).then(setData);
    }, []);
    return data;
};

const IntractiveLegend = () => {
    const data = useData();
    const [hoveredValue, setHoveredValue] = useState("null");

    const initialXAttribute = "sepal_length";

    const xValue = (d) => d[xAttribute];
    const [xAttribute, setXAttribute] = useState(initialXAttribute);

    const [yAttribute, setYAttribute] = useState(initialXAttribute);
    const yValue = (d) => d[yAttribute];
    if (!data) {
        return <h3>Loading....</h3>;
    }
    const colorValue = (d) => d.species;
    const colorScale = scaleOrdinal()
        .domain(data.map(colorValue))
        .range(["orange", "green", "white"]);
    const filterData = data.filter((d) => hoveredValue === colorValue(d));

    const attribute = [
        { value: "sepal_length", label: "Sepal Length" },
        { value: "sepal_width", label: "Sepal Width" },
        { value: "petal_length", label: "Petal Length" },
        { value: "petal_width", label: "Petal Width" },
        { value: "species", label: "Species" },
    ];
    const color = {
        virginica: "#F3A8B6",
        versicolor: "#C19AF2",
        setosa: "#00C9A9",
    };
    const colors = [
        { name: "virginica", color: "#F3A8B6" },
        { name: "versicolor", color: "#C19AF2" },
        { name: "setosa", color: "#00C9A9" },
    ];

    const innerHeight = svgHeight - margin.top - margin.bottom;
    const innerWidth = svgWidth - margin.left - margin.right;
    const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth - 200])
        .nice();
    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    ///* new line add for use State
    const getLabel = (value) => {
        for (let i = 0; i < attribute.length; i++) {
            if (attribute[i].value === value) {
                return attribute[i].label;
            }
        }
    };
    const xAxisLabel = getLabel(xAttribute);
    const yAxisLabel = getLabel(yAttribute);

    return (
        <div>
            <div className="menus-container">
                <label
                    htmlFor="x-select"
                    className="dropdown-label"
                    style={{ color: "white" }}
                >
                    X:
                </label>
                <Dropdown
                    options={attribute}
                    id="x-select"
                    selectedValue={xAttribute}
                    onSelectedValueChange={setXAttribute}
                />
                <label
                    htmlFor="y-select"
                    className="dropdown-label"
                    style={{ color: "white" }}
                >
                    Y:
                </label>
                <Dropdown
                    options={attribute}
                    id="y-select"
                    selectedValue={yAttribute}
                    onSelectedValueChange={setYAttribute}
                />
            </div>
            <svg
                width={svgWidth}
                height={svgHeight}
                style={{
                    backgroundColor: "blueviolet",
                    borderRadius: "20px",
                }}
            >
                <g transform={`translate(${margin.left},${margin.top})`}>
                    {xScale.ticks().map((tickValue, i) => {
                        return (
                            <g key={i}>
                                <line
                                    x1={xScale(tickValue)}
                                    y1={0}
                                    x2={xScale(tickValue)}
                                    y2={innerHeight}
                                    stroke="#B1A8B9"
                                />
                                <text
                                    x={xScale(tickValue)}
                                    y={innerHeight + 30}
                                >
                                    {tickValue}
                                </text>
                            </g>
                        );
                    })}
                    {yScale.ticks().map((tickValue, i) => {
                        return (
                            <g
                                key={i}
                                // transform={`translate(${0},${innerHeight})`}
                            >
                                <line
                                    x1={0}
                                    y1={yScale(tickValue)}
                                    x2={innerWidth - 150}
                                    y2={yScale(tickValue)}
                                    stroke="#B1A8B9"
                                />
                                <text x={-50} y={yScale(tickValue)}>
                                    {tickValue}
                                </text>
                            </g>
                        );
                    })}
                    <ColorLegend
                        colorScale={colorScale}
                        innerWidth={innerWidth}
                        onHover={setHoveredValue}
                        hoveredValue={hoveredValue}
                    />
                    {filterData.map((d, i) => {
                        return (
                            <circle
                                key={i}
                                cx={xScale(xValue(d))} //give point
                                cy={yScale(yValue(d))}
                                r={10}
                                fill={colorScale(colorValue(d))}
                                //? my logic for limited number
                                // fill={
                                //     d.species === "setosa"
                                //         ? color.setosa
                                //         : d.species === "versicolor"
                                //         ? color.versicolor
                                //         : color.virginica
                                // }
                            >
                                <title>
                                    {d.species === "setosa"
                                        ? "setosa"
                                        : d.species === "versicolor"
                                        ? "versicolor"
                                        : "virginica"}
                                </title>

                                {/* Need some test 
                                <title>
                                    ({d.species}) sepal_length:{d.sepal_length}{" "}
                                    sepal_width:
                                    {d.sepal_width}
                                </title> */}
                            </circle>
                        );
                    })}

                    {
                        <g opacity={hoveredValue ? 0.4 : 1}>
                            {data.map((d, i) => {
                                return (
                                    <circle
                                        key={i}
                                        cx={xScale(xValue(d))} //give point
                                        cy={yScale(yValue(d))}
                                        r={7}
                                        fill={colorScale(colorValue(d))}
                                        //? my logic for limited number
                                        // fill={
                                        //     d.species === "setosa"
                                        //         ? color.setosa
                                        //         : d.species === "versicolor"
                                        //         ? color.versicolor
                                        //         : color.virginica
                                        // }
                                    >
                                        <title>
                                            {d.species === "setosa"
                                                ? "setosa"
                                                : d.species === "versicolor"
                                                ? "versicolor"
                                                : "virginica"}
                                        </title>

                                        {/* Need some test 
                                <title>
                                    ({d.species}) sepal_length:{d.sepal_length}{" "}
                                    sepal_width:
                                    {d.sepal_width}
                                </title> */}
                                    </circle>
                                );
                            })}
                        </g>
                    }
                    {
                        <g>
                            <text
                                x={-innerHeight / 2}
                                y={-60}
                                transform={`rotate(-90) `}
                                textAnchor="middle"
                            >
                                {yAxisLabel}
                            </text>
                        </g>
                    }
                    <text
                        x={innerWidth / 2}
                        y={innerHeight + 60}
                        textAnchor="middle"
                    >
                        {xAxisLabel}
                    </text>
                    <text
                        x={innerWidth / 2}
                        y={innerHeight + 90}
                        textAnchor="middle"
                        fontSize="1.4em"
                    >
                        Iris Data prediction
                    </text>
                </g>
            </svg>
        </div>
    );
};

export default IntractiveLegend;
