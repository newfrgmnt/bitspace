import { Journey } from '@/components/Onboarding/Journey';

export const Onboarding = () => (
    <Journey
        persistenceKey="onboarding-complete"
        steps={[
            {
                title: 'Welcome to the Bitspace prototype',
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
                    'The transport layer between nodes. Connections may only be established between outputs & inputs'
            },
            {
                title: 'Add your first node',
                description:
                    'Access the Node menu by pressing spacebar & search for a node to add to the circuit.'
            }
        ]}
    />
);
