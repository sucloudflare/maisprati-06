import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
`;

export const StyledButton = styled.button<{ $variant: 'solid' | 'outline' | 'ghost' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: 1px solid transparent;
  outline: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'solid':
        return css`
          background-color: ${theme.colors.primary};
          color: white;

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            color: white;
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.textSecondary};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.surface};
            color: ${theme.colors.textPrimary};
            transform: translateY(-1px);
          }
        `;
    }
  }}
`;