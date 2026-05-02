/**
 * StaggeredList.tsx
 *
 * Staggered List Animation — elements enter one after another
 *
 * HOW IT WORKS:
 * Each list item gets its own shared value `progress` (0 → 1). When the
 * component mounts, a `withDelay(index * STAGGER_MS, withSpring(...))` call
 * fires for every item. The delay creates the cascade effect.
 *
 * Each item derives:
 *   - opacity     from 0 → 1
 *   - translateY  from +28 → 0 (slide up from below)
 *   - scale       from 0.88 → 1 (subtle grow-in)
 *
 * A "replay" button resets all values to 0, then re-triggers the sequence
 * so the stagger can be viewed repeatedly.
 *
 * PERFORMANCE NOTES:
 * • One shared value per item; layout recalculation happens entirely on the
 *   UI thread — no JS bridge round-trips.
 * • Keep STAGGER_MS around 60–90 ms. Below 50 ms the effect is barely
 *   noticeable; above 120 ms it feels sluggish.
 * • For very long lists (50+ items) use an interval-based trigger only for
 *   visible items (via onViewableItemsChanged) to avoid creating hundreds of
 *   shared values upfront.
 */

import React, { useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { YStack, XStack, Text, Button, Card, Paragraph } from 'tamagui';

const STAGGER_MS = 75;
const SPRING_CONFIG = {
  damping: 16,
  stiffness: 120,
  mass: 0.9,
};

interface ListItem {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
}

const ITEMS: ListItem[] = [
  { id: 0, emoji: '🏃', title: 'Morning Run', subtitle: '6.2 km · 32 min', color: '#ff6b35' },
  { id: 1, emoji: '🏋️', title: 'Strength Training', subtitle: '45 min · 380 kcal', color: '#4361ee' },
  { id: 2, emoji: '🧘', title: 'Yoga Flow', subtitle: '30 min · 150 kcal', color: '#7209b7' },
  { id: 3, emoji: '🚴', title: 'Cycling', subtitle: '22 km · 55 min', color: '#06d6a0' },
  { id: 4, emoji: '🏊', title: 'Swimming', subtitle: '1500 m · 40 min', color: '#118ab2' },
  { id: 5, emoji: '⛹️', title: 'Basketball', subtitle: '60 min · 500 kcal', color: '#ef476f' },
  { id: 6, emoji: '🤸', title: 'Calisthenics', subtitle: '35 min · 280 kcal', color: '#ffd166' },
  { id: 7, emoji: '🥊', title: 'Boxing', subtitle: '45 min · 450 kcal', color: '#e63946' },
];

// ─── Individual animated row ────────────────────────────────────────────────

function StaggeredItem({
  item,
  progress,
}: {
  item: ListItem;
  progress: Animated.SharedValue<number>;
}) {
  const animStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP);
    const translateY = interpolate(progress.value, [0, 1], [28, 0], Extrapolation.CLAMP);
    const scale = interpolate(progress.value, [0, 1], [0.88, 1], Extrapolation.CLAMP);
    return { opacity, transform: [{ translateY }, { scale }] };
  });

  return (
    <Animated.View style={animStyle}>
      <Card
        marginBottom="$3"
        backgroundColor="$backgroundStrong"
        borderRadius="$5"
        padding="$4"
        bordered
        elevate
        animation="quick"
        pressStyle={{ scale: 0.97 }}
      >
        <XStack alignItems="center" gap="$4">
          <YStack
            width={52}
            height={52}
            borderRadius="$5"
            alignItems="center"
            justifyContent="center"
            style={{ backgroundColor: item.color + '33' }}
          >
            <Text fontSize={26}>{item.emoji}</Text>
          </YStack>
          <YStack flex={1}>
            <Text color="$color" fontWeight="700" fontSize={16}>
              {item.title}
            </Text>
            <Paragraph color="$colorSubtitle" fontSize={13}>
              {item.subtitle}
            </Paragraph>
          </YStack>
          <YStack
            width={8}
            height={8}
            borderRadius="$10"
            style={{ backgroundColor: item.color }}
          />
        </XStack>
      </Card>
    </Animated.View>
  );
}

// ─── Root component — creates all shared values at the top level ────────────

export function StaggeredList() {
  // Fixed-length array of shared values — hooks at top level, never conditional
  const p0 = useSharedValue(0);
  const p1 = useSharedValue(0);
  const p2 = useSharedValue(0);
  const p3 = useSharedValue(0);
  const p4 = useSharedValue(0);
  const p5 = useSharedValue(0);
  const p6 = useSharedValue(0);
  const p7 = useSharedValue(0);

  const sharedValues: Array<Animated.SharedValue<number>> = [p0, p1, p2, p3, p4, p5, p6, p7];

  const triggerAnimation = useCallback(() => {
    sharedValues.forEach((sv) => {
      sv.value = 0;
    });
    sharedValues.forEach((sv, i) => {
      sv.value = withDelay(i * STAGGER_MS, withSpring(1, SPRING_CONFIG));
    });
  }, [p0, p1, p2, p3, p4, p5, p6, p7]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const timeout = setTimeout(triggerAnimation, 300);
    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <YStack flex={1} backgroundColor="$background">
      <YStack paddingHorizontal="$5" paddingTop="$5" paddingBottom="$3" gap="$2">
        <Text color="$color" fontSize={22} fontWeight="700">
          Activity Feed
        </Text>
        <Paragraph color="$colorSubtitle" fontSize={14}>
          Your recent workouts
        </Paragraph>
      </YStack>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {ITEMS.map((item, index) => (
          <StaggeredItem key={item.id} item={item} progress={sharedValues[index]} />
        ))}
      </ScrollView>

      <YStack
        padding="$4"
        paddingBottom="$5"
        borderTopWidth={1}
        borderTopColor="$borderColor"
      >
        <Button
          onPress={triggerAnimation}
          backgroundColor="$blue9"
          color="white"
          fontWeight="700"
          borderRadius="$4"
        >
          Replay Animation ↻
        </Button>
      </YStack>
    </YStack>
  );
}
