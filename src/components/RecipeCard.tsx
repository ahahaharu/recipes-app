import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';
import type { Recipe } from '../api/recipes';
import { Flame, Star } from 'lucide-react';

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
` as typeof Link;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

const RecipeName = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  color: ${(props) => props.theme.colors.text.main};
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.light};
  margin-top: auto;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  / svg {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: #fff0f0;
  color: ${(props) => props.theme.colors.primary};
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <CardContainer
      to="/recipes/$recipeId"
      params={{ recipeId: recipe.id.toString() }}
    >
      <Image src={recipe.image} alt={recipe.name} loading="lazy" />
      <Content>
        <TagsWrapper>
          {recipe.tags.slice(0, 2).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsWrapper>
        <RecipeName>{recipe.name}</RecipeName>
        <MetaInfo>
          <MetaItem>
            <Star size={16} fill="gold" stroke="gold" />{' '}
            <span>{recipe.rating}</span>
          </MetaItem>

          <MetaItem>
            <Flame size={16} fill="orange" stroke="orange" />
            <span>{recipe.caloriesPerServing} ккал</span>
          </MetaItem>
        </MetaInfo>
      </Content>
    </CardContainer>
  );
};
