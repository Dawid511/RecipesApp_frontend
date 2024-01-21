import ky from "ky";
import { API_URL } from "../../../config";
import { CommentType } from "../../../types/CommentType";

export const listCommentsByRecipeId = async (recipeId: number) => {
    return ky.get(`${API_URL}/comments?recipeId=${recipeId}`, { credentials: "include" }).json<CommentType[]>();
};
