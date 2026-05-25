export const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80';

export const handleImageError = (event) => {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === 'true') {
    return;
  }

  img.dataset.fallbackApplied = 'true';
  img.src = DEFAULT_PRODUCT_IMAGE;
};
