export default class Api {
    private baseUrl: string | undefined;
    public isLoading: boolean = false;

    initApi(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async fetch<T>(path: string = ''): Promise<T> {
        try {
            this.isLoading = true;
            const response = await fetch(`${this.baseUrl}${path}`);

            return response.json();
        } catch (err) {
            throw err;
        } finally {
            this.isLoading = false;
        }
    }
}
