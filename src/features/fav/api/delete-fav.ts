import {API_URL} from "../../../config";
import ky from "ky";
import {FavType} from "../../../types/FavType";

export const deleteFav = async (data: FavType) => {
    return ky.delete(`${API_URL}/fav`, {json: data, credentials: "include"}).json <FavType>();
}