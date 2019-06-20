import * as React from 'react';

function useAPI() {
    async function fetchData(endpoint: string, method: string = 'GET') {
        if (!endpoint) {
            throw new Error(`${endpoint} is not a valid API endpoint`);
        }

        const res = await fetch(`/api/${endpoint}`, {
            method,
            mode: 'cors'
        });
        const { data } = await res.json();

        return data;
    }

    return fetchData;
}

export default useAPI;
