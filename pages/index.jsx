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

export default function Home() {
    return (
      <div>
        <Header />
        <div className="h-100 flex align-center valign-center">
            <ImageCarousel startAngle={ (7 / 4) * Math.PI } images={ carouselImages } />
            {/* <CircleImage src="/img/intro-6.png" width={ 107 } height={ 107 } /> */}
            {<Card>
                <Input className="mb-2" placeholder="Your username" name="username" />
                <Input className="mb-2" placeholder="Your email" name="email" />
                <Input className="mb-6" placeholder="Your password" type="password" name="password" />
                <Button type="submit" text="Join us" />
            </Card>}
        </div>
      </div>
    );
}
