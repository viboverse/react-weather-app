import { motion } from "motion/react";

export default function ForcastItem({ date, iconUrl, altImage, temp, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      transition={{
        opacity: { delay: index * 0.1, duration: 1 },
        y: { delay: index * 0.1, duration: 1 },
        scale: { duration: 0.2 },
      }}
      className="flex flex-col rounded-lg bg-blue-500 p-4 shadow-md hover:bg-blue-600"
    >
      <p className="font-semibold">{date}</p>
      <img src={iconUrl} alt={altImage} className="h-16 w-16" />
      <p className="text-lg font-bold">{temp}°C</p>
    </motion.li>
  );
}
