<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  ref,
  shallowRef,
  useId,
  useTemplateRef,
} from 'vue';
import { computedVariants, useInteractions } from '@/composables';
import {
  type SliderThumbVariants,
  type SliderTrackVariants,
  sliderVariants,
} from './ui-slider.variants';
import { default as SliderThumb } from './ui-slider-thumb.vue';
import { motion } from 'motion-v';
import { materialDuration, transitionConfig } from '@/config';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';

export type SliderProps = MotionComponentProps & {
  min?: number;
  max?: number;
  step?: number;
  stepMultiplier?: number;
  disabled?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  variant?: 'centered' | 'continuous';
  color?: SliderThumbVariants['color'];
};

const {
  min = 0,
  max = 100,
  step = 1,
  stepMultiplier = 10,
  disabled,
  variant = 'continuous',
  color,
  formatOptions,
  as = 'div',
  initial,
  animate,
  exit,
  ...motionProps
} = defineProps<SliderProps>();

const elementRef = useTemplateRef<HTMLElement>('slider');

const id = useId();

const abortController = shallowRef(new AbortController());

const value = defineModel<number | number[]>('value', {
  default: 0,
});

const valueArray = computed(() =>
  (typeof value.value === 'number' ? [value.value] : value.value).map((v) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
  }),
);

type Thumb = {
  id: string;
  index: number;
  value: number;
  minValue: number;
  maxValue: number;
  percent: number;
};

const thumbs = computed<Thumb[]>(() => {
  return valueArray.value.map((v, i, arr) => {
    const val = v - min;
    const diff = max - min;
    return {
      id: `${id}-thumb-${i}`,
      index: i,
      value: v,
      minValue: arr[i - 1] ?? min,
      maxValue: arr[i + 1] ?? max,
      percent: (val / diff) * 100,
    };
  });
});

const tracks = computed(() => {
  return Array(thumbs.value.length + 1)
    .fill(null)
    .map((_, index, arr) => {
      const isFirst = index === 0;
      const isLast = index + 1 === arr.length;
      const inCenter = !isFirst && !isLast;

      const percentBefore = thumbs.value[index - 1]?.percent ?? 0;
      const percentCurrent = thumbs.value[index]?.percent ?? 0;
      let trackPercent = percentCurrent - percentBefore;
      if (isLast) {
        trackPercent = 100 - percentBefore;
      }

      let position: SliderTrackVariants['position'] = 'center';
      if (isFirst) {
        position = 'left';
      } else if (isLast) {
        position = 'right';
      }

      let isActive = false;
      const isOneThumbAndFirst = thumbs.value.length === 1 && isFirst;
      const isTwoThumbsAndCenter = thumbs.value.length === 2 && inCenter;
      if (
        variant === 'continuous' &&
        (isOneThumbAndFirst || isTwoThumbsAndCenter)
      ) {
        isActive = true;
      }

      return {
        id: `${id}-track-${index}`,
        width: `calc(${trackPercent}% - ${inCenter ? 'var(--spacing-4)' : 'var(--spacing-2)'})`,
        left: isFirst ? '0%' : `calc(${percentBefore}% + var(--spacing-2))`,
        position,
        isActive,
      };
    });
});

const currentDraggingThumbId = ref<string | null>(null);

useInteractions(elementRef, {
  disabled: false,
});

onBeforeUnmount(() => {
  abortController.value.abort();
});

function clamp(minValue: number, currentValue: number, maxValue: number) {
  return Math.min(maxValue, Math.max(minValue, currentValue));
}

function calculateValue(el: HTMLElement, x: number) {
  const bounding = el.getBoundingClientRect();
  const percent = clamp(0, (x - bounding.x) / bounding.width, 1);
  const diff = max - min;
  const diffValue = diff * percent;
  const val = min + diffValue;
  const stepDiff = val % step;
  if (stepDiff < step / 2) {
    return val - stepDiff;
  }
  return val + step - stepDiff;
}

function nearestThumb(val: number): Thumb | undefined {
  const valuesWithDiff = thumbs.value.map((thumb) => ({
    thumb,
    diff: Math.max(val, thumb.value) - Math.min(val, thumb.value),
  }));
  const sorted = valuesWithDiff.sort((a, b) => {
    if (a.diff !== b.diff) return a.diff - b.diff;
    if (val < a.thumb.value) {
      return a.thumb.index - b.thumb.index;
    }
    return b.thumb.index - a.thumb.index;
  });
  return sorted[0]?.thumb;
}

function setValue(thumb: Thumb, val: number) {
  if (typeof value.value === 'number') {
    value.value = val;
  } else {
    value.value[thumb.index] = val;
  }
}

