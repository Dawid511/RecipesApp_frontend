import ky from "ky";
import { API_URL } from "../../../config";
import {RecipeType} from "../../../types/RecipeType";

export const deleteRecipe = async (id: number) => {
    return ky.delete(`${API_URL}/recipe/${id}`, { credentials: "include" }).json<RecipeType[]>();
};
