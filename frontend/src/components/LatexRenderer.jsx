import React from "react";
import katex from "katex";


const LatexRenderer = ({ expression }) => {
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        if (containerRef.current) {
            katex.render(expression, containerRef.current, {
                throwOnError: false, // Игнорировать ошибки в LaTeX
                output: "html",
            });
        }
    }, [expression]);

    return <div ref={containerRef} />;
};

export default LatexRenderer;