import React from "react";

const ColorLegend = ({ colorScale, innerWidth, onHover, hoveredValue }) => {
    return colorScale.domain().map((domainValue, i) => {
        return (
            <g
                key={domainValue}
                transform={`translate(${innerWidth - 120},${i * 40})`}
                onMouseEnter={() => onHover(domainValue)}
                onMouseOut={() => onHover(null)}
                cursor="pointer"
                opacity={domainValue !== hoveredValue && hoveredValue ? 0.5 : 1}
            >
                <circle fill={colorScale(domainValue)} r={7} />
                <text x={10} y={5} style={{ color: "white" }}>
                    {domainValue}
                </text>
            </g>
        );
    });
};

export default ColorLegend;
