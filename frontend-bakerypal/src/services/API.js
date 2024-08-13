const API_BASE_URL = "http://localhost:8080/"

export const fetchData = async (endpoint) => {
    const full_path = new URL(endpoint, API_BASE_URL).href;
    const res = await fetch(full_path);
    if (res.ok) {
        const obj = await res.json();
        return obj;
    } else {
        return res.status;
    }
}

export const postData = async (endpoint, body, requestType = "POST") => {
    const fullPath = new URL(endpoint, API_BASE_URL).href;

    try {
        const response = await fetch(fullPath, {
            method: requestType,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
            },
            body: JSON.stringify(body),
        });

        const contentType = response.headers.get('Content-Type');
        let data;

        try {
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }
        } catch (e) {
            // If JSON parsing fails, default to an empty object
            data = {};
        }
        return { status: response.status, data };
    } catch (error) {
        console.error('Error during fetch:', error);
        return { status: 500, data: 'Internal Server Error' };
    }
};