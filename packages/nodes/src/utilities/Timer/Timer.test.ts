import { Timer } from './Timer';

describe('Timer', () => {
    it('should initialize with correct values', () => {
        const timer = new Timer();

        expect(typeof timer.id).toEqual('string');
        expect(timer.name).toEqual('Timer');
        expect(timer.outputs.milliseconds).toBeDefined();
        expect(timer.outputs.seconds).toBeDefined();

        timer.dispose();
    });

    it('should compute properly', async () => {
        const timer = new Timer();

        const spy = jest.fn();
        const sub = timer.outputs.milliseconds.subscribe(spy);
        const sub2 = timer.outputs.seconds.subscribe(spy);

        sub.add(sub2);

        await new Promise(r => setTimeout(r, 500));

        expect(spy).toHaveBeenCalled();

        timer.dispose();
    });

    it('should dispose on signal', async () => {
        const timer = new Timer();

        const spy = jest.fn();
        const sub = timer.outputs.milliseconds.subscribe(spy);

        timer.dispose();

        await new Promise(r => setTimeout(r, 500));

        expect(spy).not.toHaveBeenCalled();
    });
});
