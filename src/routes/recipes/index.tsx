import styled from '@emotion/styled';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { fetchRecipes } from '../../api/recipes';
import { RecipeCard } from '../../components/RecipeCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import RecipeFilters from '../../components/RecipeFilters';

const PageContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text.main};
  border-left: 5px solid ${(props) => props.theme.colors.primary};
  padding-left: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0 0 1.5rem 0;
`;

interface PageButtonProps {
  $active?: boolean;
}

const PageButton = styled.button<PageButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    props.$active ? props.theme.colors.primary : 'white'};

  color: ${(props) => (props.$active ? 'white' : props.theme.colors.text.main)};

  border: 1px solid
    ${(props) =>
      props.$active ? props.theme.colors.primary : props.theme.colors.border};

  width: 40px;
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => (props.$active ? 'white' : props.theme.colors.primary)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f5f5f5;
    border-color: #ddd;
  }
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
  const pagesArray = Array.from(
    {
      length: totalPages,
    },
    (_, i) => i + 1
  );

  return (
    <PageContainer>
      <Title>Все рецепты</Title>

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
      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => handlePageChange(searchParams.page - 1)}
            disabled={searchParams.page === 1}
          >
            <ChevronLeft size={20} />
          </PageButton>

          {pagesArray.map((pageNum) => (
            <PageButton
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              $active={searchParams.page === pageNum}
              disabled={isPlaceholderData}
            >
              {pageNum}
            </PageButton>
          ))}

          <PageButton
            onClick={() => handlePageChange(searchParams.page + 1)}
            disabled={isPlaceholderData || searchParams.page === totalPages}
          >
            <ChevronRight size={20} />
          </PageButton>
        </Pagination>
      )}
    </PageContainer>
  );
}
