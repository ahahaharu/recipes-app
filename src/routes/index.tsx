import styled from '@emotion/styled';
import { createFileRoute } from '@tanstack/react-router';

const Title = styled.h1`
  margin-top: 3rem;
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const Route = createFileRoute('/')({
  loader: () => {
    return 'Hello World';
  },
  component: Index,
});

function Index() {
  return <Title>Recipes App</Title>;
}
