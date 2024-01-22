import ky from "ky";
import {API_URL} from "../../../config";
import {UserType} from "../../../types/UserType";

export const getUser = async (userId?: number) => {
    const params = new URLSearchParams();

    if (userId) {
        params.append('userId', userId.toString());
    }
    return ky.get(`${API_URL}/user`, { searchParams: params, credentials: "include"}).json<UserType[]>();
}