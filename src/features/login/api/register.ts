import {API_URL} from "../../../config";

export const register = async (firstname: string, lastname: string, password: string, email: string) => {
    const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
            ContentType: 'application/json',
            Authorization: 'Basic ' + window.btoa(firstname + ":" + lastname + ":" + password + ":" + email),
        },
        credentials: 'include'
    });

    if (response.status !== 200) throw new Error('Registration failed');
    return await response.text();
}