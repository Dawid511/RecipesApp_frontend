import {API_URL} from "../../../config";
import ky from "ky";
import {CommentFormValues} from "../../../types/CommentFormValues";
import {CommentType} from "../../../types/CommentType";

export const createComment = async (data: CommentFormValues) => {
    return ky.post(`${API_URL}/comment`, {json: data, credentials: "include"}).json <CommentType>();
}