import { PlantApiResponse } from '@/types/plant.types';

export class PlantsService {
  private readonly apiUrl = process.env.TREFLE_API_KEY;

  async getPlants(): Promise<PlantApiResponse> {
    try {
      const response = await fetch(
        `https://trefle.io/api/v1/plants?token=${this.apiUrl}`,
        {
          cache: 'force-cache',
          next: { tags: ['plants'] }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as PlantApiResponse;
    } catch (error) {
      console.error('Error fetching plants:', error);
      throw error;
    }
  }
}
