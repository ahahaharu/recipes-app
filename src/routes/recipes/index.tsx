import styled from '@emotion/styled';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { fetchRecipes } from '../../api/recipes';
import { RecipeCard } from '../../components/RecipeCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PageContainer = styled.div`
  padding-top: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.text.main};
  border-left: 5px solid ${(props) => props.theme.colors.primary};
  padding-left: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 2rem 0;
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
}

export const Route = createFileRoute('/recipes/')({
  component: RecipesPage,
  validateSearch: (search: Record<string, unknown>): RecipesSearch => {
    return {
      page: Number(search?.page ?? 1) || 1,
    };
  },
});

function RecipesPage() {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const LIMIT = 6;
  const skip = (page - 1) * LIMIT;
  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: ['recipes', page],
    queryFn: () => fetchRecipes({ limit: LIMIT, skip }),
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
      <Grid>
        {data?.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Grid>

      <Pagination>
        <PageButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft size={20} />
        </PageButton>

        {pagesArray.map((pageNum) => (
          <PageButton
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            $active={page === pageNum}
            disabled={isPlaceholderData}
          >
            {pageNum}
          </PageButton>
        ))}

        <PageButton
          onClick={() => handlePageChange(page + 1)}
          disabled={isPlaceholderData || page === totalPages}
        >
          <ChevronRight size={20} />
        </PageButton>
      </Pagination>
    </PageContainer>
  );
}
