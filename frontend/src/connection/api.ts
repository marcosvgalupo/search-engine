import axios, { AxiosResponse } from 'axios';

const apiURL: string = 'http://localhost:8080/v1/search?query=';

async function fetchApi(q: string): Promise<any> {
    try {
        const response: AxiosResponse = await axios.get(apiURL + q);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { fetchApi };
