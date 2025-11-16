import * as nodeFetch from "node-fetch"

export const getLoginToken = async (username, password) => {
    // Simulate an API call to get login tokens
   const response = await nodeFetch.default('http://localhost:2221/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch login tokens: ${response.statusText}`);
    }

    const data = await response.json();
    return data.token; // Assuming the API returns a JSON object with a 'token' field
}