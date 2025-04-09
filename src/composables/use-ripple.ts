import { materialDuration } from '@/config';
import { useEventListener } from '@vueuse/core';
import { type AnimationPlaybackControls, animate } from 'motion-v';
import { type ShallowRef, computed } from 'vue';

export type UseRippleOptions = {
  duration?: number;
  centered?: boolean;
  speedDelta?: number;
};

type Controls = {
  __value__: [string, AnimationPlaybackControls][];
  get: (id: string) => AnimationPlaybackControls | undefined;
  set: (id: string, controls: AnimationPlaybackControls) => void;
  remove: (id: string) => void;
};

type RippleData = {
  id: string | undefined;
  isAnimationEnded: boolean;
  isPressed: boolean;
  animation: 'entering' | 'exiting' | null;
  controls: AnimationPlaybackControls | undefined;
};

export function useRipple(
  ref: Readonly<ShallowRef<HTMLElement | null>>,
  {
    duration = materialDuration['extra-long-4'],
    centered = false,
    speedDelta = 2,
  }: UseRippleOptions = {},
) {
  const element = computed<HTMLElement | null>(() => {
    if (ref.value && '$el' in ref.value) {
      return ref.value.$el as HTMLElement | null;
    }
    return ref.value;
  });

  const controls: Controls = {
    __value__: [],
    get(id: string): AnimationPlaybackControls | undefined {
      const tuple = this.__value__.find((v) => v[0] === id);
      return tuple?.[1];
    },
    set(id: string, ctrls: AnimationPlaybackControls): void {
      this.remove(id);

      this.__value__.push([id, ctrls]);
    },
    remove(id: string): void {
      const current = this.get(id);
      current?.cancel();

      this.__value__ = this.__value__.filter((v) => v[0] !== id);
    },
  };

  function animateEnter(ripple: HTMLElement, onComplete: () => void) {
    return animate(
      ripple,
      { '--ripple-scale': 1 },
      {
        duration: (duration * 2) / 1000,
        onComplete,
      },
    );
  }

  function animateExit(ripple: HTMLElement, onComplete: () => void) {
    return animate(
      ripple,
      { opacity: 0 },
      {
        duration: duration / (speedDelta * 2) / 1000,
        onComplete,
      },
    );
  }

  useEventListener(element, 'mousedown', (e) => {
    if (!element.value) return;
    const el = e.currentTarget as HTMLElement;
    const bounding = el.getBoundingClientRect();
    const coordinates = {
      x: bounding.width / 2,
      y: bounding.height / 2,
    };
    if (!centered) {
      if (typeof MouseEvent !== 'undefined' && e instanceof MouseEvent) {
        coordinates.x = e.clientX - bounding.x;
        coordinates.y = e.clientY - bounding.y;
      }
    }

    const [ripple, data] = createRipple(controls, {
      ...coordinates,
      width: bounding.width,
      height: bounding.height,
    });
    element.value?.append(ripple);
    data.controls = animateEnter(ripple, () => {
      if (!data.isPressed) {
        data.animation = 'exiting';
        data.controls = animateExit(ripple, () => {
          ripple.remove();
        });
        return;
      }
      data.isAnimationEnded = true;
    });
  });

  useEventListener(element, 'click', (e: PointerEvent) => {
    if (!element.value) return;
    if (e.pointerType) return;
    const el = e.currentTarget as HTMLElement;
    const bounding = el.getBoundingClientRect();
    const coordinates = {
      x: bounding.width / 2,
      y: bounding.height / 2,
    };

    const [ripple, data] = createRipple(controls, {
      ...coordinates,
      width: bounding.width,
      height: bounding.height,
    });
    element.value?.append(ripple);
    data.controls = animateEnter(ripple, () => {
      if (!data.isPressed) {
        data.animation = 'exiting';
        data.controls = animateExit(ripple, () => {
          ripple.remove();
        });
        return;
      }
      data.isAnimationEnded = true;
    });
    data.isPressed = false;
    data.controls.speed = speedDelta * 2;
  });

  useEventListener(element, 'mouseup', () => {
    if (!element.value) return;
    const ripples =
      element.value.querySelectorAll<HTMLSpanElement>('span.ripple');
    ripples.forEach((ripple) => {
      const data = rippleData(ripple, controls);
      data.isPressed = false;
      if (data.animation !== 'entering') return;
      if (data.isAnimationEnded) {
        data.animation = 'exiting';
        data.isAnimationEnded = false;
        data.controls = animateExit(ripple, () => {
          ripple.remove();
        });
        return;
      }
      if (!data.controls) return;
      data.controls.speed = speedDelta * 2;
    });
  });
}

function createRipple(
  controls: Controls,
  {
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
): [HTMLElement, RippleData] {
  const ripple = document.createElement('span');
  const diameter = Math.max(width, height) * 2;
  ripple.style.setProperty('--ripple-x', `${x}px`);
  ripple.style.setProperty('--ripple-y', `${y}px`);
  ripple.className = 'ripple';
  ripple.style.setProperty('--ripple-diameter', `${diameter}px`);
  ripple.setAttribute('aria-hidden', 'true');

  const data = rippleData(ripple, controls);
  data.id = `ripple-${Math.random().toString(16).substring(2)}`;
  data.isPressed = true;
  data.isAnimationEnded = false;
  data.animation = 'entering';

  return [ripple, data];
}

function rippleData(ripple: HTMLElement, controls: Controls): RippleData {
  return {
    get id(): string | undefined {
      return ripple.dataset.id;
    },
    set id(value: string | undefined) {
      ripple.dataset.id = value;
    },
    get isAnimationEnded(): boolean {
      return ripple.dataset.isAnimationEnded === 'true';
    },
    set isAnimationEnded(value: boolean) {
      ripple.dataset.isAnimationEnded = `${value}`;
    },
    get isPressed(): boolean {
      return ripple.dataset.isPressed === 'true';
    },
    set isPressed(value: boolean) {
      ripple.dataset.isPressed = `${value}`;
    },
    get animation(): 'entering' | 'exiting' | null {
      const animation = ripple.dataset.animation;
      if (animation === 'entering' || animation === 'exiting') {
        return animation;
      }
      return null;
    },
    set animation(value: 'entering' | 'exiting' | null) {
      ripple.dataset.animation = value || undefined;
    },
    get controls(): AnimationPlaybackControls | undefined {
      if (!this.id) return undefined;
      return controls.get(this.id);
    },
    set controls(ctrls: AnimationPlaybackControls | undefined) {
      if (!this.id) return;
      if (ctrls) {
        controls.set(this.id, ctrls);
      } else {
        controls.remove(this.id);
      }
    },
  };
}
