import React, {
    memo,
    Suspense,
    useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader/PageLoader';
import { AppRoutesProps, routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);

// const AppRouter = () => {
//     const isAuth = useSelector(getUserAuthData);
//
//     const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
//         // если в роуте authOnly true а пользователь в стейте не авторизован,
//         // то удаляем данный маршрут
//         if (route.authOnly && !isAuth) {
//             return false;
//         }
//
//         return true;
//     }), [isAuth]);
//
//     return (
//         <Routes>
//             {routes.map(({ element, path }) => (
//                 <Route
//                     key={path}
//                     path={path}
//                     element={(
//                         <Suspense fallback={<PageLoader />}>
//                             <div className="page-wrapper">
//                                 {element}
//                             </div>
//                         </Suspense>
//                     )}
//                 />
//             ))}
//         </Routes>
//     );
// };
