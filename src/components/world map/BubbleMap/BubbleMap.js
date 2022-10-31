import { scaleSqrt, max } from "d3";
import Marks from "../Marks";
export const BubbleMap = ({ worldAtlas, data, svgHeight, svgWidth }) => {
    const sizeValue = (d) => d["Total Dead and Missing"];
    const maxRadius = 20;
    const sizeScale = scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]);
    return (
        <Marks
            worldAtlas={worldAtlas}
            data={data}
            sizeScale={sizeScale}
            sizeValue={sizeValue}
            svgHeight={svgHeight}
            svgWidth={svgWidth}
        />
    );
};
