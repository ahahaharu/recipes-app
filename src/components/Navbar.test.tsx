import { ThemeProvider } from '@emotion/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { theme } from '../theme';
import * as AuthContextModule from '../context/AuthContext';
import Navbar from './Navbar';

const mockNavigate = vi.fn();
const mockLogout = vi.fn();

interface mockLink {
  children: React.ReactNode;
  to: string;
  className?: string;
}

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, className }: mockLink) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
  useNavigate: () => mockNavigate,
}));

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('NavBar Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders username and Logout button for authenticated users', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      isAuth: true,
      user: {
        id: 1,
        username: 'emilys',
        email: 'test@test.com',
        firstName: 'Emily',
        lastName: 'Smith',
        image: 'avatar.png',
        accessToken: 'token',
      },
      login: vi.fn(),
      logout: mockLogout,
    });

    renderWithTheme(<Navbar />);

    expect(screen.getByText('emilys')).toBeInTheDocument();
    expect(screen.getByText(/выйти/i)).toBeInTheDocument();
  });

  it('calls logout and redirects to /login when Logout is clicked', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      isAuth: true,
      user: {
        id: 1,
        username: 'emilys',
        email: 'test@test.com',
        firstName: 'Emily',
        lastName: 'Smith',
        image: 'avatar.png',
        accessToken: 'token',
      },
      login: vi.fn(),
      logout: mockLogout,
    });

    renderWithTheme(<Navbar />);

    const logoutButton = screen.getByRole('button', { name: /выйти/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/login' });
  });
});

describe('Navbar Component Snapshots', () => {
  it('matches snapshot for unauthenticated user (Guest)', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      isAuth: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    const { asFragment } = renderWithTheme(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for authenticated user (Logged In)', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      isAuth: true,
      user: {
        id: 1,
        username: 'emilys',
        email: 'test@test.com',
        firstName: 'Emily',
        lastName: 'Smith',
        image: 'avatar.png',
        accessToken: 'token',
      },
      login: vi.fn(),
      logout: vi.fn(),
    });

    const { asFragment } = renderWithTheme(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
