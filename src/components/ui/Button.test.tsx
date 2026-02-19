import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../theme';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Button Component', () => {
  it('rendersm children correctly', () => {
    renderWithTheme(<Button>Click me</Button>);

    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();

    renderWithTheme(<Button onClick={handleClick}>Action</Button>);

    const buttonElement = screen.getByText(/action/i);

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();

    renderWithTheme(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const buttonElement = screen.getByText(/disabled/i);

    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe('Button Component Snapshots', () => {
  it('matches snapshot for default state', () => {
    const { asFragment } = renderWithTheme(<Button>Submit</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for disabled state', () => {
    const { asFragment } = renderWithTheme(
      <Button disabled>Loading...</Button>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
