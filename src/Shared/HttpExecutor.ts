export class HttpExecutor {
    private handleResponse(response: Response) {
        if (!response.ok)
            throw response;

        return response;
    }

    async get<T>(url: string): Promise<T> {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        try {
            return await fetch(url, options)
                .then(this.handleResponse)
                .then(response => (response.json() as Promise<T>));
        } catch (err) {
            console.error(`GET ${url} failed:`, err);
            throw err;
        }
    }
}
