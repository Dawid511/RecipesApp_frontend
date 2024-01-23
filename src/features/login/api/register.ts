import {API_URL} from "../../../config";

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
    console.log("firstName" + firstName)
    console.log("lastName" + lastName)
    console.log("password" + password)
    console.log("email" + email)
    const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Corrected key for content type
        },
        body: JSON.stringify({
            firstName, // Assuming your API expects these field names
            lastName,
            email,
            password,
        }),
        credentials: 'include'
    });

    if (response.status !== 201) { // Assuming 201 is the expected status for a successful registration
        throw new Error('Registration failed');
    }
    return await response.json();
}
