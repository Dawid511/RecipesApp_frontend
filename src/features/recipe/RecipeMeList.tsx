import React, {useEffect, useState} from "react";
import {Center, Pagination, SimpleGrid} from "@mantine/core";
import {RecipeType} from "../../types/RecipeType";
import {RecipeItem} from "./RecipeItem";
import {listRecipeById} from "./api/recipe";
import {listMe} from "../login/api/get-me";
import {UserType} from "../../types/UserType";
import {useLocation} from "react-router-dom";

const ITEMS_PER_PAGE = 9;

export const RecipeMeList = () => {
    const [data, setData] = useState<RecipeType[]>([]);
    const [activePage, setActivePage] = useState(1);
    const location = useLocation();

    useEffect(() => {
        listMe().then((response: UserType) => {
            if (!response || response.id === undefined) {
                throw new Error('userData is required but was not provided');
            }
            return listRecipeById(response.id);
        })
            .then((response: RecipeType[]) => {
                setData(response);
            })
            .catch((error) => {
                console.error('An error occurred while fetching data:', error);
            });
    }, [location]);

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
                    <RecipeItem key={item.id} item={item} imageSrc={"http://localhost:3000/image-from-rawpixel-id-449412-jpeg.jpg"}/>
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
