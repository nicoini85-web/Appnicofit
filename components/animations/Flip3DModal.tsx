/**
 * Flip3DModal.tsx
 *
 * Flip 3D Modal — Y-axis rotation with perspective + scale
 *
 * HOW IT WORKS:
 * A single `flip` shared value goes from 0 to 1.
 * The card is split into two faces: FRONT and BACK.
 *
 * Front face:
 *   rotateY:  0° → -90°  (first half 0→0.5)
 *   opacity:  1 → 0      (hidden exactly at 90°)
 *
 * Back face:
 *   rotateY:  90° → 0°   (second half 0.5→1)
 *   opacity:  0 → 1
 *
 * A `perspective` value in the transform gives the 3D depth illusion. The
 * faces are absolutely stacked on top of each other.
 *
 * A subtle scale dip at the midpoint (scale 0.92 at flip=0.5) reinforces the
 * spatial metaphor.
 *
 * PERFORMANCE NOTES:
 * • `perspective` must be the FIRST transform in the array on Android.
 * • Both faces must have `backfaceVisibility: 'hidden'` — but note this is
 *   still partially broken on Android < RN 0.72. The opacity-based visibility
 *   swap is a robust fallback.
 * • Use withTiming (not withSpring) for rotation to maintain constant angular
 *   velocity; spring-based rotation can overshoot and look wrong.
 */

import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
import { YStack, XStack, Text, Button, Card, Paragraph, Separator } from 'tamagui';

const FLIP_DURATION = 500;
const CARD_W = 300;
const CARD_H = 400;

export function Flip3DModal() {
  const flip = useSharedValue(0);
  const isFlipped = useSharedValue(false);

  const handleFlip = useCallback(() => {
    const next = isFlipped.value ? 0 : 1;
    isFlipped.value = !isFlipped.value;
    flip.value = withTiming(next, {
      duration: FLIP_DURATION,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [flip, isFlipped]);

  // Front face: visible 0→0.5, rotating 0 → -90
  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flip.value,
      [0, 0.5],
      [0, -90],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      flip.value,
      [0, 0.45, 0.5],
      [1, 1, 0],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      flip.value,
      [0, 0.5, 1],
      [1, 0.92, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { scale },
      ],
    };
  });

  // Back face: visible 0.5→1, rotating 90 → 0
  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flip.value,
      [0.5, 1],
      [90, 0],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      flip.value,
      [0.5, 0.55, 1],
      [0, 1, 1],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      flip.value,
      [0, 0.5, 1],
      [1, 0.92, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { scale },
      ],
    };
  });

  // Container gentle float
  const containerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      flip.value,
      [0, 0.5, 1],
      [0, -12, 0],
      Extrapolation.CLAMP,
    );
    return { transform: [{ translateY }] };
  });

  return (
    <YStack flex={1} backgroundColor="$background" alignItems="center" justifyContent="center" gap="$6">
      <YStack alignItems="center" gap="$2">
        <Text color="$color" fontSize={22} fontWeight="700">
          3D Flip Card
        </Text>
        <Paragraph color="$colorSubtitle" fontSize={14}>
          Tap the button to reveal the back face
        </Paragraph>
      </YStack>

      {/* Card container — fixed size, faces stacked absolutely */}
      <Animated.View style={[styles.cardContainer, containerStyle]}>
        {/* FRONT FACE */}
        <Animated.View style={[styles.face, frontStyle]}>
          <Card
            width={CARD_W}
            height={CARD_H}
            backgroundColor="$backgroundStrong"
            borderRadius="$8"
            padding="$5"
            bordered
            elevate
          >
            <YStack flex={1} gap="$3">
              <YStack
                flex={1}
                borderRadius="$6"
                backgroundColor="$blue9"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={72}>🏋️</Text>
              </YStack>
              <Text color="$color" fontSize={22} fontWeight="800">
                Upper Body Blast
              </Text>
              <Paragraph color="$colorSubtitle" fontSize={14}>
                45 min · Advanced · 380 kcal
              </Paragraph>
              <XStack gap="$2">
                {['Chest', 'Shoulders', 'Triceps'].map((m) => (
                  <YStack
                    key={m}
                    backgroundColor="$blue4"
                    borderRadius="$10"
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                  >
                    <Text color="$blue11" fontSize={11} fontWeight="600">
                      {m}
                    </Text>
                  </YStack>
                ))}
              </XStack>
            </YStack>
          </Card>
        </Animated.View>

        {/* BACK FACE */}
        <Animated.View style={[styles.face, backStyle]}>
          <Card
            width={CARD_W}
            height={CARD_H}
            backgroundColor="$blue9"
            borderRadius="$8"
            padding="$5"
            elevate
          >
            <YStack flex={1} gap="$3">
              <Text color="white" fontSize={22} fontWeight="800">
                Workout Details
              </Text>
              <Separator borderColor="rgba(255,255,255,0.2)" />
              {[
                ['Warm-up', '5 min'],
                ['Main Work', '30 min'],
                ['Cool-down', '10 min'],
                ['Difficulty', '★★★★☆'],
                ['Equipment', 'Dumbbells'],
                ['Coach', 'Alex Torres'],
              ].map(([label, value]) => (
                <XStack key={label} justifyContent="space-between" alignItems="center">
                  <Text color="rgba(255,255,255,0.7)" fontSize={14}>
                    {label}
                  </Text>
                  <Text color="white" fontWeight="700" fontSize={14}>
                    {value}
                  </Text>
                </XStack>
              ))}
              <YStack flex={1} />
              <Button
                backgroundColor="white"
                color="$blue9"
                fontWeight="800"
                borderRadius="$4"
              >
                Start Now →
              </Button>
            </YStack>
          </Card>
        </Animated.View>
      </Animated.View>

      <Button
        onPress={handleFlip}
        backgroundColor="$blue9"
        color="white"
        fontWeight="700"
        borderRadius="$4"
        width={200}
      >
        Flip Card ↻
      </Button>
    </YStack>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_W,
    height: CARD_H,
  },
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    backfaceVisibility: 'hidden',
  },
});
