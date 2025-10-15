<script setup lang="ts">
import { useInteractions } from '@/composables';
import type { PropsPolymorphic } from '@/types';
import { computed, useId, useTemplateRef } from 'vue';
import { type FieldInputVariants, fieldVariants } from './ui-field.variants';
import { AnimatePresence } from 'motion-v';
import { Icon, type IconProps, MotionComponent } from '@/components/utility';
import { transitionConfig } from '@/config';

export type FieldProps = PropsPolymorphic & {
  leading?: IconProps['icon'];
  trailing?: IconProps['icon'];
  size?: FieldInputVariants['size'];
  alwaysShowLabel?: boolean;
  invalid?: boolean;
};

const {
  leading,
  trailing,
  size = 'lg',
  alwaysShowLabel = false,
  invalid = false,
  as = 'div',
} = defineProps<FieldProps>();

defineOptions({
  inheritAttrs: false,
});

const elementRef = useTemplateRef<HTMLElement | null>('field');

const labelId = useId();
const inputId = useId();
const descriptionId = useId();
const errorId = useId();

function focusInput() {
  const input = elementRef.value?.querySelector(
    `#${inputId}`,
  ) as HTMLElement | null;
  input?.focus();
}

const iconSize = computed(() => {
  if (size === 'sm') return 'var(--spacing-4h)';
  if (size === 'md') return 'var(--spacing-5)';
  return 'var(--spacing-6)';
});

const iconMargin = computed(() => {
  if (size === 'sm') return 'var(--spacing-2xs)';
  if (size === 'md') return 'var(--spacing-xs)';
  return 'var(--spacing-sm)';
});

const { isDisabled } = useInteractions(elementRef, {
  focusVisible: false,
  press: false,
});
</script>

<template>
  <slot name="before" :inputId :labelId />
  <component
    :is="as"
    ref="field"
    :class="fieldVariants()"
    :data-invalid="Boolean($slots.error) || invalid ? true : undefined"
    v-bind="$attrs"
    v-tw-merge
    @click="focusInput()"
  >
    <div :class="fieldVariants.input({ size })" v-tw-merge>
      <AnimatePresence mode="wait" :initial="false">
        <MotionComponent
          as-child
          v-if="leading || $slots.leading"
          :key="JSON.stringify(leading)"
          :initial="{
            width: 0,
            height: 0,
            opacity: 0,
            marginRight: 0,
            transition: transitionConfig.preset.short.enter.asMotion(),
          }"
          :animate="{
            width: iconSize,
            height: iconSize,
            opacity: 1,
            marginRight: iconMargin,
            transition: transitionConfig.preset.short.beginEnd.asMotion(),
          }"
          :exit="{
            width: 0,
            height: 0,
            opacity: 0,
            marginRight: 0,
            transition: transitionConfig.preset.short.exit.asMotion(),
          }"
          :class="[
            fieldVariants.icon({ size }),
            'field--leading-icon',
            {
              sm: 'mr-2xs',
              md: 'mr-xs',
              lg: 'mr-2xs',
            }[size ?? 'lg'],
          ]"
        >
          <Icon v-if="leading" :icon="leading" />
          <slot v-else name="leading" />
        </MotionComponent>
      </AnimatePresence>
      <div :class="fieldVariants.inputContent()">
        <slot
          v-if="size !== 'sm' || alwaysShowLabel"
          name="label"
          :id="labelId"
          :for="inputId"
          :class="fieldVariants.label()"
        />
        <slot
          :class="fieldVariants.inputField()"
          :disabled="isDisabled"
          :id="inputId"
          tabindex="0"
          :aria-labelledby="$slots.label ? labelId : undefined"
          :aria-describedby="$slots.description ? descriptionId : undefined"
          :aria-invalid="$slots.error ? 'true' : undefined"
          :aria-errormessage="$slots.error ? errorId : undefined"
        />
      </div>
      <AnimatePresence mode="wait" :initial="false">
        <MotionComponent
          as-child
          v-if="trailing || $slots.trailing"
          :key="JSON.stringify(trailing)"
          :initial="{
            width: 0,
            height: 0,
            opacity: 0,
            marginLeft: 0,
            transition: transitionConfig.preset.short.enter.asMotion(),
          }"
          :animate="{
            width: iconSize,
            height: iconSize,
            opacity: 1,
            marginLeft: iconMargin,
            transition: transitionConfig.preset.short.beginEnd.asMotion(),
          }"
          :exit="{
            width: 0,
            height: 0,
            opacity: 0,
            marginLeft: 0,
            transition: transitionConfig.preset.short.exit.asMotion(),
          }"
          :class="[
            fieldVariants.icon({ size }),
            'field--trailing-icon',
            {
              sm: 'ml-2xs',
              md: 'ml-xs',
              lg: 'ml-2xs',
            }[size ?? 'lg'],
          ]"
        >
          <Icon v-if="trailing" :icon="trailing" />
          <slot v-else name="trailing" />
        </MotionComponent>
      </AnimatePresence>
    </div>
    <slot
      name="description"
      :id="descriptionId"
      :class="fieldVariants.description({ size })"
    />
    <slot
      name="error"
      :id="errorId"
      role="alert"
      :class="fieldVariants.error({ size })"
    />
  </component>
  <slot name="after" :inputId :labelId />
</template>
