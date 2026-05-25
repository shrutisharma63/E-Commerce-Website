import { useEffect } from 'react';

const DEFAULT_OPTIONS = {
  threshold: 0.15,
  rootMargin: '0px 0px -10% 0px'
};

export const useScrollReveal = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getRevealElements = () => Array.from(document.querySelectorAll('.reveal'));
    let elements = getRevealElements();

    if (!('IntersectionObserver' in window)) {
      const revealInView = () => {
        elements = getRevealElements();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        elements.forEach((el) => {
          if (el.classList.contains('is-visible')) {
            return;
          }

          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportHeight * 0.85 && rect.bottom >= 0) {
            el.classList.add('is-visible');
          }
        });
      };

      revealInView();
      window.addEventListener('scroll', revealInView, { passive: true });
      window.addEventListener('resize', revealInView);

      return () => {
        window.removeEventListener('scroll', revealInView);
        window.removeEventListener('resize', revealInView);
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, DEFAULT_OPTIONS);

    const observeElement = (el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    };

    elements.forEach(observeElement);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          if (node.classList.contains('reveal')) {
            observeElement(node);
          }

          const nested = node.querySelectorAll('.reveal');
          nested.forEach(observeElement);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};
