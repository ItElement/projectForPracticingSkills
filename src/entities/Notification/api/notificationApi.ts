// чтобы подключались эндпоинты лениво и не попадали в главный чанк
import { rtkApi } from 'shared/api/rtkApi';
import { Notification } from '../model/types/notifications';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // возвращает первое в джинерике, второе принимает
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
