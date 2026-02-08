import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { fetchRecipeById } from '../../api/recipes';
import { Container } from '../../components/ui/Layout';
import { LinkButton } from '../../components/ui/Button';
import { ArrowLeft, ChefHat, Flame, Star } from 'lucide-react';

const Header = styled.div`
  margin-bottom: 2rem;
`;

const BackWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text.main};
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: #fff0f0;
  color: ${(props) => props.theme.colors.primary};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  margin-bottom: 2rem;
  box-shadow: ${(props) => props.theme.shadows.md};

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;

  svg {
    color: ${(props) => props.theme.colors.primary};
  }

  span {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.text.light};
  }

  strong {
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.text.main};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.text.main};
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const IngredientItem = styled.li`
  padding: 0.75rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 1rem;
  display: flex;
  align-items: center;

  &::before {
    content: '•';
    color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StepItem = styled.div`
  display: flex;
  gap: 1rem;
`;

const StepNumber = styled.div`
  min-width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  margin-top: 2px;
`;

const StepText = styled.p`
  margin: 0;
  line-height: 1.6;
  font-size: 1.05rem;
  color: ${(props) => props.theme.colors.text.main};
`;

export const Route = createFileRoute('/recipes/$recipeId')({
  component: RecipeDetails,
});

function RecipeDetails() {
  const { recipeId } = Route.useParams();

  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => fetchRecipeById(recipeId),
    enabled: !!recipeId,
  });

  if (isLoading) return <Container>Загрузка рецепта...</Container>;
  if (isError || !recipe)
    return <Container>Ошибка при загрузке рецепта</Container>;

  return (
    <Container>
      <BackWrapper>
        <LinkButton to="/recipes" search={{ page: 1 }}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          Назад к списку
        </LinkButton>
      </BackWrapper>

      <Header>
        <TagsWrapper>
          {recipe.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsWrapper>
        <Title>{recipe.name}</Title>
      </Header>

      <HeroImage src={recipe.image} alt={recipe.name} />

      <MetaGrid>
        <MetaItem>
          <Flame size={24} />
          <span>Калории</span>
          <strong>{recipe.caloriesPerServing}</strong>
        </MetaItem>

        <MetaItem>
          <ChefHat size={24} />
          <span>Сложность</span>
          <strong>{recipe.difficulty}</strong>
        </MetaItem>

        <MetaItem>
          <Star size={24} fill="currentColor" />
          <span>Рейтинг</span>
          <strong>{recipe.rating}</strong>
        </MetaItem>
      </MetaGrid>

      <ContentGrid>
        <div>
          <SectionTitle>Ингредиенты</SectionTitle>
          <IngredientsList>
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientItem key={index}>{ingredient}</IngredientItem>
            ))}
          </IngredientsList>
        </div>

        <div>
          <SectionTitle>Инструкция</SectionTitle>
          <StepsList>
            {recipe.instructions.map((step, index) => (
              <StepItem key={index}>
                <StepNumber>{index + 1}</StepNumber>
                <StepText>{step}</StepText>
              </StepItem>
            ))}
          </StepsList>
        </div>
      </ContentGrid>
    </Container>
  );
}
