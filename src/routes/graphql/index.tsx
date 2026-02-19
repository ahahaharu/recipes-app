import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import styled from '@emotion/styled';
import { createFileRoute } from '@tanstack/react-router';
import { Container, Grid } from '../../components/ui/Layout';

interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  image: string;
}

interface GetCharactersData {
  characters: {
    results: Character[];
  };
}

interface GetCharactersVars {
  page?: number;
}

const CharacterCard = styled.div`
  background: white;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: transform 0.2s;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Name = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.colors.text.main};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.light};
`;

const StatusDot = styled.span<{ $status: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => {
    if (props.$status === 'Alive') return '#55cc44';
    if (props.$status === 'Dead') return '#d63d2e';
    return '#9e9e9e';
  }};
`;

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters(page: 1) {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

export const Route = createFileRoute('/graphql/')({
  component: GraphQLPage,
});

function GraphQLPage() {
  const { loading, error, data } = useQuery<
    GetCharactersData,
    GetCharactersVars
  >(GET_CHARACTERS);

  if (loading) return <Container>Загрузка данных...</Container>;
  if (error) return <Container>Ошибка: {error.message}</Container>;

  if (!data) return <Container>Нет данных</Container>;

  return (
    <Container>
      <Grid>
        {data.characters.results.map((char) => (
          <CharacterCard key={char.id}>
            <Image src={char.image} alt={char.name} loading="lazy" />
            <Content>
              <Name>{char.name}</Name>
              <Meta>
                <StatusDot $status={char.status} />
                {char.status} - {char.species}
              </Meta>
            </Content>
          </CharacterCard>
        ))}
      </Grid>
    </Container>
  );
}