function onChange(
  thumb: Thumb,
  changeType: 'inc' | 'dec' | 'inc-large' | 'dec-large' | 'min' | 'max',
) {
  if (changeType === 'min') {
    setValue(thumb, thumb.minValue);
  } else if (changeType === 'max') {
    setValue(thumb, thumb.maxValue);
  } else if (changeType === 'inc-large') {
    setValue(
      thumb,
      clamp(
        thumb.minValue,
        thumb.value + step * stepMultiplier,
        thumb.maxValue,
      ),
    );
  } else if (changeType === 'dec-large') {
    setValue(
      thumb,
      clamp(
        thumb.minValue,
        thumb.value - step * stepMultiplier,
        thumb.maxValue,
      ),
    );
  } else if (changeType === 'inc') {
    setValue(thumb, clamp(thumb.minValue, thumb.value + step, thumb.maxValue));
  } else if (changeType === 'dec') {
    setValue(thumb, clamp(thumb.minValue, thumb.value - step, thumb.maxValue));
  }
}

function onStart(e: MouseEvent | TouchEvent) {
  if (disabled) return;
  const element = e.currentTarget as HTMLElement | null;
  if (!element) return;

  let x: number | null = null;
  if (e instanceof MouseEvent) {
    x = e.x;
  } else if (e instanceof TouchEvent) {
    x = e.touches[0].clientX;
  }
  if (x === null) return;

  const initialValue = calculateValue(element, x);
  const thumb = nearestThumb(initialValue);
  if (!thumb) return;

  setValue(thumb, initialValue);
  currentDraggingThumbId.value = thumb.id;

  abortController.value.abort();
  abortController.value = new AbortController();

  window.addEventListener(
    'mousemove',
    (ev) => recalculate({ x: ev.x, thumb, element }),
    { signal: abortController.value.signal },
  );
  window.addEventListener(
    'mouseup',
    (ev) => {
      abortController.value.abort();
      currentDraggingThumbId.value = null;
      recalculate({ x: ev.x, thumb, element });
    },
    { signal: abortController.value.signal },
  );
  window.addEventListener(
    'touchmove',
    (ev) => {
      const touch = ev.touches[0];
      if (!touch) return;
      recalculate({ x: touch.clientX, thumb, element });
    },
    { signal: abortController.value.signal },
  );
  window.addEventListener(
    'touchend',
    (ev) => {
      abortController.value.abort();
      currentDraggingThumbId.value = null;
      const touch = ev.touches[0];
      if (!touch) return;
      recalculate({ x: touch.clientX, thumb, element });
    },
    { signal: abortController.value.signal },
  );
}

function recalculate({
  x,
  thumb,
  element,
}: {
  x: number;
  thumb: Thumb;
  element: HTMLElement;
}) {
  const minValue = valueArray.value[thumb.index - 1] ?? min;
  const maxValue = valueArray.value[thumb.index + 1] ?? max;
  const newValue = calculateValue(element, x);
  setValue(thumb, clamp(minValue, newValue, maxValue));
  (document.querySelector(`#${thumb.id}`) as HTMLElement | null)?.focus();
}

const {
  initial: initialObject,
  animate: animateObject,
  exit: exitObject,
} = computedVariants(() => ({
  initial,
  animate,
  exit,
}));
</script>

<template>
  <MotionComponent
    :as
    ref="slider"
    v-bind="motionProps"
    :initial="{
      transition: transitionConfig.preset.short.enter.asMotion(),
      ...initialObject,
    }"
    :animate="{
      transition: transitionConfig.preset.short.beginEnd.asMotion(),
      ...animateObject,
    }"
    :exit="{
      transition: transitionConfig.preset.short.exit.asMotion(),
      ...exitObject,
    }"
    :id
    :data-is-disabled="disabled"
    @touchstart="onStart"
    @mousedown="onStart"
    :class="sliderVariants()"
    v-tw-merge
  >
    <SliderThumb
      v-for="thumb in thumbs"
      :key="thumb.id"
      :dragging="thumb.id === currentDraggingThumbId"
      :format-options
      :color
      :disabled
      @change="(e) => onChange(thumb, e)"
      v-bind="thumb"
    />
    <motion.div
      aria-hidden
      v-for="track in tracks"
      :key="track.id"
      :animate="{
        width: track.width,
        left: track.left,
        transition: {
          ...transitionConfig.preset.short.beginEnd.asMotion(),
          duration: materialDuration.asMotion('short-2'),
        },
      }"
      :style="{
        '--ui-slider-before-width': `${elementRef?.clientWidth ?? 1920}px`,
      }"
      :class="[
        sliderVariants.track({ position: track.position }),
        track.isActive
          ? sliderVariants.activeTrack({ color })
          : sliderVariants.inactiveTrack({ color }),
      ]"
      v-tw-merge
    />
  </MotionComponent>
</template>
