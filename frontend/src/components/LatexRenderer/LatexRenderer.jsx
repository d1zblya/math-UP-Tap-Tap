import React from "react";
import katex from "katex";
import "./LatexRenderer.css"


const LatexRenderer = ({expression}) => {
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        if (containerRef.current) {
            katex.render(expression, containerRef.current, {
                throwOnError: false,
                output: "mathml",
            });
        }
    }, [expression]);

    return <div className={"katex-container"} ref={containerRef}/>;
};

export default LatexRenderer;