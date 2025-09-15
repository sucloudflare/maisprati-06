import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`;

const shimmerGradient = ({ theme }: any) =>
  `linear-gradient(90deg, ${theme.colors.surface} 25%, ${theme.colors.border} 50%, ${theme.colors.surface} 75%)`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const SkeletonImage = styled.div`
  aspect-ratio: 1;
  background: ${shimmerGradient};
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite;
`;

export const SkeletonContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SkeletonTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkeletonLine = styled.div<{ $short?: boolean; $price?: boolean; $rating?: boolean }>`
  height: 1rem;
  background: ${shimmerGradient};
  background-size: 200% 100%;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  animation: ${shimmer} 2s infinite;

  ${({ $short }) => $short && `width: 70%;`}
  ${({ $price }) => $price && `height: 1.5rem; width: 40%;`}
  ${({ $rating }) => $rating && `width: 60%;`}
`;

export const SkeletonButton = styled.div`
  height: 2.5rem;
  background: ${shimmerGradient};
  background-size: 200% 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  animation: ${shimmer} 2s infinite;
`;