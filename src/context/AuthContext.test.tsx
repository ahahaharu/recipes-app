import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';
import { User } from '../api/auth';

const mockUser: User = {
  id: 1,
  username: 'emilys',
  email: 'emilys@test.com',
  firstName: 'Emily',
  lastName: 'Smith',
  image: 'avatar.png',
  accessToken: 'mock-access-token',
};

describe('useAuth Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.resetAllMocks();
  });

  it('by default the user is not authorized', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.isAuth).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('successfully authorizes the user via the login function', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuth).toBe(true);

    expect(window.localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
    expect(window.localStorage.getItem('token')).toBe('mock-access-token');
  });

  it('successfully logs out the user via the logout function', () => {
    window.localStorage.setItem('user', JSON.stringify(mockUser));
    window.localStorage.setItem('token', 'mock-access-token');
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuth).toBe(false);

    expect(window.localStorage.getItem('user')).toBeNull();
    expect(window.localStorage.getItem('token')).toBeNull();
  });
});
