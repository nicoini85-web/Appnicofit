/**
 * SensorTiltEffect.tsx
 *
 * Sensor Tilt Effect — accelerometer-driven parallax layers
 *
 * HOW IT WORKS:
 * `expo-sensors` Accelerometer provides {x, y, z} gravity readings at a set
 * interval (50 ms → 20 Hz). Each reading is low-pass filtered to smooth jitter:
 *
 *   filtered = filtered * ALPHA + raw * (1 - ALPHA)   (ALPHA = 0.85)
 *
 * The filtered values drive shared values via `runOnUI` (direct UI thread
 * write), avoiding any JS-bridge latency. Three layers translate at different
 * depths (0.5×, 1×, 1.5×) for a parallax stacking effect.
 *
 * A rotation in X and Y gives the "3D tilt" illusion:
 *   rotateX: clamp(y * -MAX_TILT, -MAX_TILT, MAX_TILT)
 *   rotateY: clamp(x *  MAX_TILT, -MAX_TILT, MAX_TILT)
 *
 * The perspective wrapper gives the depth cue.
 *
 * PERFORMANCE NOTES:
 * • Unsubscribe from the accelerometer on unmount to prevent memory leaks and
 *   background battery drain.
 * • Do NOT update React state on every sensor reading (that would be 20
 *   setState calls/sec). Only shared values are mutated.
 * • For production, debounce the subscription to `isActive` — pause sensor
 *   when the screen is backgrounded.
 * • On iOS the axes are:
 *     x → right (+) / left (−)
 *     y → up (+) / down (−)
 *   On Android the sign of y is often flipped; a platform check is included.
 */

import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Accelerometer } from 'expo-sensors';
import { YStack, XStack, Text, Card, Paragraph } from 'tamagui';

const MAX_TILT = 12;         // degrees
const MAX_TRANSLATE = 18;    // pixels
const ALPHA = 0.85;          // low-pass filter coefficient
const UPDATE_INTERVAL = 50;  // ms (20 Hz)

interface Vec2 {
  x: number;
  y: number;
}

