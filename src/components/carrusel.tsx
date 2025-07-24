import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Card, Image } from "@heroui/react";
import { motion } from "framer-motion";

export function Carrousel() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 1 },
      },
      "(min-width: 641px)": {
        slides: { perView: 2 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 5 },
      },
    },
  });

  const images = [
    { src: "/images/cliente_claro.png", alt: "Claro" },
    { src: "/images/cliente_ubdp.png", alt: "UBDP" },
    { src: "/images/cliente_presidencia.png", alt: "Presidencia" },
    { src: "/images/cliente_generico.png", alt: "Otro cliente" },
  ];

  return (
    <section className="py-8">
      <h3 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Organizaciones que confían en nosotros
      </h3>
      <div
        ref={sliderRef}
        className="flex flex-col justify-center items-center gap-4"
      >
        <div className="grid grid-cols-2 gap-4 justify-center items-center w-full h-full sm:grid sm:grid-cols-2 md:flex md:flex-row lg:flex lg:flex-row xl:flex xl:flex-row 2xl:flex 2xl:flex-row 3xl:flex 3xl:flex-row">
          {images.map((img, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Card key={index}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  className="object-cover w-full h-full rounded-lg"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
