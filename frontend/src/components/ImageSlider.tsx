import React, { useState, useEffect, useRef } from "react";
import { Circle, CircleDot } from "lucide-react";

type ImageSliderProps = {
    imageUrls: string[]
}

/* en segundos */
const timerStepImagenes = 8;

export default function ImageSlider({ imageUrls }: ImageSliderProps) {
    const [imgIndex, setImgIndex] = useState(0);
    const intervalRef = useRef(0.0);

    /* funcion para que las imagenes roten con el tiempo */
    useEffect(() => {
        intervalRef.current = setInterval(() => showNextImg(), timerStepImagenes * 1000);

        return () => clearInterval(intervalRef.current);
    }, [timerStepImagenes, intervalRef]);


    function showNextImg() {
        setImgIndex(index => {
            if (index === imageUrls.length - 1) return 0
            return index + 1
        })

        // Clear the existing interval
        clearInterval(intervalRef.current);

        // Set a new interval
        intervalRef.current = setInterval(() => showNextImg(), timerStepImagenes * 1000);
    }

    function showPrevImg() {
        setImgIndex(index => {
            if (index === 0) return imageUrls.length - 1
            return index - 1
        })

        // Clear the existing interval
        clearInterval(intervalRef.current);

        // Set a new interval
        intervalRef.current = setInterval(() => showNextImg(), timerStepImagenes * 1000);
    }

    return (
        <div className="w-full h-full relative">
            <div className="flex w-full h-[calc(100vh-19*0.25rem)] overflow-hidden">
                {
                    imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            className={`object-cover w-full h-full flex-shrink-0 flex-grow-0`}
                            style={{
                                transform: `translateX(${-100 * imgIndex}%`,
                                transitionProperty: "transform",
                                transitionDuration: "400ms",
                                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        />
                    ))
                }
            </div>

            <button onClick={showPrevImg} className="block absolute hover:bg-black/[.3] top-0 bottom-0 left-0 w-1/12 z-80 transition-colors ease-in-out duration-700"></button>
            <button onClick={showNextImg} className="block absolute hover:bg-black/[.3] top-0 bottom-0 right-0 w-1/12 z-80 transition-colors ease-in-out duration-700"></button>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-3">
                {imageUrls.map((_, index) => (
                    <button key={index} onClick={() => setImgIndex(index)}>
                        {index === imgIndex ? <CircleDot className="fill-black stroke-white hover:scale-110 transition" /> : <Circle className="fill-black stroke-white hover:scale-110 transition" />}
                    </button>
                ))}
            </div>
        </div>
    );
}
