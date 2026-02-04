import { api } from './instance';

export interface Recipe {
  id: number;
  name: string;
  image: string;
  rating: number;
  caloriesPerServing: number;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  cuisine: string;
}

export interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

interface FetchRecipesParams {
  limit: number;
  skip: number;
}

export const fetchRecipes = async ({
  limit,
  skip,
}: FetchRecipesParams): Promise<RecipesResponse> => {
  const response = await api.get<RecipesResponse>('/recipes', {
    params: {
      limit,
      skip,
    },
  });
  return response.data;
};
