import { createAnimations } from '@tamagui/animations-reanimated';
import { createTamagui } from '@tamagui/core';
import { config as defaultConfig } from '@tamagui/config/v4';

/**
 * Reanimated-backed animations for Tamagui.
 * All spring/timing presets here map directly to react-native-reanimated.
 */
const animations = createAnimations({
  '100ms': {
    type: 'timing',
    duration: 100,
  },
  '200ms': {
    type: 'timing',
    duration: 200,
  },
  bouncy: {
    damping: 9,
    mass: 0.9,
    stiffness: 150,
    type: 'spring',
  },
  lazy: {
    damping: 18,
    stiffness: 50,
    type: 'spring',
  },
  medium: {
    damping: 15,
    stiffness: 120,
    mass: 1,
    type: 'spring',
  },
  slow: {
    damping: 15,
    stiffness: 40,
    type: 'spring',
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
    type: 'spring',
  },
  snappy: {
    damping: 25,
    stiffness: 300,
    type: 'spring',
  },
  tooltip: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    type: 'spring',
  },
});

const tamaguiConfig = createTamagui({
  ...defaultConfig,
  animations,
});

export type Conf = typeof tamaguiConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
