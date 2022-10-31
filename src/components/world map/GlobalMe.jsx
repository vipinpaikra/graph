//!Line Chart design

import React from "react";

import { extent, scaleSqrt, max } from "d3";

import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import Marks from "./Marks";
import { BubbleMap } from "./BubbleMap/BubbleMap";
import DateHistogram from "./DateHistogram/DateHistogram";
const margin = { top: 0, bottom: 0, left: 0, right: 0 };
const svgHeight = window.innerHeight;
const svgWidth = window.innerWidth;
// const svgWidth = 960;
// const svgHeight = 500;

const GlobalMe = () => {
    const worldAtlas = useWorldAtlas();
    const data = useData();

    if (!worldAtlas || !data) {
        return <pre>Loading....</pre>;
    }

    const innerHeight = svgHeight - margin.top - margin.bottom;
    const innerWidth = svgWidth - margin.left - margin.right;

    return (
        <div>
            <svg
                width={svgWidth}
                height={svgHeight}
                style={{ border: "1px solid #457b9d", borderRadius: "10px" }}
            >
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <BubbleMap
                        worldAtlas={worldAtlas}
                        data={data}
                        svgHeight={svgHeight}
                        svgWidth={svgWidth}
                    />
                    <DateHistogram data={data} />
                </g>
            </svg>
        </div>
    );
};

export default GlobalMe;
