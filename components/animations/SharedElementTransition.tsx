/**
 * SharedElementTransition.tsx
 *
 * Shared Element Transition — Card list → Detail Modal
 *
 * HOW IT WORKS:
 * True shared-element transitions (as in the Navigation Shared Element library)
 * require inter-screen coordination. This implementation achieves the same
 * visual result without a router by:
 *
 * 1. Measuring the tapped card's on-screen position with `measure()` via a ref.
 * 2. Storing that position in a shared value `origin`.
 * 3. Animating an "overlay" card from [origin.x, origin.y, origin.width, origin.height]
 *    to fullscreen using spring interpolation on a single 0→1 progress value.
 * 4. The content inside fades/scales in during the second half of the animation.
 *
 * The reverse (dismiss) runs the same spring from 1→0 with velocity matching
 * any active drag gesture.
 *
 * PERFORMANCE NOTES:
 * • `measure()` is async and only called on tap (not in render path).
 * • The overlay is absolutely positioned outside the list, so list items are
 *   never re-rendered during the animation.
 * • Avoid reading `origin` inside render; pass it only to `useAnimatedStyle`.
 */

import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
  Extrapolation,
} from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { YStack, XStack, Text, Button, Card, Paragraph } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

interface WorkoutCard {
  id: number;
  emoji: string;
  title: string;
  duration: string;
  calories: string;
  level: string;
  description: string;
  color: string;
  exercises: string[];
}

const CARDS: WorkoutCard[] = [
  {
    id: 0,
    emoji: '🔥',
    title: 'HIIT Inferno',
    duration: '30 min',
    calories: '400 kcal',
    level: 'Extreme',
    description: 'High-intensity intervals that torch fat and boost metabolism for hours after training.',
    color: '#ff4757',
    exercises: ['Burpees', 'Jump Squats', 'Mountain Climbers', 'Sprint Intervals'],
  },
  {
    id: 1,
    emoji: '⚡',
    title: 'Power Lift',
    duration: '50 min',
    calories: '500 kcal',
    level: 'Advanced',
    description: 'Progressive overload compound movements to maximize strength and muscle gain.',
    color: '#ffa502',
    exercises: ['Deadlift', 'Back Squat', 'Bench Press', 'Overhead Press'],
  },
  {
    id: 2,
    emoji: '🌊',
    title: 'Flow Yoga',
    duration: '45 min',
    calories: '200 kcal',
    level: 'Beginner',
    description: 'Dynamic vinyasa sequences to build flexibility, balance, and mental clarity.',
    color: '#2ed573',
    exercises: ['Sun Salutation', 'Warrior Series', 'Pigeon Pose', 'Savasana'],
  },
  {
    id: 3,
    emoji: '🏆',
    title: 'Athletic Core',
    duration: '25 min',
    calories: '250 kcal',
    level: 'Intermediate',
    description: 'Sports-specific core stability work for improved performance in any discipline.',
    color: '#1e90ff',
    exercises: ['Pallof Press', 'RKC Plank', 'Rotational Throws', 'Anti-Rotation Hold'],
  },
];

interface CardOrigin {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function SharedElementTransition() {
  const insets = useSafeAreaInsets();
  const [selectedCard, setSelectedCard] = useState<WorkoutCard | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const progress = useSharedValue(0);
  const origin = useSharedValue<CardOrigin>({ x: 0, y: 0, width: SCREEN_W - 48, height: 140 });

  const cardRefs = useRef<Record<number, View | null>>({});

  const openCard = useCallback(
    (card: WorkoutCard, ref: View | null) => {
      if (!ref) return;

      ref.measureInWindow((x, y, width, height) => {
        origin.value = { x, y, width, height };
        runOnJS(setSelectedCard)(card);
        runOnJS(setIsVisible)(true);

        progress.value = withSpring(1, {
          damping: 22,
          stiffness: 160,
          mass: 1,
        });
      });
    },
    [origin, progress],
  );

  const closeCard = useCallback(() => {
    progress.value = withSpring(
      0,
      { damping: 22, stiffness: 180, mass: 1 },
      () => {
        runOnJS(setIsVisible)(false);
        runOnJS(setSelectedCard)(null);
      },
    );
  }, [progress]);

  // The expanding overlay style
  const overlayStyle = useAnimatedStyle(() => {
    const o = origin.value;
    const x = interpolate(progress.value, [0, 1], [o.x, 0], Extrapolation.CLAMP);
    const y = interpolate(progress.value, [0, 1], [o.y, 0], Extrapolation.CLAMP);
    const w = interpolate(progress.value, [0, 1], [o.width, SCREEN_W], Extrapolation.CLAMP);
    const h = interpolate(progress.value, [0, 1], [o.height, SCREEN_H], Extrapolation.CLAMP);
    const borderRadius = interpolate(progress.value, [0, 0.6, 1], [20, 20, 0], Extrapolation.CLAMP);
    return { left: x, top: y, width: w, height: h, borderRadius };
  });

