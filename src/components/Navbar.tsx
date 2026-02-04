import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  gap: 20px;
  padding: 1.5rem 2rem;
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.text.light};
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  &.active {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: underline;
  }
` as typeof Link;

export default function Navbar() {
  return (
    <NavContainer>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/recipes" search={{ page: 1 }}>
        Рецепты
      </NavLink>
    </NavContainer>
  );
}
