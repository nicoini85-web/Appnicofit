/**
 * AdvancedBottomSheet.tsx
 *
 * Advanced Bottom Sheet — 3 snap points + gesture handler
 *
 * HOW IT WORKS:
 * The sheet is positioned at the bottom of the screen and its translateY is
 * the only animated value. Three snap points are defined as pixel offsets
 * from the bottom:
 *   COLLAPSED  → only a drag handle peek (~12%)
 *   HALF       → 55% of screen height
 *   EXPANDED   → 90% of screen height
 *
 * A Pan gesture:
 *   • onUpdate  – translates the sheet proportionally to finger delta
 *   • onEnd     – snaps to the closest snap point based on velocity + position
 *
 * A dark backdrop fades in as the sheet opens, intercepting taps to collapse.
 *
 * PERFORMANCE NOTES:
 * • The clamp in onUpdate prevents the sheet from being dragged past its
 *   extremes, avoiding "dead zones" where gesture feels unresponsive.
 * • Backdrop opacity is derived from translateY in useAnimatedStyle → no
 *   extra shared value.
 * • Spring config with damping:30 gives a purposeful, non-bouncy snap.
 */

import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { YStack, XStack, Text, Button, Paragraph, Separator } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get('window');

// Snap points: distance from bottom of screen
const SNAP_COLLAPSED = SCREEN_H * 0.12;
const SNAP_HALF = SCREEN_H * 0.55;
const SNAP_EXPANDED = SCREEN_H * 0.9;

// translateY values (0 = fully visible at SNAP_EXPANDED height from bottom)
const Y_EXPANDED = SCREEN_H - SNAP_EXPANDED;
const Y_HALF = SCREEN_H - SNAP_HALF;
const Y_COLLAPSED = SCREEN_H - SNAP_COLLAPSED;

const SNAP_POINTS = [Y_EXPANDED, Y_HALF, Y_COLLAPSED];

const SPRING = {
  damping: 30,
  stiffness: 200,
  mass: 0.8,
};

function findNearestSnap(y: number, velocity: number): number {
  'worklet';
  // Bias toward the velocity direction
  const biasedY = y + velocity * 0.15;
  let nearest = SNAP_POINTS[0];
  let minDist = Infinity;
  for (const snap of SNAP_POINTS) {
    const dist = Math.abs(biasedY - snap);
    if (dist < minDist) {
      minDist = dist;
      nearest = snap;
    }
  }
  return nearest;
}

const WORKOUT_DETAILS = [
  { label: 'Duration', value: '45 min', icon: '⏱' },
  { label: 'Calories', value: '380 kcal', icon: '🔥' },
  { label: 'Exercises', value: '12 moves', icon: '💪' },
  { label: 'Rest time', value: '30 s', icon: '🧘' },
];

