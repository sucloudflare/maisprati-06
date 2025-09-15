import styled from 'styled-components';

export const CardContainer = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
    border-color: ${({ theme }) => theme.colors.borderHover};
  }

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.normal};

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

export const ProductTag = styled.span<{ $variant: 'novo' | 'promo' }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background-color: ${({ theme, $variant }) => 
    $variant === 'novo' ? theme.colors.success : theme.colors.warning
  };
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const Price = styled.div`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const RatingText = styled.span`
  font-size: 0.875rem;
  margin-left: ${({ theme }) => theme.spacing.xs};
`;