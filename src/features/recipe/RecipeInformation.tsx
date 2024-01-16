import {useEffect, useState} from "react";
import {RecipeType} from "../../types/RecipeType";
import {listRecipe} from "./api/recipe";

export const RecipeInformation = () => {
    const [data, setData] = useState<RecipeType[]>([]);

    useEffect(() => {
        listRecipe().then((response) => setData(response));
    }, [])


    return (
        <div style={{width: '100%'}}>

        </div>
    )
}

// {/*{data.map((item) => <RecipeItem key={item.id} item={item}/>)}*/}