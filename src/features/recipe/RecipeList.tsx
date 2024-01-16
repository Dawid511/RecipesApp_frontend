import {RecipeType} from "../../types/RecipeType";
import {RecipeItem} from "./RecipeItem";
import {SimpleGrid} from "@mantine/core";
import {useEffect, useState} from "react";
import {listRecipe} from "./api/recipe";


export const RecipeList = () => {
    const [data, setData] = useState<RecipeType[]>([]);

    useEffect(() => {
        listRecipe().then((response) => setData(response));
    }, [])
    return (
        <div style={{width: '100%'}}>
            <SimpleGrid cols={{base: 1, sm: 2, lg: 3}}>
                {data.map((item) => <RecipeItem key={item.id} item={item}/>)}
            </SimpleGrid>
        </div>
    )
}

