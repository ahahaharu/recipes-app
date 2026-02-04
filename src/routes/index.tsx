import { createFileRoute } from '@tanstack/react-router';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../api/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Container, Grid, SectionTitle } from '../components/ui/Layout';
import { LinkButton } from '../components/ui/Button';

const HomeContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;
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
    <HomeContainer>
      <Header>
        <SiteTitle>Recipes App</SiteTitle>
        <Description>
          Коллекция лучших кулинарных идей со всего мира. Просто, вкусно и
          доступно каждому.
        </Description>
      </Header>

      <SectionTitle style={{ alignSelf: 'flex-start' }}>
        Лучшие рецепты
      </SectionTitle>

      <Grid style={{ marginBottom: '1rem' }}>
        {topRecipesData?.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Grid>

      <LinkButton to="/recipes" search={{ page: 1 }}>
        Перейти ко всем рецептам
      </LinkButton>
    </HomeContainer>
  );
}
