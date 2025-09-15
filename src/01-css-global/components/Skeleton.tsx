import React from 'react';

export default function Skeleton() {
  return (
    <div className="css-global-skeleton">
      <div className="css-global-skeleton-image"></div>
      <div className="css-global-skeleton-content">
        <div className="css-global-skeleton-title">
          <div className="css-global-skeleton-line css-global-skeleton-line--title"></div>
          <div className="css-global-skeleton-line css-global-skeleton-line--title css-global-skeleton-line--short"></div>
        </div>
        <div className="css-global-skeleton-line css-global-skeleton-line--price"></div>
        <div className="css-global-skeleton-line css-global-skeleton-line--rating"></div>
        <div className="css-global-skeleton-button"></div>
      </div>
    </div>
  );
}