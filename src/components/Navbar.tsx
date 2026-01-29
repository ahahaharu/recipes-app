import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

const NavContainer = styled.nav`
  display: flex;
  gap: 20px;
  padding: 1.5rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #555;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #ff6b6b;
  }

  &.active {
    color: #ff6b6b;
    text-decoration: underline;
  }
`;

export default function Navbar() {
  return (
    <NavContainer>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/recipes">Рецепты</NavLink>
    </NavContainer>
  );
}
