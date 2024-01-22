import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout";
import {RecipeList} from "./recipe/RecipeList";
import {RecipeForm} from "./recipe/RecipeForm";
import {ErrorPage} from "./error/ErrorPage";
import {LoginPage} from "./login/LoginPage";
import {useIsLogged} from "../hooks/useIsLogged";
import {RecipeInformation} from "./recipe/RecipeInformation";


const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                index: true, // Ustawia default sciezke
                element: <Navigate to="/login" replace />
            },
            {
                path: '*',
                element: <Navigate to='/login' replace/>
            }
        ]

    }
];
const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/recipe',
                element: <RecipeList/>
            },
            {
                index: true, // Ustawia default sciezke
                element: <Navigate to="/recipe" replace />
            },
            {
                path: '/recipe/new',
                element: <RecipeForm/>
            },
            {
                path: '/recipe/me',
                element: <RecipeList/>
            },
            {
                path: '/recipe/fav',
                element: <RecipeList/>
            },
            {
                path: '/recipe/:id',
                element: <RecipeInformation/>
            },
            {
                path: '*',
                element: <ErrorPage/>
            }
        ]
    }
]

export const Routing = () => {
    const isLogged = useIsLogged();
    const routes = isLogged ? privateRoutes : publicRoutes;
    return useRoutes(routes);
}