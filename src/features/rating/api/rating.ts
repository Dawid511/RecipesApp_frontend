import ky from "ky";
import { API_URL } from "../../../config";

export const ratingByRecipeId = async (recipeId: number) => {
    return ky.get(`${API_URL}/rating?recipeId=${recipeId}`, { credentials: "include" }).json<number>();
};
