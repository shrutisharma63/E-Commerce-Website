import { useEffect } from 'react';

const MOTION_EASE = 0.12;
const SNAP_THRESHOLD = 0.5;

export const useSmoothScrollMotion = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (prefersReduced || isTouchDevice) {
      return;
    }

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let isAnimating = false;
    let frameId = null;

    const getMaxScroll = () => Math.max(root.scrollHeight - window.innerHeight, 0);

    const animate = () => {
      isAnimating = true;
      const delta = targetScroll - currentScroll;
      currentScroll += delta * MOTION_EASE;

      if (Math.abs(delta) < SNAP_THRESHOLD) {
        currentScroll = targetScroll;
      }

      window.scrollTo(0, currentScroll);

      if (currentScroll !== targetScroll) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        frameId = null;
      }
    };

    const onWheel = (event) => {
      if (event.ctrlKey) {
        return;
      }

      event.preventDefault();
      const maxScroll = getMaxScroll();
      targetScroll = Math.min(Math.max(targetScroll + event.deltaY, 0), maxScroll);

      if (!isAnimating) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      if (!isAnimating) {
        currentScroll = window.scrollY;
        targetScroll = window.scrollY;
      }
    };

    const onResize = () => {
      const maxScroll = getMaxScroll();
      targetScroll = Math.min(Math.max(targetScroll, 0), maxScroll);
      currentScroll = window.scrollY;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);
};
