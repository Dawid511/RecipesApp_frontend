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
            listRecipe(categoryId).then((response: RecipeType[]) => setData(response));

    }, [categoryId]);

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
                {paginatedData.map((item,index) => (
                    <RecipeItem key={item.id} item={item} imageSrc={"./image-from-rawpixel-id-449412-jpeg.jpg"}  data-cy={`recipeId-${index}`}/>
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
