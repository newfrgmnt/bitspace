import { Journey } from '@/components/Onboarding/Journey';

export const Onboarding = () => (
    <Journey
        persistenceKey="onboarding-complete"
        steps={[
            {
                title: 'Welcome to Bitspace',
                description: `A visual programming environment for creative endeavours. Let's go through the basics.`
            },
            {
                title: 'Circuits',
                description:
                    'This canvas is known as a Circuit. It contains nodes & connections - the building blocks of Bitspace.'
            },
            {
                title: 'Nodes',
                description:
                    'Isolated blocks of computation, operating on inputs to produce outputs.'
            },
            {
                title: 'Connections',
                description:
                    'These are used to link data between different nodes. Connections may only be established between outputs & inputs'
            }
        ]}
    />
);
