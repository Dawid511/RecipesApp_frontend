import React, { useState, useEffect } from "react";
import {SimpleGrid, Pagination, Center} from "@mantine/core";
import { RecipeType } from "../../types/RecipeType";
import { RecipeItem } from "./RecipeItem";
import { listRecipe } from "./api/recipe";

const ITEMS_PER_PAGE = 6;

export const RecipeList = () => {
    const [data, setData] = useState<RecipeType[]>([]);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        listRecipe().then((response) => setData(response));
    }, []);

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
