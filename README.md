# Appnicofit — Advanced Animations with Reanimated 4 + Tamagui

A production-quality showcase of **7 advanced animation examples** built with:
- **React Native** (0.76 / Expo 52)
- **Reanimated 4** (`react-native-reanimated` ~3.16)
- **Tamagui** (^1.121) with `@tamagui/animations-reanimated`
- **React Native Gesture Handler** v2 (Gesture API)
- **expo-sensors** for accelerometer

---

## Quick Start

```bash
npm install
npx expo start
```

---

## Project Structure

```
components/
  animations/
    ParallaxHeader.tsx          # 1. Scroll-Driven Parallax Header
    DraggableCard.tsx           # 2. Draggable Card (momentum + snap + spring)
    AdvancedBottomSheet.tsx     # 3. Bottom Sheet (3 snap points + gesture)
    StaggeredList.tsx           # 4. Staggered List entrance animation
    Flip3DModal.tsx             # 5. 3D Y-axis flip card
    SharedElementTransition.tsx # 6. Card → Modal shared element transition
    SensorTiltEffect.tsx        # 7. Accelerometer tilt parallax
    AdvancedAnimationsDemo.tsx  # Root screen — tab navigation between examples
    index.ts                    # Barrel exports
tamagui.config.ts               # Tamagui + Reanimated animation presets
App.tsx                         # Root: GestureHandler + TamaguiProvider
babel.config.js                 # Tamagui babel plugin + Reanimated plugin
metro.config.js                 # Metro + Tamagui metro plugin
```

---

## Animation Examples

### 1. Scroll-Driven Parallax Header (`ParallaxHeader.tsx`)

**How it works:** An `Animated.ScrollView` drives a `scrollY` shared value via
`useAnimatedScrollHandler`. Three transforms are derived via `interpolate`:
- `translateY` → image scrolls at 0.5× speed (parallax depth)
- `scale` → overscroll rubber-band expansion
- `opacity` → header and title fade out as content is scrolled into view

**Key APIs:** `useAnimatedScrollHandler`, `interpolate`, `Extrapolation.CLAMP`

**Performance:** Zero JS state updates on scroll. All math runs on the UI thread.

---

### 2. Draggable Card (`DraggableCard.tsx`)

**How it works:** A `Gesture.Pan()` from RNGH v2 writes to `translateX` / `translateY`
shared values. On gesture end, velocity + position determine whether to spring back
or fling off-screen. `interpolate` drives a rotation tilt and action indicator opacity.

**Key APIs:** `Gesture.Pan`, `withSpring`, `withTiming`, `runOnJS`

**Performance:** Gesture callbacks run as worklets on the UI thread. `runOnJS` is
used sparingly — only for callbacks that need to cross to the JS thread.

---

### 3. Advanced Bottom Sheet (`AdvancedBottomSheet.tsx`)

**How it works:** A single `translateY` shared value positions the sheet. Three
snap points (12%, 55%, 90% of screen) are stored as pixel offsets. On gesture
end, a `findNearestSnap` function (running as a worklet) picks the closest snap
with a velocity bias. The backdrop opacity is derived from `translateY` directly.

**Key APIs:** `Gesture.Pan`, `withSpring` with velocity, `interpolate`

**Performance:** No `setTimeout` or async logic — spring physics handle all
momentum natively.

---

### 4. Staggered List (`StaggeredList.tsx`)

**How it works:** Each list item has a dedicated `progress` shared value (0 → 1).
`withDelay(index * 75ms, withSpring(1))` fires in sequence to cascade the
entrance. Each item derives `opacity`, `translateY`, and `scale` from its progress.

**Key APIs:** `withDelay`, `withSpring`, `useAnimatedStyle`

**Performance:** All shared values live at the parent level (hooks rules respected).
For very long lists, only trigger animations for visible items via
`onViewableItemsChanged`.

---

### 5. 3D Flip Card (`Flip3DModal.tsx`)

**How it works:** A single `flip` value (0 → 1) controls both faces. The front
face rotates from 0° to -90° during the first half; the back face rotates from
90° to 0° during the second half. `opacity` swaps at the midpoint as a robust
cross-platform fallback for `backfaceVisibility`. `withTiming + Easing.inOut(cubic)`
provides constant angular velocity.

**Key APIs:** `withTiming`, `Easing`, `interpolate`

**Performance:** `perspective` must be the first transform in the array on Android.
Use `withTiming` (not `withSpring`) for rotation — spring overshoot on rotation
looks unnatural.

---

### 6. Shared Element Transition (`SharedElementTransition.tsx`)

**How it works:** On tap, `measureInWindow` captures the card's screen coordinates.
These are stored in a shared value `origin`. A `progress` value (0 → 1) drives
the `left`, `top`, `width`, `height`, and `borderRadius` of an absolute overlay
from card dimensions to full screen. Content fades/slides in during the second half.

**Key APIs:** `measureInWindow`, `withSpring`, `useAnimatedStyle`, `runOnJS`

**Performance:** The overlay is absolutely positioned outside the list, so list
items are never re-rendered during the animation.

---

### 7. Sensor Tilt Effect (`SensorTiltEffect.tsx`)

**How it works:** `expo-sensors` Accelerometer feeds {x, y} gravity at 20 Hz.
A low-pass filter (α = 0.85) smooths jitter. Filtered values are written to
`tiltX` / `tiltY` shared values via `withSpring` for natural damping. Three layers
translate at different multipliers (0.4×, 1×, 1.8×) creating parallax depth.

**Key APIs:** `Accelerometer`, `useSharedValue`, `withSpring`, `interpolate`

**Performance:** Never call `setState` on sensor readings. Always unsubscribe on
unmount. Pause the subscription when the app is backgrounded.

---

## Tamagui Animation Presets (`tamagui.config.ts`)

| Preset | Type | Config |
|--------|------|--------|
| `bouncy` | spring | damping:9, stiffness:150 |
| `quick` | spring | damping:20, stiffness:250 |
| `snappy` | spring | damping:25, stiffness:300 |
| `medium` | spring | damping:15, stiffness:120 |
| `lazy` | spring | damping:18, stiffness:50 |
| `slow` | spring | damping:15, stiffness:40 |
| `100ms` | timing | 100ms |
| `200ms` | timing | 200ms |

Use these as the `animation` prop on any Tamagui component:

```tsx
<Card animation="bouncy" pressStyle={{ scale: 0.97 }}>
```

---

## Best Practices Applied

1. **No hooks in loops or conditionals** — shared values and `useAnimatedStyle`
   are always called at the top level of the component.
2. **Worklet-first** — all animation callbacks (`onScroll`, `onUpdate`, `onEnd`)
   run as worklets on the UI thread.
3. **`runOnJS` only at boundaries** — used only to update React state or call JS
   callbacks after animations complete.
4. **`interpolate` with `Extrapolation.CLAMP`** — prevents values from shooting
   past intended bounds.
5. **Spring config via shared constants** — `SPRING_CONFIG` objects are defined
   outside components to avoid re-creation on render.
6. **Sensor cleanup** — `Accelerometer.removeAllListeners()` called in
   `useEffect` cleanup.
