import React, {useState, useEffect, useContext} from "react";
import {SimpleGrid, Pagination, Center} from "@mantine/core";
import { RecipeType } from "../../types/RecipeType";
import { RecipeItem } from "./RecipeItem";
import {listRecipe, listRecipeById} from "./api/recipe";
import {CategoryContext} from "../categories/CategoryContext";
import {useLocation, useParams} from "react-router-dom";
import { listMe } from "../login/api/get-me";
import {UserType} from "../../types/UserType";

const ITEMS_PER_PAGE = 9;

export const RecipeList = () => {
    const [data, setData] = useState<RecipeType[]>([]);
    const [userData, setUserData] = useState<UserType>();
    const [activePage, setActivePage] = useState(1);
    const { categoryId } = useContext(CategoryContext);
    const location = useLocation();
    const isMyRecipes = location.pathname.endsWith('/me');
    const isFav = location.pathname.endsWith('/fav');

    useEffect(() => {
        if (isMyRecipes) {
            listMe().then((response: UserType) => setUserData(response));
            listRecipeById(userData?.id).then((response: RecipeType[]) => setData(response));
        } else {
            listRecipe(categoryId).then((response: RecipeType[]) => setData(response));
        }
    }, [isMyRecipes, categoryId, userData?.id]);

    const paginatedData = data.slice(
        (activePage - 1) * ITEMS_PER_PAGE,
        activePage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setActivePage(page);
    };

    return (
        <div style={{ width: "100%" }}>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                {paginatedData.map((item) => (
                    <RecipeItem key={item.id} item={item} />
                ))}
            </SimpleGrid>
            <Center>
            <Pagination
                total={Math.ceil(data.length / ITEMS_PER_PAGE)}
                value={activePage}
                onChange={handlePageChange}
                mt="sm"
                color="rgba(0, 0, 0, 1)"
                radius="xl"
            />
            </Center>
        </div>
    );
};
