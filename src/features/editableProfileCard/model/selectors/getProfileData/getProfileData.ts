import { StateSchema } from '@/app/providers/StoreProvider';

// ставим ? тк может быть поле = undefined
// и приложение упадет с ошибкой, тк не можем запросить
export const getProfileData = (state: StateSchema) => state.profile?.data;
