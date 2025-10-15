import { materialDuration } from '@/config';
import { useEventListener } from '@vueuse/core';
import { type AnimationPlaybackControls, animate } from 'motion-v';
import { type ShallowRef, computed, onUnmounted } from 'vue';

export interface UseRippleOptions {
  duration?: number;
  centered?: boolean;
  speedDelta?: number;
}

interface RippleState {
  id: string;
  isAnimationEnded: boolean;
  isPressed: boolean;
  animation: 'entering' | 'exiting' | null;
}

export function useRipple(
  ref: Readonly<ShallowRef<HTMLElement | null>>,
  options: UseRippleOptions = {},
) {
  const {
    duration = materialDuration['extra-long-4'],
    centered = false,
    speedDelta = 2,
  } = options;

  const element = computed<HTMLElement | null>(() => {
    if (ref.value && '$el' in ref.value) {
      return ref.value.$el as HTMLElement | null;
    }
    return ref.value;
  });

  // Используем Map для управления анимациями
  const activeAnimations = new Map<string, AnimationPlaybackControls>();

  function cleanupAnimation(id: string): void {
    const controls = activeAnimations.get(id);
    if (controls) {
      controls.cancel();
      activeAnimations.delete(id);
    }
  }

  function animateEnter(
    ripple: HTMLElement,
    onComplete: () => void,
  ): AnimationPlaybackControls {
    return animate(
      ripple,
      { '--ripple-scale': 1 },
      {
        duration: (duration * 2) / 1000,
        onComplete,
      },
    );
  }

  function animateExit(
    ripple: HTMLElement,
    onComplete: () => void,
  ): AnimationPlaybackControls {
    return animate(
      ripple,
      { opacity: 0 },
      {
        duration: duration / (speedDelta * 2) / 1000,
        onComplete,
      },
    );
  }

  function getRippleState(ripple: HTMLElement): RippleState {
    return {
      get id(): string {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return ripple.dataset.id!;
      },
      set id(value: string) {
        ripple.dataset.id = value;
      },
      get isAnimationEnded(): boolean {
        return ripple.dataset.isAnimationEnded === 'true';
      },
      set isAnimationEnded(value: boolean) {
        ripple.dataset.isAnimationEnded = String(value);
      },
      get isPressed(): boolean {
        return ripple.dataset.isPressed === 'true';
      },
      set isPressed(value: boolean) {
        ripple.dataset.isPressed = String(value);
      },
      get animation(): 'entering' | 'exiting' | null {
        const anim = ripple.dataset.animation;
        return anim === 'entering' || anim === 'exiting' ? anim : null;
      },
      set animation(value: 'entering' | 'exiting' | null) {
        if (value) {
          ripple.dataset.animation = value;
        } else {
          delete ripple.dataset.animation;
        }
      },
    };
  }

  function createRipple(
    x: number,
    y: number,
    width: number,
    height: number,
  ): [HTMLElement, RippleState] {
    const ripple = document.createElement('span');
    const diameter = Math.max(width, height) * 2;
    const id = `ripple-${crypto.randomUUID()}`;

    ripple.className = 'ripple';
    ripple.setAttribute('aria-hidden', 'true');
    ripple.style.setProperty('--ripple-x', `${x}px`);
    ripple.style.setProperty('--ripple-y', `${y}px`);
    ripple.style.setProperty('--ripple-diameter', `${diameter}px`);
    ripple.style.setProperty('--ripple-scale', '0');
    ripple.dataset.id = id;
    ripple.dataset.isPressed = 'true';
    ripple.dataset.isAnimationEnded = 'false';
    ripple.dataset.animation = 'entering';

    const state = getRippleState(ripple);
    return [ripple, state];
  }

  function handleRippleComplete(ripple: HTMLElement, state: RippleState): void {
    if (!state.isPressed) {
      state.animation = 'exiting';
      const controls = animateExit(ripple, () => {
        cleanupAnimation(state.id);
        ripple.remove();
      });
      activeAnimations.set(state.id, controls);
      return;
    }
    state.isAnimationEnded = true;
  }

  function startRipple(x: number, y: number): void {
    if (!element.value) return;

    const bounding = element.value.getBoundingClientRect();
    const [ripple, state] = createRipple(x, y, bounding.width, bounding.height);

    element.value.append(ripple);

    const controls = animateEnter(ripple, () => {
      handleRippleComplete(ripple, state);
    });

    activeAnimations.set(state.id, controls);
  }

  useEventListener(element, 'mousedown', (e: MouseEvent) => {
    if (!element.value) return;

    const bounding = element.value.getBoundingClientRect();
    const x = centered ? bounding.width / 2 : e.clientX - bounding.x;
    const y = centered ? bounding.height / 2 : e.clientY - bounding.y;

    startRipple(x, y);
  });

  useEventListener(element, 'click', (e: PointerEvent) => {
    if (!element.value || e.pointerType) return;

    const bounding = element.value.getBoundingClientRect();
    const [ripple, state] = createRipple(
      bounding.width / 2,
      bounding.height / 2,
      bounding.width,
      bounding.height,
    );

    element.value.append(ripple);

    const controls = animateEnter(ripple, () => {
      handleRippleComplete(ripple, state);
    });

    activeAnimations.set(state.id, controls);
    state.isPressed = false;
    controls.speed = speedDelta * 2;
  });

  useEventListener(element, 'mouseup', () => {
    if (!element.value) return;

    const ripples =
      element.value.querySelectorAll<HTMLSpanElement>('span.ripple');

    ripples.forEach((ripple) => {
      const state = getRippleState(ripple);
      state.isPressed = false;

      if (state.animation !== 'entering') return;

      const currentControls = activeAnimations.get(state.id);
      if (!currentControls) return;

      if (state.isAnimationEnded) {
        state.animation = 'exiting';
        state.isAnimationEnded = false;

        const exitControls = animateExit(ripple, () => {
          cleanupAnimation(state.id);
          ripple.remove();
        });

        activeAnimations.set(state.id, exitControls);
      } else {
        currentControls.speed = speedDelta * 2;
      }
    });
  });

  // Очистка при размонтировании компонента
  onUnmounted(() => {
    activeAnimations.forEach((controls) => controls.cancel());
    activeAnimations.clear();
  });
}
