import styled from '@emotion/styled';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { Button } from './ui/Button';

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
  display: flex;
  justify-content: space-between;
`;

const LinksGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  font-weight: 500;
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
  const { user, isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <NavContainer>
      <LinksGroup>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/recipes" search={{ page: 1 }}>
          Рецепты
        </NavLink>
      </LinksGroup>

      {isAuth ? (
        <UserInfo>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {user?.image ? (
              <img
                src={user.image}
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: '50%' }}
              ></img>
            ) : (
              <User size={20} />
            )}
            <span>{user?.username}</span>
          </div>

          <Button
            onClick={handleLogout}
            style={{
              padding: '6px 12px',
              fontSize: '0.8rem',
              marginLeft: '10px',
            }}
          >
            <LogOut size={14} style={{ marginRight: 6 }} />
            Выйти
          </Button>
        </UserInfo>
      ) : (
        <LinksGroup>
          <NavLink to="/login">Войти</NavLink>
        </LinksGroup>
      )}
    </NavContainer>
  );
}
