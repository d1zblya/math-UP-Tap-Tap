import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import "./ProgressBar.css";

const ProgressBar = forwardRef(({targetProgress = 100, onComplete}, ref) => {
    const [progress, setProgress] = useState(0);


    const fillProgressBar = () => {
        setProgress((prevProgress) => {
            const newProgress = prevProgress + 10;
            return newProgress > targetProgress ? targetProgress : newProgress;
        });
    };

    useEffect(() => {
        if (progress >= targetProgress) {
            setProgress(0);
            if (onComplete) {
                onComplete();
            }
        }
    }, [progress, targetProgress, onComplete]);


    useImperativeHandle(ref, () => ({
        fillProgressBar,
    }));


    return (
        <div className="progress-bar">
            <div className="progress-body">
                <div
                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "linear-gradient(270deg, #7B00FF 0%, #140099 100%)",
                        transition: "width 0.3s ease",
                    }}
                />
            </div>
        </div>
    );
});

export default ProgressBar;