import { StateSchema } from 'app/providers/StoreProvider';
import { getCounter } from './getCounter';

describe('getCounter', () => {
    test('should return counter value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        // данное приведение только в тестах(тк ругается на DeepPartial)
        // возвращаем нужный участок стейта
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});
