import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeType } from "../../types/RecipeType";
import { listRecipe } from "./api/recipe";
import {Divider, Rating} from "@mantine/core";

export const RecipeInformation: React.FC = () => {
    const [data, setData] = useState<RecipeType[]>([]);
    const [value, setValue] = useState(0);

    //Używamy hooka useParams do pobrania wartości z dynamicznej ścieżki
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (data.length === 0) {
            listRecipe().then((response) => {
                setData(response);
            });
        }
    }, [data]);

    const selectedRecipe = data.find((recipe) => recipe.id === (id ? +id : undefined));

    if (!selectedRecipe) {
        return <div>Recipe not found.</div>;
    }
    const dividerStyle = {
        label: {
            fontSize: "20px"
        }
    };
    return (
        <div style={{ width: '100%' }}>
            <h2>{selectedRecipe.title}<Rating value={value} onChange={setValue}/></h2>

            <Divider size="md" label="Description" labelPosition="left" styles={dividerStyle}/>
            <p>{selectedRecipe.description}</p>
            <Divider size="md" label="Ingredients" labelPosition="left" styles={dividerStyle}/>
            <p>{selectedRecipe.ingredients}</p>
            <Divider size="md" label="Steps" labelPosition="left" styles={dividerStyle}/>
            <p>{selectedRecipe.steps}</p>
            <p>Difficulty: {selectedRecipe.difficulty}</p>
            <p>Time to Make: {selectedRecipe.timeToMake} minutes</p>
            <p>Author ID: {selectedRecipe.authorId}</p>
        </div>
    );
};
