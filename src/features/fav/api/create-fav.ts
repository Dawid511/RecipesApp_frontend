import {API_URL} from "../../../config";
import ky from "ky";
import {FavType} from "../../../types/FavType";

export const createFav = async (data: FavType) => {
    return ky.post(`${API_URL}/fav`, {json: data, credentials: "include"}).json <FavType>();
}