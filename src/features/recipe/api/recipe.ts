import ky from "ky";
import {API_URL} from "../../../config";
import {RecipeType} from "../../../types/RecipeType";

export const listRecipe = async (categoryId?: number) => {
    const params = new URLSearchParams();

    if (categoryId) {
        params.append('categoryId', categoryId.toString());
    }
    return ky.get(`${API_URL}/recipe`, { searchParams: params, credentials: "include"}).json<RecipeType[]>();
}

export const listRecipeById = async (userId?: number) => {
    const params = new URLSearchParams();

    if (userId) {
        params.append('authorId', userId.toString()); // upewnic sie czy tak mozna wizualnie
    }
    return ky.get(`${API_URL}/recipe/user`, { searchParams: params, credentials: "include"}).json<RecipeType[]>();
}

export const listFavRecipeById = async (userId: number) => {
    const params = new URLSearchParams();

    if (userId) {
        params.append('userId', userId.toString());
    }
    return ky.get(`${API_URL}/recipe/fav`, { searchParams: params, credentials: "include"}).json<RecipeType[]>();
}
