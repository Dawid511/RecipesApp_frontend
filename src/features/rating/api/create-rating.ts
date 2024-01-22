import {API_URL} from "../../../config";
import ky from "ky";
import {RatingFormValues} from "../../../types/RatingFormValues";
import {RatingType} from "../../../types/RatingType";
export const createRating = async (data: RatingFormValues) => {
    return ky.post(`${API_URL}/rating`, {json: data, credentials: "include"}).json <RatingType>();
}