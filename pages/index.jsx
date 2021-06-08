import Card from "../components/blocks/Card";
import CircleImage from "../components/blocks/CircleImage";
import ImageCarousel from "../components/blocks/ImageCarousel";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import Header from '../components/Header';

const carouselImages = [{
    src: "/img/intro-1.png",
    size: 400
}, {
    src: "/img/intro-2.png",
    size: 178
}, {
    src: "/img/intro-3.png",
    size: 160
}, {
    src: "/img/intro-4.png",
    size: 143
}, {
    src: "/img/intro-5.png",
    size: 125
}, {
    src: "/img/intro-6.png",
    size: 107
}, {
    src: "/img/intro-7.png",
    size: 89
}];

const START_ANGLE = (85 / 52) * Math.PI;

export default function Home() {
    return (
        <div className="flex dir-column h-100">
            <Header />
            <div className="h-100 flex align-around valign-center container">
                <div className="bp-block-large">
                    <ImageCarousel startAngle={START_ANGLE} images={carouselImages} />
                    <p className="under-text fs-h1 mt-15">
                        <span className="under-text__border">What the </span>
                        <span className="under-text__accent mr-1">hell</span>
                        <span> is this?!</span>
                    </p>
                </div>
                <div className="flex dir-column valign-center">
                    <div className="mb-10">
                        <p className="fs-h3 pb-3">Images generated by AI</p>
                        <div className="hr"></div>
                        <p className="under-text fs-h3">
                            <span>Try to recognize what is shown </span>
                            <span className="under-text__accent pv-3 ml-1">on picture</span>
                        </p>
                    </div>
                    <Card className="mt-15">
                        <Input className="mb-2" placeholder="Your username" name="username" />
                        <Input className="mb-2" placeholder="Your email" name="email" />
                        <Input className="mb-6" placeholder="Your password" type="password" name="password" />
                        <Button type="submit" text="Join us" />
                    </Card>
                </div>
            </div>
        </div>
    );
}
