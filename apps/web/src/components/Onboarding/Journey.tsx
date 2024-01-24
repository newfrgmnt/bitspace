import { ChevronLeft, ChevronLeftOutlined, ChevronRight, ChevronRightOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export interface JourneyProps {
    steps: JourneyStepProps[];
}

export const Journey = ({ steps }: JourneyProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const step = useMemo(() => steps[currentStep], [currentStep, steps]);
    const nextStep = useMemo(() => steps[currentStep + 1], [currentStep, steps]);
    const previousStep = useMemo(() => steps[currentStep - 1], [currentStep, steps]);

    return (
        <motion.div
            className="p-8 rounded-[2rem] bg-white shadow-2xl fixed left-20 bottom-20 w-72 max-h-[320px] h-full overflow-y-auto flex flex-col gap-y-8"
            variants={{
                initial: { y: 200, opacity: 0 },
                animate: { y: 0, opacity: 1, transition: { duration: 2, ease: [0.75, 0, 0.25, 1] } }
            }}
        >
            <motion.div
                className="h-full"
                variants={{
                    initial: { y: 50, opacity: 0 },
                    animate: { y: 0, opacity: 1, transition: { duration: 2, ease: [0.75, 0, 0.25, 1] } }
                }}
            >
                {step && <JourneyStep key={step.title} step={step} />}
            </motion.div>
            <div className="flex flex-row justify-between items-center">
                <motion.button
                    className={clsx('bg-slate-200 text-slate-400 rounded-xl p-2', {
                        'opacity-50': !previousStep
                    })}
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={!previousStep}
                >
                    <ChevronLeftOutlined />
                </motion.button>

                <motion.button
                    className={clsx('bg-slate-200 text-slate-400 rounded-xl p-2', {
                        'opacity-50': !nextStep
                    })}
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!nextStep}
                >
                    <ChevronRightOutlined />
                </motion.button>
            </div>
        </motion.div>
    );
};

export interface JourneyStepProps {
    title: string;
    description: string;
    image?: string;
}

export const JourneyStep = ({ step }: { step: JourneyStepProps }) => {
    return (
        <motion.div
            className="flex flex-col gap-y-4 flex-grow"
            variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { duration: 1, ease: 'linear' } }
            }}
        >
            {step.image && (
                <motion.div
                    className="rounded-2xl bg-cover bg-center w-full max-h-32 h-full"
                    style={{
                        backgroundImage: `url(${step.image})`
                    }}
                />
            )}
            <motion.h3 className="text-2xl leading-snug">{step.title}</motion.h3>
            <motion.p className="text-slate-500 leading-normal">{step.description}</motion.p>
        </motion.div>
    );
};
