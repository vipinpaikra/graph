import { AxisBottom } from "./AxisBottom";

export const Rect = ({
    binnedData,
    xScale,
    yScale,
    tooltipFormat,
    innerHeight,
}) =>
    binnedData.map((d) => (
        <g>
            <rect
                key={d.x0}
                className="mark"
                x={xScale(d.x0)}
                y={yScale(d.y)}
                width={xScale(d.x1) - xScale(d.x0)}
                height={innerHeight - yScale(d.y)}
            >
                <title>{tooltipFormat(d.y)}</title>
            </rect>
        </g>
    ));
