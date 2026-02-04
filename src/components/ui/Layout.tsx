import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text.main};
  border-left: 5px solid ${(props) => props.theme.colors.primary};
  padding-left: 1rem;
  margin-bottom: 1rem;
`;
