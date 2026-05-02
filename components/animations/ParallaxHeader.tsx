/**
 * ParallaxHeader.tsx
 *
 * Scroll-Driven Parallax Header
 *
 * HOW IT WORKS:
 * A shared Animated.ScrollView drives three parallel transformations on the
 * header image via interpolation of the raw scroll offset:
 *   - translateY  → header moves up at 0.5× scroll speed (parallax depth)
 *   - scale       → image scales up when pulled down (rubber-band effect)
 *   - opacity     → header fades out as user scrolls past it
 *
 * All transforms run on the UI thread (useAnimatedStyle) → 60/120 fps even
 * during heavy JS work.
 *
 * PERFORMANCE NOTES:
 * • No state updates on scroll – everything lives in shared values.
 * • Images must be wrapped in Animated.View, NOT inside Tamagui styled
 *   components, because Tamagui's style reconciler can strip transform arrays.
 * • Use `scrollEventThrottle={1}` on the ScrollView to feed the shared value
 *   at every native scroll event.
 */

import React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolation,
} from 'react-native-reanimated';
import { YStack, XStack, Text, Card, Paragraph } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const HEADER_HEIGHT = SCREEN_H * 0.45;

const MOCK_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: `Workout ${i + 1}`,
  subtitle: `${20 + i * 5} min · ${200 + i * 30} kcal`,
}));

export function ParallaxHeader() {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Header image parallax + scale on overscroll
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.5],
      Extrapolation.CLAMP,
    );

    // Scale up when pulled past top (overscroll)
    const scale = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0],
      [1.6, 1],
      Extrapolation.CLAMP,
    );

    return { transform: [{ translateY }, { scale }] };
  });

  // Overlay opacity dims the image as we scroll
  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT * 0.7],
      [0.3, 0.85],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  // Title moves up and fades out faster than the image
  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT * 0.4],
      [1, 0],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT * 0.4],
      [0, -40],
      Extrapolation.CLAMP,
    );
    return { opacity, transform: [{ translateY }] };
  });

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Fixed header image – sits behind the scroll view */}
      <Animated.View
        style={[styles.headerContainer, headerAnimatedStyle]}
        pointerEvents="none"
      >
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
          }}
          style={styles.headerImage}
          resizeMode="cover"
        >
          {/* Gradient-like dark overlay */}
          <Animated.View style={[styles.overlay, overlayStyle]} />
        </ImageBackground>

        {/* Floating title on the image */}
        <Animated.View style={[styles.titleContainer, titleStyle]}>
          <Text
            color="white"
            fontSize={32}
            fontWeight="800"
            letterSpacing={-0.5}
          >
            My Workouts
          </Text>
          <Text color="rgba(255,255,255,0.75)" fontSize={16} marginTop={4}>
            Train smarter, not harder
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Scrollable content on top */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <YStack padding="$4" gap="$3">
          {MOCK_ITEMS.map((item) => (
            <Card
              key={item.id}
              bordered
              elevate
              backgroundColor="$backgroundStrong"
              borderRadius="$5"
              padding="$4"
              animation="quick"
              pressStyle={{ scale: 0.97, opacity: 0.9 }}
            >
              <XStack alignItems="center" gap="$3">
                <YStack
                  width={48}
                  height={48}
                  borderRadius="$4"
                  backgroundColor="$blue9"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="white" fontWeight="700">
                    {item.id + 1}
                  </Text>
                </YStack>
                <YStack flex={1}>
                  <Text color="$color" fontWeight="600" fontSize={16}>
                    {item.title}
                  </Text>
                  <Paragraph color="$colorSubtitle" fontSize={13}>
                    {item.subtitle}
                  </Paragraph>
                </YStack>
              </XStack>
            </Card>
          ))}
        </YStack>
      </Animated.ScrollView>
    </YStack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    zIndex: 0,
  },
  headerImage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
  },
});
