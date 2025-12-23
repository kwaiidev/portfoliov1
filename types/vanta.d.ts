declare module 'vanta/dist/vanta.waves.min.js' {
  interface VantaWavesOptions {
    el: HTMLElement;
    THREE?: typeof import('three');
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
    color?: number;
    backgroundColor?: number;
  }

  interface VantaEffect {
    destroy(): void;
  }

  const VANTA: {
    WAVES(options: VantaWavesOptions): VantaEffect;
  };

  export default VANTA;
}

declare module 'vanta' {
  export * from 'vanta/dist/vanta.waves.min.js';
}
