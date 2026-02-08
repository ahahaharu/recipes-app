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

export interface FetchRecipesParams {
  limit: number;
  skip: number;
  q?: string;
  mealType?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}
export const fetchRecipes = async ({
  limit,
  skip,
  q,
  mealType,
  sortBy,
  order,
}: FetchRecipesParams): Promise<RecipesResponse> => {
  let url = '/recipes';
  const params: FetchRecipesParams = { limit, skip, sortBy, order };

  if (q) {
    url = '/recipes/search';
    params.q = q;
  } else if (mealType && mealType !== 'All') {
    url = `/recipes/meal-type/${mealType}`;
  }
  const response = await api.get<RecipesResponse>(url, { params });
  return response.data;
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await api.get<Recipe>(`/recipes/${id}`);
  return response.data;
};

export const MEAL_TYPES = [
  'All',
  'Dinner',
  'Lunch',
  'Snack',
  'Dessert',
  'Breakfast',
  'Beverage',
];
