import ky from "ky";
import {API_URL} from "../../../config";
import {RecipeType} from "../../../types/RecipeType";

export const listRecipe = async () => {
    return ky.get(`${API_URL}/recipe`, {credentials: "include"}).json<RecipeType[]>();
}