import axios, { AxiosResponse } from 'axios';

const apiURL: string = 'http://localhost:8080/v1/search?query=';

async function fetchApi(q: string, page: number): Promise<any> {
    const p: string = '&page=' + page;
    try {
        const response: AxiosResponse = await axios.get(apiURL + q + p);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { fetchApi };
