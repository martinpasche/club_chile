import ImageSlider from "../components/ImageSlider.tsx";
import Img1 from '../imgs/Imagen de WhatsApp 2023-09-12 a las 17.38.49_6f2f5aa9.jpg';
import Img2 from '../imgs/Imagen de WhatsApp 2023-09-12 a las 22.11.54_8498568e.jpg';
import Img3 from '../imgs/Imagen de WhatsApp 2023-09-16 a las 22.35.29_b02b9d5e.jpg';
import Img4 from '../imgs/Imagen de WhatsApp 2023-09-16 a las 22.35.32_075af17c.jpg';
import Img5 from '../imgs/Imagen de WhatsApp 2023-10-25 a las 20.03.51_01266404.jpg';
import chileShape from '../svg/chile-chile-svgrepo-com.svg'

const IMAGES = [Img1, Img2, Img3, Img4, Img5]


export default function HomePage () {

    return (
        <>
        <section className="block w-full h-full mx-auto my-0">
            <ImageSlider imageUrls={IMAGES} />

            <img src={chileShape} />
        </section>

        </>
    );
}