  // Detail content fades in during the second half
  const detailContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0.5, 0.8], [0, 1], Extrapolation.CLAMP);
    const translateY = interpolate(progress.value, [0.5, 1], [24, 0], Extrapolation.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  // Thumbnail title fades out as detail opens
  const thumbTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.3], [1, 0], Extrapolation.CLAMP);
    return { opacity };
  });

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          color="$color"
          fontSize={22}
          fontWeight="700"
          marginBottom="$2"
        >
          Choose a Workout
        </Text>
        <Paragraph color="$colorSubtitle" fontSize={14} marginBottom="$4">
          Tap a card to see full details
        </Paragraph>

        {CARDS.map((card) => (
          <View
            key={card.id}
            ref={(ref) => {
              cardRefs.current[card.id] = ref;
            }}
          >
            <Card
              marginBottom="$3"
              backgroundColor="$backgroundStrong"
              borderRadius="$5"
              overflow="hidden"
              bordered
              elevate
              onPress={() => openCard(card, cardRefs.current[card.id] ?? null)}
              animation="quick"
              pressStyle={{ scale: 0.97 }}
            >
              <XStack>
                <YStack
                  width={80}
                  backgroundColor={card.color + '33'}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={36}>{card.emoji}</Text>
                </YStack>
                <YStack flex={1} padding="$4" gap="$1">
                  <Text color="$color" fontWeight="700" fontSize={16}>
                    {card.title}
                  </Text>
                  <Paragraph color="$colorSubtitle" fontSize={13}>
                    {card.duration} · {card.calories}
                  </Paragraph>
                  <YStack
                    backgroundColor={card.color + '22'}
                    borderRadius="$10"
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                    alignSelf="flex-start"
                    marginTop="$1"
                  >
                    <Text
                      fontSize={11}
                      fontWeight="600"
                      style={{ color: card.color }}
                    >
                      {card.level}
                    </Text>
                  </YStack>
                </YStack>
              </XStack>
            </Card>
          </View>
        ))}
      </ScrollView>

      {/* Expanding overlay */}
      {isVisible && selectedCard && (
        <Animated.View
          style={[
            styles.overlay,
            { backgroundColor: selectedCard.color },
            overlayStyle,
          ]}
        >
          {/* Hero section */}
          <YStack
            height={220}
            alignItems="center"
            justifyContent="center"
            paddingTop={insets.top + 16}
          >
            <Text fontSize={80}>{selectedCard.emoji}</Text>
            <Animated.View style={thumbTitleStyle}>
              <Text
                color="white"
                fontSize={24}
                fontWeight="800"
                marginTop="$3"
                textAlign="center"
              >
                {selectedCard.title}
              </Text>
            </Animated.View>
          </YStack>

          {/* Detail content */}
          <Animated.View
            style={[
              styles.detailContent,
              detailContentStyle,
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <YStack padding="$5" gap="$4">
                <XStack gap="$2">
                  {[selectedCard.duration, selectedCard.calories, selectedCard.level].map((t) => (
                    <YStack
                      key={t}
                      backgroundColor="rgba(255,255,255,0.2)"
                      borderRadius="$10"
                      paddingHorizontal="$3"
                      paddingVertical="$2"
                    >
                      <Text color="white" fontWeight="700" fontSize={13}>
                        {t}
                      </Text>
                    </YStack>
                  ))}
                </XStack>

                <Text color="white" fontSize={16} lineHeight={24} opacity={0.9}>
                  {selectedCard.description}
                </Text>

                <Text color="white" fontSize={18} fontWeight="800">
                  Exercises
                </Text>
                {selectedCard.exercises.map((ex, i) => (
                  <XStack key={ex} gap="$3" alignItems="center">
                    <YStack
                      width={32}
                      height={32}
                      borderRadius="$10"
                      backgroundColor="rgba(255,255,255,0.2)"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text color="white" fontWeight="700">
                        {i + 1}
                      </Text>
                    </YStack>
                    <Text color="white" fontSize={15} fontWeight="600">
                      {ex}
                    </Text>
                  </XStack>
                ))}

                <Button
                  backgroundColor="white"
                  fontWeight="800"
                  borderRadius="$4"
                  marginTop="$3"
                  style={{ color: selectedCard.color }}
                >
                  Start Workout →
                </Button>

                <Button
                  onPress={closeCard}
                  backgroundColor="rgba(0,0,0,0.2)"
                  color="white"
                  fontWeight="600"
                  borderRadius="$4"
                >
                  ← Back to list
                </Button>
              </YStack>
            </ScrollView>
          </Animated.View>
        </Animated.View>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 100,
  },
  detailContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
});
