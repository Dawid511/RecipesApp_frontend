import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout";
import {RecipeList} from "./recipe/RecipeList";
import {RecipeForm} from "./recipe/RecipeForm";
import {ErrorPage} from "./error/ErrorPage";
import {LoginPage} from "./login/LoginPage";
import {useIsLogged} from "../hooks/useIsLogged";


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
                path: '/recipe/new',
                element: <RecipeForm/>
            },
            {
                path: '/recipe/:id',
                element: <RecipeForm/>
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