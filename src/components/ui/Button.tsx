import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

const buttonStyles = (theme: Theme) => css`
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

  background-color: ${theme.colors.primary};
  color: white;
  &:hover {
    opacity: 0.9;
  }
`;

export const Button = styled.button`
  ${(props) => buttonStyles(props.theme)}
`;

export const LinkButton = styled(Link)`
  ${(props) => buttonStyles(props.theme)}
` as typeof Link;
