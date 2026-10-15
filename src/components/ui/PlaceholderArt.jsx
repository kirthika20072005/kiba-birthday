import { useState } from 'react';
import Icon from './Icon.jsx';
import { useImageLoad } from '../../lib/media.js';

/**
 * A resilient image.
 * - Shows a themed placeholder card while the file is missing/broken.
 * - `src` may be null (deliberate placeholder) or a path that failed.
 * - Falls back to an emoji + "tap to replace" hint so nothing looks broken.
 */
export default function PlaceholderArt({ src, label, className = '', ratio, icon = 'image' }) {
  const { loaded, failed } = useImageLoad(src);
  const style = ratio ? { aspectRatio: ratio } : undefined;

  if (src && !failed && !loaded) {
    return (
      <div className={`ph-art ph-loading ${className}`.trim()} style={style} aria-hidden="true" />
    );
  }

  if (failed || !src) {
    return (
      <div className={`ph-art ${className}`.trim()} style={style} role="img" aria-label={label || 'Placeholder image'}>
        <span className="ph-icon">
          <Icon name={icon} size={34} />
        </span>
        {label ? <span className="ph-label">{label}</span> : null}
        <span className="ph-hint">add your photo</span>
      </div>
    );
  }

  return (
    <img className={`ph-img ${className}`.trim()} src={src} alt={label || ''} loading="lazy" decoding="async" />
  );
}
