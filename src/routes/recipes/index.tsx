import styled from '@emotion/styled';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { fetchRecipes } from '../../api/recipes';
import { RecipeCard } from '../../components/RecipeCard';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import RecipeFilters from '../../components/RecipeFilters';
import { Container, Grid, SectionTitle } from '../../components/ui/Layout';
import { Pagination } from '../../components/Pagination';

const PageLayout = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
`;

interface RecipesSearch {
  page: number;
  q?: string;
  mealType?: string;
  sortBy?: string;
}

export const Route = createFileRoute('/recipes/')({
  component: RecipesPage,
  validateSearch: (search: Record<string, unknown>): RecipesSearch => {
    return {
      page: Number(search?.page ?? 1) || 1,
      q: (search?.q as string) || undefined,
      mealType: (search?.mealType as string) || undefined,
      sortBy: (search?.sortBy as string) || undefined,
    };
  },
});

function RecipesPage() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [localSearch, setLocalSearch] = useState(searchParams.q || '');
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    if (debouncedSearch !== searchParams.q) {
      navigate({
        search: (old) => ({
          ...old,
          q: debouncedSearch || undefined,
          page: 1,
          mealType: undefined,
        }),
      });
    }
  }, [debouncedSearch, navigate, searchParams.q]);

  const handleMealTypeChange = (type: string) => {
    setLocalSearch('');
    navigate({
      search: (old) => ({
        ...old,
        mealType: type === 'All' ? undefined : type,
        q: undefined,
        page: 1,
      }),
    });
  };

  const handleSortChange = (sort: string) => {
    navigate({
      search: (old) => ({
        ...old,
        sortBy: sort || undefined,
        page: 1,
      }),
    });
  };

  const LIMIT = 6;
  const skip = (searchParams.page - 1) * LIMIT;

  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: [
      'recipes',
      searchParams.page,
      searchParams.q,
      searchParams.mealType,
      searchParams.sortBy,
    ],
    queryFn: () =>
      fetchRecipes({
        limit: LIMIT,
        skip,
        q: searchParams.q,
        mealType: searchParams.mealType,
        sortBy: searchParams.sortBy,
        order: 'desc',
      }),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (old) => ({ ...old, page: newPage }),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка: {error.message}</div>;

  const totalPages = Math.ceil((data?.total || 0) / LIMIT);

  return (
    <PageLayout>
      <SectionTitle>Все рецепты</SectionTitle>

      <RecipeFilters
        searchQuery={localSearch}
        onSearchChange={setLocalSearch}
        mealType={searchParams.mealType || 'All'}
        onMealTypeChange={handleMealTypeChange}
        sortBy={searchParams.sortBy || ''}
        onSortChange={handleSortChange}
      />
      <Grid>
        {data?.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Grid>
      <Pagination
        currentPage={searchParams.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isPlaceholderData}
      />
    </PageLayout>
  );
}
