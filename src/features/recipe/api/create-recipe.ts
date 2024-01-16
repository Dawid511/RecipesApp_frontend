import {RecipeFormValues} from "../../../types/RecipeFormValues";
import {RecipeType} from "../../../types/RecipeType";
import {API_URL} from "../../../config";
import ky from "ky";

export const createRecipe = async (data: RecipeFormValues) => {
    return ky.post(`${API_URL}/recipe`, {json: data, credentials: "include"}).json <RecipeType>();
}