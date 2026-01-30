import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { fetchRecipes } from '../../api/recipes';
import { RecipeCard } from '../../components/RecipeCard';

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

export const Route = createFileRoute('/recipes/')({
  component: RecipesPage,
});

function RecipesPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
    staleTime: 5 * 6 * 1000,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка: {error.message}</div>;

  return (
    <PageContainer>
      <Title>Все рецепты</Title>
      <Grid>
        {data?.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Grid>
    </PageContainer>
  );
}
