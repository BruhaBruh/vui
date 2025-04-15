import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva(['group/container', 'flex items-stretch justify-center'], {
  variants: {
    color: {
      surface: ['bg-surface', 'text-on-surface'],
      'surface-container': ['bg-surface-container', 'text-on-surface'],
      'inverse-surface': ['bg-inverse-surface', 'text-inverse-on-surface'],
      primary: ['bg-primary', 'text-on-primary'],
      'primary-container': [
        'bg-primary-container',
        'text-on-primary-container',
      ],
      secondary: ['bg-secondary', 'text-on-secondary'],
      'secondary-container': [
        'bg-secondary-container',
        'text-on-secondary-container',
      ],
      info: ['bg-info', 'text-on-info'],
      'info-container': ['bg-info-container', 'text-on-info-container'],
      success: ['bg-success', 'text-on-success'],
      'success-container': [
        'bg-success-container',
        'text-on-success-container',
      ],
      caution: ['bg-caution', 'text-on-caution'],
      'caution-container': [
        'bg-caution-container',
        'text-on-caution-container',
      ],
      critical: ['bg-critical', 'text-on-critical'],
      'critical-container': [
        'bg-critical-container',
        'text-on-critical-container',
      ],
      none: [],
    },
  },
  defaultVariants: {
    color: 'none',
  },
});

const contentVariants = cva(['container--content', 'flex-1', 'px-md'], {
  variants: {
    variant: {
      grid: 'grid grid-cols-12 gap-md',
      flex: 'flex gap-md',
      none: [],
    },
    fluid: {
      true: [],
      false: 'container',
    },
    padding: {
      top: 'pt-3xl',
      bottom: 'pb-3xl',
      both: 'py-3xl',
      none: [],
    },
  },
  defaultVariants: {
    variant: 'none',
    fluid: false,
    padding: 'none',
  },
});

export const containerVariants = Object.assign(variants, {
  content: contentVariants,
});

export type ContainerVariants = VariantProps<typeof containerVariants>;

export type ContainerContentVariants = VariantProps<
  typeof containerVariants.content
>
