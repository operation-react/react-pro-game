import CircleImage from "./CircleImage";

export default function ImageCarousel(props) {
    const [ firstImage, ...images ] = props.images;
    const largePadding = 10;
    const itemsPadding = 20;
    let angle = props.startAngle;

    const renderCircleImage = (img, index, items) => {
        const radius = firstImage.size + largePadding + img.size;
        const centerX = 0;
        const centerY = 0;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const style = {
            left: x,
            top: y,
            position: "absolute",
            transform: "translate(-50%, -50%)"
        };

        if (index + 1 < items.length) {
        }

        return (
            <div style={ style }>
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
