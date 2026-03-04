import { useState } from "react";

const images = [
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_2.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_3.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_4.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_5.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_6.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_7.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_8.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_9.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_10.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_11.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_12.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_13.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_14.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_15.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_16.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_17.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_18.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_19.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_20.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_21.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_22.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_23.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_24.jpg",
    "https://davidortizjr.github.io/old-portfolio/school/webdev/Gallery/memory_lane/pic_25.jpg"]

const tapeColors = [
    "var(--clr-pink)",
    "var(--clr-teal)",
    "var(--clr-yellow)",
    "var(--clr-peach)",
    "var(--clr-blue)"
];

const tapePositions = [
    "left-4 rotate-3 top-0",
    "right-4 -rotate-3 top-0",
    "left-4 -translate-y-1/2 rotate-6 top-0",
    "right-4 -translate-y-1/2 -rotate-6 top-0",
    "left-4 -translate-y-full rotate-12 top-0",
    "right-4 -translate-y-full -rotate-12 top-0"
];

function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function Gallery() {
    const [shuffledImages] = useState(() => shuffleArray(images));
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-12 py-8">
            {shuffledImages.map((src, index) => (
                <div key={index} className="relative group inline-block w-80">
                    <div className="frame shadow-lg border border-slate-100 transition-transform transform group-hover:scale-105">
                        <div className={`tape ${tapePositions[index % tapePositions.length]}`} style={{ backgroundColor: tapeColors[index % tapeColors.length] }}></div>
                        <img src={src} alt={`Gallery Image ${index + 2}`} className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all" />
                    </div>
                </div>
            ))}
        </div>
    )
}