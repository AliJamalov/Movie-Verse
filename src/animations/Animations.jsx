import { motion } from "framer-motion";

const buttonAnimation = {
  hidden: { opacity: 0, scale: 0.9 }, // Начинаем с меньшего масштаба и прозрачности
  visible: {
    opacity: 1, // Делаем кнопку видимой
    scale: 1, // Возвращаем нормальный размер
    transition: {
      duration: 1.2, // Увеличиваем длительность до 2 секунд
      ease: "easeInOut", // Плавный переход
      delay: 0.1, // Добавляем небольшую задержку для начала анимации
    },
  },
};

export const containerVariantsHeroSection = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.5, ease: "easeOut" },
  },
};

export const itemVariantsHeroSection = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const AnimatedTitleHeroSection = () => {
  return (
    <motion.h1
      className="text-[30px] md:text-[50px] font-bold leading-tight"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.span
        className="text-yellow-400 inline-block"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Movie Verse <br />
      </motion.span>
      <motion.span
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {" "}
        Unlimited{" "}
      </motion.span>
      <motion.span
        className="text-yellow-400 inline-block"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        Movie,
      </motion.span>{" "}
      <br />
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        TVs Shows, & More.
      </motion.span>
    </motion.h1>
  );
};

export const AnimatedButtonShowAll = () => {
  return (
    <motion.button
      variants={buttonAnimation}
      initial="hidden"
      whileInView="visible" // Анимация будет происходить, когда кнопка станет видимой
      viewport={{ once: true, amount: 0.5 }} // Срабатывает, когда кнопка на 50% в зоне видимости
      className="text-white cursor-pointer bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-2 md:px-5 md:py-3"
    >
      Show all
    </motion.button>
  );
};

export const AnimatedButtonHeroSection = ({ handleShowTrailer }) => {
  return (
    <motion.button
      onClick={handleShowTrailer}
      type="button"
      variants={buttonAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="text-white mt-[20px] cursor-pointer bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 font-medium rounded-full text-sm px-8 py-3 transition-all duration-300 transform hover:scale-105 active:scale-95"
    >
      Watch Trailer
    </motion.button>
  );
};

export const AnimatedButtonHeroSection2 = ({ handleGetMovie }) => {
  return (
    <motion.button
      onClick={handleGetMovie}
      type="button"
      variants={buttonAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="text-white mt-[20px] cursor-pointer bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 font-medium rounded-full text-sm px-8 py-3 transition-all duration-300 transform hover:scale-105 active:scale-95"
    >
      Get Random Movie
    </motion.button>
  );
};