export function SensorTiltEffect() {
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);

  // Low-pass filter state lives in a ref (JS side, not shared value)
  const filtered = useRef<Vec2>({ x: 0, y: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL);

    const subscription = Accelerometer.addListener((data) => {
      // Low-pass filter
      filtered.current.x = filtered.current.x * ALPHA + data.x * (1 - ALPHA);
      // Android flips Y axis
      const rawY = Platform.OS === 'android' ? -data.y : data.y;
      filtered.current.y = filtered.current.y * ALPHA + rawY * (1 - ALPHA);

      const nx = filtered.current.x;
      const ny = filtered.current.y;

      // Write directly to shared values from JS (no worklet needed for this pattern)
      tiltX.value = withSpring(nx, { damping: 20, stiffness: 180 });
      tiltY.value = withSpring(ny, { damping: 20, stiffness: 180 });
    });

    return () => subscription.remove();
  }, [tiltX, tiltY]);

  // Container perspective tilt
  const containerStyle = useAnimatedStyle(() => {
    const rotateXDeg = interpolate(
      tiltY.value,
      [-1, 1],
      [MAX_TILT, -MAX_TILT],
      Extrapolation.CLAMP,
    );
    const rotateYDeg = interpolate(
      tiltX.value,
      [-1, 1],
      [-MAX_TILT, MAX_TILT],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { perspective: 600 },
        { rotateX: `${rotateXDeg}deg` },
        { rotateY: `${rotateYDeg}deg` },
      ],
    };
  });

  // Each layer style at top level — hooks must not be inside helper functions
  const layer1Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(tiltX.value, [-1, 1], [-MAX_TRANSLATE * 0.4, MAX_TRANSLATE * 0.4], Extrapolation.CLAMP) },
      { translateY: interpolate(tiltY.value, [-1, 1], [MAX_TRANSLATE * 0.4, -MAX_TRANSLATE * 0.4], Extrapolation.CLAMP) },
    ],
  }));

  const layer2Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(tiltX.value, [-1, 1], [-MAX_TRANSLATE, MAX_TRANSLATE], Extrapolation.CLAMP) },
      { translateY: interpolate(tiltY.value, [-1, 1], [MAX_TRANSLATE, -MAX_TRANSLATE], Extrapolation.CLAMP) },
    ],
  }));

  const layer3Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(tiltX.value, [-1, 1], [-MAX_TRANSLATE * 1.8, MAX_TRANSLATE * 1.8], Extrapolation.CLAMP) },
      { translateY: interpolate(tiltY.value, [-1, 1], [MAX_TRANSLATE * 1.8, -MAX_TRANSLATE * 1.8], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <YStack flex={1} backgroundColor="$background" alignItems="center" justifyContent="center" gap="$6">
      <YStack alignItems="center" gap="$2">
        <Text color="$color" fontSize={22} fontWeight="700">
          Sensor Tilt Effect
        </Text>
        <Paragraph color="$colorSubtitle" fontSize={14} textAlign="center" paddingHorizontal="$4">
          Tilt your device to see the parallax layers respond
        </Paragraph>
      </YStack>

      {/* Perspective wrapper */}
      <Animated.View style={[styles.perspectiveWrapper, containerStyle]}>
        {/* Layer 1 — background glow */}
        <Animated.View style={[styles.layer, styles.layer1, layer1Style]}>
          <YStack
            width={260}
            height={260}
            borderRadius="$10"
            backgroundColor="$blue4"
            opacity={0.3}
          />
        </Animated.View>

        {/* Layer 2 — card body */}
        <Animated.View style={[styles.layer, layer2Style]}>
          <Card
            width={260}
            backgroundColor="$backgroundStrong"
            borderRadius="$8"
            padding="$5"
            bordered
            elevate
          >
            <YStack gap="$3" alignItems="center">
              <Text fontSize={56}>🏆</Text>
              <Text color="$color" fontSize={20} fontWeight="800" textAlign="center">
                Champion Mode
              </Text>
              <Paragraph color="$colorSubtitle" fontSize={14} textAlign="center">
                Legendary · 60 min · 600 kcal
              </Paragraph>
            </YStack>
          </Card>
        </Animated.View>

        {/* Layer 3 — floating badges (foreground) */}
        <Animated.View style={[styles.layer, styles.badgeLayer, layer3Style]}>
          <YStack
            backgroundColor="$orange9"
            borderRadius="$10"
            paddingHorizontal="$3"
            paddingVertical="$2"
            position="absolute"
            top={-16}
            right={-16}
            shadowColor="$orange9"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.5}
            shadowRadius={8}
          >
            <Text color="white" fontWeight="800" fontSize={12}>
              🔥 HOT
            </Text>
          </YStack>

          <YStack
            backgroundColor="$green9"
            borderRadius="$10"
            paddingHorizontal="$3"
            paddingVertical="$2"
            position="absolute"
            bottom={-16}
            left={-16}
            shadowColor="$green9"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.5}
            shadowRadius={8}
          >
            <Text color="white" fontWeight="800" fontSize={12}>
              ✓ NEW
            </Text>
          </YStack>
        </Animated.View>
      </Animated.View>

      {/* Live sensor readout */}
      <XStack gap="$4">
        <SensorReadout label="Tilt X" value={tiltX} />
        <SensorReadout label="Tilt Y" value={tiltY} />
      </XStack>
    </YStack>
  );
}

function SensorReadout({
  label,
  value,
}: {
  label: string;
  value: Animated.SharedValue<number>;
}) {
  const barStyle = useAnimatedStyle(() => {
    const width = interpolate(
      value.value,
      [-1, 1],
      [0, 80],
      Extrapolation.CLAMP,
    );
    return { width };
  });

  return (
    <YStack gap="$1" alignItems="center">
      <Text color="$colorSubtitle" fontSize={12}>
        {label}
      </Text>
      <YStack
        width={80}
        height={6}
        borderRadius="$10"
        backgroundColor="$backgroundStrong"
        overflow="hidden"
      >
        <Animated.View
          style={[
            {
              height: 6,
              borderRadius: 3,
              backgroundColor: '#4361ee',
            },
            barStyle,
          ]}
        />
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  perspectiveWrapper: {
    width: 260,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layer1: {
    width: 260,
    height: 260,
  },
  badgeLayer: {
    width: 260,
    height: 240,
  },
});
