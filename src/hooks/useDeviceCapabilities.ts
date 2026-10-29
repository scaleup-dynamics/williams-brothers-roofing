import { useState, useEffect } from 'react';

type DeviceCapabilities = {
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  supportsWebGL: boolean;
};

export function useDeviceCapabilities(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowEnd: false,
    prefersReducedMotion: false,
    supportsWebGL: true,
  });

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let supportsWebGL = true;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      supportsWebGL = !!gl;
    } catch {
      supportsWebGL = false;
    }

    const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
    const cores = nav.hardwareConcurrency || 4;
    const memory = nav.deviceMemory || 4;
    const isLowEnd = isMobile && (cores <= 4 || memory <= 4);

    setCaps({ isMobile, isLowEnd, prefersReducedMotion, supportsWebGL });
  }, []);

  return caps;
}
