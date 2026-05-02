/**
 * DraggableCard.tsx
 *
 * Draggable Interactive Card — momentum · snap · spring
 *
 * HOW IT WORKS:
 * A Pan gesture drives translateX / translateY shared values directly on the
 * UI thread. On release the card does one of three things:
 *   1. SNAP BACK   — if still near the origin, spring back with momentum
 *   2. FLING LEFT  — if velocity or offset crosses the left threshold
 *   3. FLING RIGHT — same for right
 *
 * The card also rotates proportionally to its X offset, giving a natural
 * "card in hand" feel, and the background color interpolates from green
 * (right) to red (left) as an action indicator.
 *
 * PERFORMANCE NOTES:
 * • `useAnimatedGestureHandler` is replaced by `Gesture.Pan()` (RNGH v2 /
 *   Reanimated 4 worklet-based API).
 * • Avoid capturing new JS closures inside gesture callbacks; read values via
 *   `.value` only.
 * • The rotation + scale are derived in a single `useAnimatedStyle` → one
 *   layout pass.
 */

import React, { useCallback } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  interpolateColor,
  runOnJS,
  Extrapolation,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { YStack, Text, Card, XStack, Paragraph } from 'tamagui';

const { width: SCREEN_W } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_W * 0.35;
const VELOCITY_THRESHOLD = 800;

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 120,
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

interface DraggableCardProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function DraggableCard({
  onSwipeLeft,
  onSwipeRight,
}: DraggableCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Track starting position to offset drag correctly
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      if (direction === 'left') onSwipeLeft?.();
      else onSwipeRight?.();
    },
    [onSwipeLeft, onSwipeRight],
  );

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })
    .onEnd((event) => {
      const shouldFlingLeft =
        translateX.value < -SWIPE_THRESHOLD ||
        event.velocityX < -VELOCITY_THRESHOLD;
      const shouldFlingRight =
        translateX.value > SWIPE_THRESHOLD ||
        event.velocityX > VELOCITY_THRESHOLD;

      if (shouldFlingLeft) {
        translateX.value = withTiming(-SCREEN_W * 1.5, { duration: 350 });
        translateY.value = withTiming(translateY.value + 80, { duration: 350 });
        runOnJS(handleSwipe)('left');
      } else if (shouldFlingRight) {
        translateX.value = withTiming(SCREEN_W * 1.5, { duration: 350 });
        translateY.value = withTiming(translateY.value + 80, { duration: 350 });
        runOnJS(handleSwipe)('right');
      } else {
        // Snap back with spring including velocity for natural momentum
        translateX.value = withSpring(0, {
          ...SPRING_CONFIG,
          velocity: event.velocityX,
        });
        translateY.value = withSpring(0, {
          ...SPRING_CONFIG,
          velocity: event.velocityY,
        });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_W / 2, 0, SCREEN_W / 2],
      [-18, 0, 18],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [1, 0.95],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale },
      ],
    };
  });

  // Colored action indicator behind card
  const leftIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, -40, 0],
      [1, 0.4, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  const rightIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, 40, SWIPE_THRESHOLD],
      [0, 0.4, 1],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" gap="$6">
      <YStack alignItems="center" gap="$2" marginBottom="$2">
        <Text color="$color" fontSize={20} fontWeight="700">
          Draggable Card
        </Text>
        <Paragraph color="$colorSubtitle" fontSize={14} textAlign="center">
          Swipe left to skip · Swipe right to save
        </Paragraph>
      </YStack>

      {/* Action indicators */}
      <YStack
        position="absolute"
        width={SCREEN_W - 48}
        alignSelf="center"
        top="35%"
      >
        <Animated.View style={[styles.indicator, styles.leftIndicator, leftIndicatorStyle]}>
          <Text color="white" fontWeight="800" fontSize={22}>
            SKIP ✕
          </Text>
        </Animated.View>
        <Animated.View style={[styles.indicator, styles.rightIndicator, rightIndicatorStyle]}>
          <Text color="white" fontWeight="800" fontSize={22}>
            SAVE ♥
          </Text>
        </Animated.View>
      </YStack>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.cardWrapper, cardStyle]}>
          <Card
            width={SCREEN_W - 64}
            backgroundColor="$backgroundStrong"
            borderRadius="$8"
            padding="$5"
            elevate
            bordered
          >
            <YStack gap="$3">
              <YStack
                height={180}
                borderRadius="$6"
                backgroundColor="$blue9"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                <Text fontSize={64}>🏋️</Text>
              </YStack>

              <Text color="$color" fontSize={22} fontWeight="700">
                Upper Body Blast
              </Text>
              <Paragraph color="$colorSubtitle" fontSize={15} lineHeight={22}>
                High-intensity workout targeting chest, shoulders and triceps.
                45 min · Advanced
              </Paragraph>

              <XStack gap="$2">
                {['45 min', '380 kcal', 'Advanced'].map((tag) => (
                  <YStack
                    key={tag}
                    backgroundColor="$blue4"
                    borderRadius="$10"
                    paddingHorizontal="$3"
                    paddingVertical="$1"
                  >
                    <Text color="$blue11" fontSize={12} fontWeight="600">
                      {tag}
                    </Text>
                  </YStack>
                ))}
              </XStack>
            </YStack>
          </Card>
        </Animated.View>
      </GestureDetector>

      <Paragraph color="$colorSubtitle" fontSize={13}>
        Drag the card in any direction
      </Paragraph>
    </YStack>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 3,
  },
  leftIndicator: {
    left: 16,
    borderColor: '#ff3b30',
    backgroundColor: 'rgba(255,59,48,0.2)',
  },
  rightIndicator: {
    right: 16,
    borderColor: '#34c759',
    backgroundColor: 'rgba(52,199,89,0.2)',
  },
});
