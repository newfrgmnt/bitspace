'use client';

import { motion } from 'framer-motion';

const cards = [
    {
        title: 'Card 1',
        description: 'This is card 1'
    },
    {
        title: 'Card 2',
        description: 'This is card 2'
    },
    {
        title: 'Card 3',
        description: 'This is card 3'
    }
];

export default function Page(): JSX.Element {
    return (
        <main className="bg-slate-50">
            <div>
                {cards.map(card => (
                    <motion.div key={card.title} className="rounded-xl p-8 text-lg">
                        <h3>{card.title}</h3>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
