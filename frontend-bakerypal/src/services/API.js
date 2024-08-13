const API_BASE_URL = "http://localhost:8080/";

export const fetchData = async (endpoint) => {
    const fullPath = new URL(endpoint, API_BASE_URL).href;
    const response = await fetch(fullPath);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { status: response.status, statusText: response.statusText };
    }
};

export const postData = async (endpoint, body, requestType = "POST") => {
    const fullPath = new URL(endpoint, API_BASE_URL).href;
    const response = await fetch(fullPath, {
        method: requestType,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
        data = `Error parsing response: ${e.message}`;
    }

    return { status: response.status, data };
};


