export class HttpClient {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  }

  async get<T>(path: string): Promise<{ data: T }> {
    try {
      const url = new URL(path, this.baseURL);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
      "Cache-Control": "max-age=3600",

          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      return { data };
    } catch (error) {
      console.error("HttpClient error:", error);
      throw error;
    }
  }
}
