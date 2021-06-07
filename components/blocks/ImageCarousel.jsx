import { dist, inter } from "../../lib/geo";
import CircleImage from "./CircleImage";

const SMALL_CIRCLE_GAP = 30;
const LARGE_CIRCLE_GAP = {
    MIN: -30,
    MAX: 80
};

function getAngleDistance(arc1, arc2, x, y, largeRadius, cx, cy) {
    const a = arc1.size / 2 + arc2.size / 2 + SMALL_CIRCLE_GAP;
    const b = dist(cx, cy, x, y);
    const c = largeRadius / 2 + arc2.size / 2 + SMALL_CIRCLE_GAP;

    return Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c));
}

export default function ImageCarousel(props) {
    const [ firstImage, ...images ] = props.images;
    let angle = props.startAngle;

    const renderCircleImage = (img, index, items) => {
        const pullFactor = 1 - (index / items.length);
        const betweenPadding = inter(LARGE_CIRCLE_GAP.MIN, LARGE_CIRCLE_GAP.MAX, pullFactor);
        const radius = firstImage.size / 2 + betweenPadding + img.size / 2;
        const centerX = 235;
        const centerY = -185;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const style = {
            left: Math.floor(x),
            top: Math.floor(y),
            position: "absolute",
            transform: "translate(-50%, -50%)"
        };

        if (index + 1 < items.length) {
            angle -= getAngleDistance(img, items[index + 1], x, y, firstImage.size, centerX, centerY);
        }

        return (
            <div key={ index } style={ style }>
                <CircleImage secondaryColor={ true } src={ img.src } width={ img.size } height={ img.size } />
            </div>
        );
    };

    return (
        <div className="image-carousel">
            <CircleImage src={ firstImage.src }
                width={ firstImage.size }
                height={ firstImage.size } />
            <div className="image-carousel__items">
                <div className="image-carousel__items-container flex valign-center">
                    { images.map(renderCircleImage) }
                </div>
            </div>
        </div>
    );
}
