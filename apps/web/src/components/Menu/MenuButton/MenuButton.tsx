import { motion } from 'framer-motion';

export interface MenuButtonProps {
    animate?: boolean;
    onClick: () => void;
}

export const MenuButton = ({ onClick, animate }: MenuButtonProps) => {
    return (
        <motion.button
            className="rounded-full w-12 h-12 p-2 flex flex-col items-center justify-center bg-white shadow-lg focus:border-none focus-visible:outline-none cursor-[url('/cursor.svg')_4_4,auto]"
            whileHover="hover"
            animate={animate ? 'hover' : 'initial'}
            initial="initial"
            onClick={onClick}
        >
            {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                    key={i}
                    transition={{
                        ease: [0.65, 0, 0.35, 1],
                        duration: 0.5
                    }}
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
            <motion.div
                className="absolute w-12 h-12 rounded-full bg-black"
                transition={{ duration: 0.5, delay: 0.3 }}
                variants={{
                    initial: { scale: 0, opacity: 1 },
                    hover: { scale: 0.5, opacity: 0, transitionEnd: { scale: 0, opacity: 1 } }
                }}
            />
        </motion.button>
    );
};
