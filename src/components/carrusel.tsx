import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Card } from "@heroui/react";
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
    { src: "/images/upbd.jpg", alt: "UBDP" },
    { src: "/images/cliente_presidencia.png", alt: "Presidencia" },
    { src: "/images/cliente_generico.jpg", alt: "Nissan" },
  ];

  return (
    <section className="py-8 w-full">
      <h3 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Organizaciones que confían en nosotros
      </h3>
      <div className="w-full flex flex-col items-center justify-center">
        {/* Carrusel KeenSlider */}
        <div ref={sliderRef} className="keen-slider w-full max-w-lg sm:max-w-2xl md:max-w-4xl">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="keen-slider__slide px-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Card>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="object-contain w-full h-28 sm:h-36 md:h-40 rounded-lg bg-white p-4"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
