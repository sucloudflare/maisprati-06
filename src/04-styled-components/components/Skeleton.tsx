import React from 'react';
import {
  SkeletonContainer,
  SkeletonImage,
  SkeletonContent,
  SkeletonTitle,
  SkeletonLine,
  SkeletonButton
} from './Skeleton.styles';

export default function Skeleton() {
  return (
    <SkeletonContainer>
      <SkeletonImage />
      <SkeletonContent>
        <SkeletonTitle>
          <SkeletonLine />
          <SkeletonLine $short />
        </SkeletonTitle>
        <SkeletonLine $price />
        <SkeletonLine $rating />
        <SkeletonButton />
      </SkeletonContent>
    </SkeletonContainer>
  );
}