export function AdvancedBottomSheet() {
  const translateY = useSharedValue(Y_COLLAPSED);
  const startY = useSharedValue(Y_COLLAPSED);

  const snapTo = useCallback((point: number) => {
    translateY.value = withSpring(point, SPRING);
  }, [translateY]);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      const next = startY.value + event.translationY;
      // Clamp within extremes
      translateY.value = Math.min(Y_COLLAPSED, Math.max(Y_EXPANDED, next));
    })
    .onEnd((event) => {
      const nearest = findNearestSnap(translateY.value, event.velocityY);
      translateY.value = withSpring(nearest, {
        ...SPRING,
        velocity: event.velocityY,
      });
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [Y_EXPANDED, Y_COLLAPSED],
      [0.6, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  // One animated style per dot — hooks at top level
  const dot0Style = useAnimatedStyle(() => {
    const snap = SNAP_POINTS[0];
    return {
      transform: [{ scale: interpolate(translateY.value, [snap - 40, snap, snap + 40], [0.8, 1.4, 0.8], Extrapolation.CLAMP) }],
      opacity: interpolate(translateY.value, [snap - 40, snap, snap + 40], [0.4, 1, 0.4], Extrapolation.CLAMP),
    };
  });
  const dot1Style = useAnimatedStyle(() => {
    const snap = SNAP_POINTS[1];
    return {
      transform: [{ scale: interpolate(translateY.value, [snap - 40, snap, snap + 40], [0.8, 1.4, 0.8], Extrapolation.CLAMP) }],
      opacity: interpolate(translateY.value, [snap - 40, snap, snap + 40], [0.4, 1, 0.4], Extrapolation.CLAMP),
    };
  });
  const dot2Style = useAnimatedStyle(() => {
    const snap = SNAP_POINTS[2];
    return {
      transform: [{ scale: interpolate(translateY.value, [snap - 40, snap, snap + 40], [0.8, 1.4, 0.8], Extrapolation.CLAMP) }],
      opacity: interpolate(translateY.value, [snap - 40, snap, snap + 40], [0.4, 1, 0.4], Extrapolation.CLAMP),
    };
  });
  const dotStyles = [dot0Style, dot1Style, dot2Style];

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Background content */}
      <YStack flex={1} padding="$5" gap="$4">
        <Text color="$color" fontSize={22} fontWeight="700" marginTop="$6">
          Today's Plan
        </Text>
        <Paragraph color="$colorSubtitle" fontSize={15}>
          Pull up the sheet to see full workout details.
        </Paragraph>
        <XStack gap="$2" flexWrap="wrap">
          {['Chest', 'Shoulders', 'Triceps'].map((m) => (
            <YStack
              key={m}
              backgroundColor="$blue4"
              borderRadius="$10"
              paddingHorizontal="$3"
              paddingVertical="$1"
            >
              <Text color="$blue11" fontWeight="600" fontSize={13}>
                {m}
              </Text>
            </YStack>
          ))}
        </XStack>

        {/* Snap indicators */}
        <XStack
          position="absolute"
          bottom={SNAP_COLLAPSED + 24}
          alignSelf="center"
          gap="$3"
          alignItems="center"
        >
          {SNAP_POINTS.map((_, i) => (
            <Animated.View key={i} style={[styles.dot, dotStyles[i]]} />
          ))}
        </XStack>

        {/* Expand button */}
        <Button
          onPress={() => snapTo(Y_EXPANDED)}
          backgroundColor="$blue9"
          color="white"
          fontWeight="700"
          borderRadius="$4"
          marginTop="$4"
          alignSelf="flex-start"
        >
          Open Sheet ↑
        </Button>
      </YStack>

      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={() => snapTo(Y_COLLAPSED)}>
        <Animated.View style={[styles.backdrop, backdropStyle]} pointerEvents="box-none" />
      </TouchableWithoutFeedback>

      {/* Bottom sheet */}
      <Animated.View style={[styles.sheet, sheetStyle]}>
        <GestureDetector gesture={panGesture}>
          <YStack>
            {/* Drag handle */}
            <YStack alignItems="center" paddingTop="$3" paddingBottom="$2">
              <YStack
                width={40}
                height={4}
                borderRadius="$10"
                backgroundColor="$colorTranslucent"
              />
            </YStack>

            {/* Sheet header */}
            <XStack
              paddingHorizontal="$5"
              paddingVertical="$3"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text color="$color" fontSize={20} fontWeight="700">
                Upper Body Blast
              </Text>
              <Button
                size="$2"
                circular
                backgroundColor="$backgroundStrong"
                onPress={() => snapTo(Y_COLLAPSED)}
              >
                ✕
              </Button>
            </XStack>

            <Separator />
          </YStack>
        </GestureDetector>

        {/* Scrollable content below handle */}
        <YStack padding="$5" gap="$4">
          <XStack flexWrap="wrap" gap="$3">
            {WORKOUT_DETAILS.map((d) => (
              <Card
                key={d.label}
                width={(SCREEN_W - 64) / 2}
                backgroundColor="$backgroundStrong"
                borderRadius="$5"
                padding="$3"
                bordered
              >
                <Text fontSize={28}>{d.icon}</Text>
                <Text
                  color="$color"
                  fontWeight="700"
                  fontSize={16}
                  marginTop="$1"
                >
                  {d.value}
                </Text>
                <Text color="$colorSubtitle" fontSize={12}>
                  {d.label}
                </Text>
              </Card>
            ))}
          </XStack>

          <Separator />

          <Text color="$color" fontSize={17} fontWeight="700">
            Exercise List
          </Text>
          {Array.from({ length: 6 }, (_, i) => (
            <XStack key={i} gap="$3" alignItems="center" paddingVertical="$2">
              <YStack
                width={36}
                height={36}
                borderRadius="$4"
                backgroundColor="$blue4"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="$blue11" fontWeight="700">
                  {i + 1}
                </Text>
              </YStack>
              <YStack flex={1}>
                <Text color="$color" fontWeight="600">
                  {['Push-ups', 'Dips', 'Pike Push-ups', 'Chest Flyes', 'Skull Crushers', 'Overhead Press'][i]}
                </Text>
                <Text color="$colorSubtitle" fontSize={13}>
                  3 sets · 12 reps
                </Text>
              </YStack>
            </XStack>
          ))}

          <Button
            onPress={() => snapTo(Y_COLLAPSED)}
            backgroundColor="$blue9"
            color="white"
            fontWeight="700"
            borderRadius="$4"
            marginTop="$2"
          >
            Start Workout 🚀
          </Button>
        </YStack>
      </Animated.View>
    </YStack>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 1,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_H,
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
    zIndex: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
});
