import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

const buttonStyles = (
  theme: Theme,
  variant: 'primary' | 'outline' = 'primary'
) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  transition:
    opacity 0.2s,
    background-color 0.2s;
  border: 1px solid transparent;

  ${variant === 'primary' &&
  `
    /* Теперь TS знает, что внутри theme есть colors и text! */
    background-color: ${theme.colors.text.main};
    color: white;
    &:hover { opacity: 0.9; }
  `}

  ${variant === 'outline' &&
  `
    background-color: transparent;
    border-color: ${theme.colors.border};
    color: ${theme.colors.text.main};
    &:hover { border-color: ${theme.colors.primary}; color: ${theme.colors.primary}; }
  `}
`;

export const Button = styled.button<{ variant?: 'primary' | 'outline' }>`
  ${(props) => buttonStyles(props.theme, props.variant)}
`;

export const LinkButton = styled(Link)<{ variant?: 'primary' | 'outline' }>`
  ${(props) => buttonStyles(props.theme, props.variant)}
` as typeof Link;
