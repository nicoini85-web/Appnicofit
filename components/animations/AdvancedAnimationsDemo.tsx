/**
 * AdvancedAnimationsDemo.tsx
 *
 * Main navigation shell — shows all 7 animation examples in a single screen.
 *
 * Navigation uses a tab-like approach driven by a single `activeTab` shared
 * value. Switching tabs animates the content with a slide-fade transition
 * (scale + opacity + translateX). The tab bar indicator slides smoothly
 * under the active tab using interpolation.
 *
 * Architecture:
 *   • Each demo is lazy-rendered behind a transparent gate — the component
 *     mounts only when first visited (avoids sensor subscriptions firing
 *     for unseen screens).
 *   • The slide transition is purely animated; no state updates during transit.
 */

import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
  Extrapolation,
} from 'react-native-reanimated';
import { YStack, XStack, Text } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ParallaxHeader } from './ParallaxHeader';
import { DraggableCard } from './DraggableCard';
import { AdvancedBottomSheet } from './AdvancedBottomSheet';
import { StaggeredList } from './StaggeredList';
import { Flip3DModal } from './Flip3DModal';
import { SharedElementTransition } from './SharedElementTransition';
import { SensorTiltEffect } from './SensorTiltEffect';

const { width: SCREEN_W } = Dimensions.get('window');

interface Tab {
  id: number;
  label: string;
  emoji: string;
  component: React.ComponentType;
}

const TABS: Tab[] = [
  { id: 0, label: 'Parallax', emoji: '📜', component: ParallaxHeader },
  { id: 1, label: 'Drag', emoji: '🃏', component: DraggableCard },
  { id: 2, label: 'Sheet', emoji: '📋', component: AdvancedBottomSheet },
  { id: 3, label: 'Stagger', emoji: '📋', component: StaggeredList },
  { id: 4, label: 'Flip', emoji: '🔄', component: Flip3DModal },
  { id: 5, label: 'Shared', emoji: '✨', component: SharedElementTransition },
  { id: 6, label: 'Tilt', emoji: '📱', component: SensorTiltEffect },
];

const TAB_COUNT = TABS.length;
const TAB_BAR_H = 56;
const INDICATOR_W = Math.floor(SCREEN_W / TAB_COUNT);

// Slide direction sign for enter/exit animations
function slideDir(from: number, to: number) {
  return to > from ? 1 : -1;
}

