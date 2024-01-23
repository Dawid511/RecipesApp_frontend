import ky from "ky";
import { API_URL } from "../../../config";
import { CommentType } from "../../../types/CommentType";

export const deleteComment = async (id: number) => {
    return ky.delete(`${API_URL}/comment/${id}`, { credentials: "include" }).json<CommentType[]>();
};
