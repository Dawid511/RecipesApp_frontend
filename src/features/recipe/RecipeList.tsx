import React, {useContext, useEffect, useState} from "react";
import {Center, Pagination, SimpleGrid} from "@mantine/core";
import {RecipeType} from "../../types/RecipeType";
import {RecipeItem} from "./RecipeItem";
import {listFavRecipeById, listRecipe, listRecipeById} from "./api/recipe";
import {CategoryContext} from "../categories/CategoryContext";
import {useLocation} from "react-router-dom";
import {listMe} from "../login/api/get-me";
import {UserType} from "../../types/UserType";

const ITEMS_PER_PAGE = 9;

export const RecipeList = () => {
    const [data, setData] = useState<RecipeType[]>([]);
    const [userData, setUserData] = useState<UserType>();
    const [activePage, setActivePage] = useState(1);
    const { categoryId } = useContext(CategoryContext);
    const location = useLocation();
    const isFav = location.pathname.endsWith('/fav');
    const isMyRecipes = location.pathname.endsWith('/me');

    useEffect(() => {
        listMe().then((response: UserType) => setUserData(response));
        if (isMyRecipes) {
            listRecipeById(userData?.id).then((response: RecipeType[]) => setData(response));
        }
        else if (isFav) {
            listFavRecipeById(userData?.id).then((response: RecipeType[]) => setData(response));
        }else
        {
            listRecipe(categoryId).then((response: RecipeType[]) => setData(response));
        }
    }, [isMyRecipes, isFav, categoryId]);

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