export function AdvancedAnimationsDemo() {
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const tabScrollRef = useRef<ScrollView>(null);

  // Visited tabs are mounted and never unmounted (avoids re-mount cost)
  const [visitedTabs] = useState<Set<number>>(() => new Set([0]));

  const slideProgress = useSharedValue(0); // 0 = old screen visible, 1 = new screen visible
  const indicatorX = useSharedValue(0);

  const navigateTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      visitedTabs.add(index);

      setPrevIndex(activeIndex);
      runOnJS(setActiveIndex)(index);

      // Indicator slides to new position
      indicatorX.value = withSpring(index * INDICATOR_W, {
        damping: 20,
        stiffness: 200,
      });

      // Scroll tab bar to keep active tab visible
      tabScrollRef.current?.scrollTo({
        x: Math.max(0, index * INDICATOR_W - SCREEN_W / 2 + INDICATOR_W / 2),
        animated: true,
      });

      // Page transition
      const dir = slideDir(activeIndex, index);
      slideProgress.value = -dir; // start from off-screen
      slideProgress.value = withSpring(0, { damping: 22, stiffness: 200, mass: 1 });
    },
    [activeIndex, indicatorX, slideProgress, visitedTabs],
  );

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  const contentStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      slideProgress.value,
      [-1, 0, 1],
      [-SCREEN_W * 0.12, 0, SCREEN_W * 0.12],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      slideProgress.value,
      [-0.6, 0, 0.6],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      slideProgress.value,
      [-1, 0, 1],
      [0.94, 1, 0.94],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [{ translateX }, { scale }],
    };
  });

  const ActiveComponent = TABS[activeIndex].component;

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <YStack
        paddingTop={insets.top + 8}
        paddingHorizontal="$5"
        paddingBottom="$3"
        backgroundColor="$backgroundStrong"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <Text color="$color" fontSize={18} fontWeight="800" letterSpacing={-0.3}>
          ⚡ Reanimated 4 + Tamagui
        </Text>
        <Text color="$colorSubtitle" fontSize={12} marginTop={2}>
          7 advanced animation examples
        </Text>
      </YStack>

      {/* Tab bar */}
      <YStack
        height={TAB_BAR_H}
        backgroundColor="$backgroundStrong"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <ScrollView
          ref={tabScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScroll}
          contentContainerStyle={styles.tabScrollContent}
        >
          {TABS.map((tab, i) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={i === activeIndex}
              onPress={() => navigateTo(i)}
              width={INDICATOR_W}
            />
          ))}
        </ScrollView>

        {/* Sliding underline indicator */}
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </YStack>

      {/* Demo content */}
      <Animated.View style={[styles.content, contentStyle]}>
        {TABS.map((tab, i) => {
          const Comp = tab.component;
          // Only render if visited — avoids sensor subscriptions for unseen screens
          if (!visitedTabs.has(i)) return null;
          return (
            <YStack
              key={tab.id}
              style={[
                styles.screen,
                i === activeIndex ? styles.screenVisible : styles.screenHidden,
              ]}
            >
              <Comp />
            </YStack>
          );
        })}
      </Animated.View>

      {/* Bottom nav pills */}
      <XStack
        paddingBottom={insets.bottom + 8}
        paddingTop="$2"
        paddingHorizontal="$4"
        backgroundColor="$backgroundStrong"
        borderTopWidth={1}
        borderTopColor="$borderColor"
        justifyContent="space-between"
        alignItems="center"
      >
        <TouchableOpacity
          onPress={() => navigateTo(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          style={{ opacity: activeIndex === 0 ? 0.3 : 1 }}
        >
          <YStack
            backgroundColor="$blue4"
            borderRadius="$4"
            paddingHorizontal="$4"
            paddingVertical="$2"
          >
            <Text color="$blue11" fontWeight="700">
              ← Prev
            </Text>
          </YStack>
        </TouchableOpacity>

        <Text color="$colorSubtitle" fontSize={13}>
          {activeIndex + 1} / {TAB_COUNT}
        </Text>

        <TouchableOpacity
          onPress={() => navigateTo(Math.min(TAB_COUNT - 1, activeIndex + 1))}
          disabled={activeIndex === TAB_COUNT - 1}
          style={{ opacity: activeIndex === TAB_COUNT - 1 ? 0.3 : 1 }}
        >
          <YStack
            backgroundColor="$blue4"
            borderRadius="$4"
            paddingHorizontal="$4"
            paddingVertical="$2"
          >
            <Text color="$blue11" fontWeight="700">
              Next →
            </Text>
          </YStack>
        </TouchableOpacity>
      </XStack>
    </YStack>
  );
}

// ─── Tab Button ────────────────────────────────────────────────────────────────

interface TabButtonProps {
  tab: Tab;
  isActive: boolean;
  onPress: () => void;
  width: number;
}

function TabButton({ tab, isActive, onPress, width }: TabButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabButton, { width }]}
      activeOpacity={0.7}
    >
      <Text fontSize={16}>{tab.emoji}</Text>
      <Text
        color={isActive ? '$blue11' : '$colorSubtitle'}
        fontSize={10}
        fontWeight={isActive ? '700' : '500'}
        marginTop={2}
        numberOfLines={1}
      >
        {tab.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabScroll: {
    flex: 1,
  },
  tabScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_BAR_H,
    paddingHorizontal: 4,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: INDICATOR_W,
    height: 2,
    backgroundColor: '#4361ee',
    borderRadius: 1,
  },
  content: {
    flex: 1,
  },
  screen: {
    ...StyleSheet.absoluteFillObject,
  },
  screenVisible: {
    zIndex: 1,
  },
  screenHidden: {
    zIndex: 0,
    pointerEvents: 'none',
  },
});
