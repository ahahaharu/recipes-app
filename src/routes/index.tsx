import { createFileRoute, Link } from '@tanstack/react-router';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../api/recipes';
import { RecipeCard } from '../components/RecipeCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SiteTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  color: ${(props) => props.theme.colors.text.main};
  letter-spacing: -1px;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text.light};
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  align-self: flex-start;
  color: ${(props) => props.theme.colors.text.main};
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 12px 32px;
  background-color: ${(props) => props.theme.colors.text.main};
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 6px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
` as typeof Link;

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: topRecipesData } = useQuery({
    queryKey: ['recipes', 'topByRating'],
    queryFn: () =>
      fetchRecipes({
        limit: 3,
        skip: 0,
        sortBy: 'rating',
        order: 'desc',
      }),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <Container>
      <Header>
        <SiteTitle>Recipes App</SiteTitle>
        <Description>
          Коллекция лучших кулинарных идей со всего мира. Просто, вкусно и
          доступно каждому.
        </Description>
      </Header>

      <SectionTitle>Лучшие рецепты</SectionTitle>

      <Grid>
        {topRecipesData?.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Grid>

      <Button to="/recipes" search={{ page: 1 }}>
        Перейти ко всем рецептам
      </Button>
    </Container>
  );
}
