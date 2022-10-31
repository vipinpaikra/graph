import React from "react";
import "./Mark.css";
import { geoEqualEarth, geoNaturalEarth1, geoPath, geoGraticule } from "d3";

const Marks = ({
    worldAtlas: { land, interiors },
    data,
    sizeScale,
    sizeValue,
    svgHeight,
    svgWidth,
}) => {
    const projection = geoEqualEarth()
        .scale(200)
        .translate([svgWidth / 2, svgHeight / 2]);
    const path = geoPath(projection);
    const graticule = geoGraticule();
    return (
        <g className="marks">
            <path className="sphere" d={path({ type: "Sphere" })} />
            <path className="graticules" d={path(graticule())} />
            {land.features.map((feature, i) => (
                <path className="country" key={i} d={path(feature)} />
            ))}
            <path className="interiors" d={path(interiors)} />
            {data.map((d, i) => {
                const [x, y] = projection(d.coords);
                return (
                    <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={sizeScale(sizeValue(d))}
                        opacity={0.3}
                    >
                        <title>
                            cx:{x} cy:{y}
                        </title>
                    </circle>
                );
            })}
        </g>
    );
};

export default Marks;
