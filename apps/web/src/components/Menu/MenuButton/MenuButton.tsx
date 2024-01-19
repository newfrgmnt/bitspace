import { motion } from 'framer-motion';

export const MenuButton = () => {
    return (
        <motion.button
            className="rounded-full w-12 h-12 p-2 flex flex-col items-center justify-center bg-white shadow-lg"
            whileHover="hover"
            initial="initial"
        >
            {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                    key={i}
                    variants={{
                        initial: {
                            y: i === 0 ? -5 : 5, // top for the first circle, bottom for the others
                            x: i === 0 ? 0 : i === 1 ? -5 : 5 // center for the first circle, left for the second, right for the third
                        },
                        hover: {
                            x: 0,
                            y: 0
                        }
                    }}
                    className="absolute w-[3px] h-[3px] bg-black rounded-full"
                />
            ))}
        </motion.button>
    );
};
