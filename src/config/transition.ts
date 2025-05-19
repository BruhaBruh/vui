import {
  type Duration,
  type DurationAsString,
  durationMapper,
} from './duration';
import { type Easing, type EasingAsString, easingMapper } from './easing';
import {
  type MaterialDuration,
  type MaterialDurationValue,
  materialDuration,
} from './material-duration';
import {
  type MaterialEasing,
  type MaterialEasingValue,
  materialEasing,
} from './material-easing';

type TransitionEasing = MaterialEasing | Easing;

type EasingValue<T extends TransitionEasing> = T extends MaterialEasing
  ? MaterialEasingValue<T>
  : T;

type TransitionEasingFunctions<E extends TransitionEasing> = {
  absoluteValue: EasingValue<E>;
  asMotion(): EasingValue<E>;
  asString(): EasingAsString<EasingValue<E>>;
};

type TransitionDuration = MaterialDuration | Duration;

type DurationValue<T extends TransitionDuration> = T extends MaterialDuration
  ? MaterialDurationValue<T>
  : T;

type TransitionDurationFunctions<D extends TransitionDuration> = {
  absoluteValue: DurationValue<D>;
  asMotion(): DurationValue<D>;
  asString(): DurationAsString<DurationValue<D>>;
};

type Transition<E extends TransitionEasing, D extends TransitionDuration> = {
  easing: E & TransitionEasingFunctions<E>;
  duration: D & TransitionDurationFunctions<D>;
  withEasing<T extends TransitionEasing>(value: T): Transition<T, D>;
  withDuration<T extends TransitionDuration>(value: T): Transition<E, T>;
  asMotion(): {
    easing: EasingValue<E>;
    duration: DurationValue<D>;
  };
  preset: DefaultPresets;
};

type DefaultPresets = {
  default: Transition<'standard', 'short-4'>,
  long: {
    beginEnd: Transition<'emphasized', 'long-2'>;
    enter: Transition<'emphasized-decelerate', 'medium-4'>;
    exit: Transition<'emphasized-accelerate', 'short-4'>;
  };
  short: {
    beginEnd: Transition<'standard', 'medium-2'>;
    enter: Transition<'standard-decelerate', 'medium-1'>;
    exit: Transition<'standard-accelerate', 'short-4'>;
  };
};

const defaultPresets: DefaultPresets = {
  get default() {
    return createTransition({ easing: 'standard', duration: 'short-4' })
  },
  long: {
    get beginEnd() {
      return createTransition({ easing: 'emphasized', duration: 'long-2' });
    },
    get enter() {
      return createTransition({
        easing: 'emphasized-decelerate',
        duration: 'medium-4',
      });
    },
    get exit() {
      return createTransition({
        easing: 'emphasized-accelerate',
        duration: 'short-4',
      });
    },
  },
  short: {
    get beginEnd() {
      return createTransition({ easing: 'standard', duration: 'medium-2' });
    },
    get enter() {
      return createTransition({
        easing: 'standard-decelerate',
        duration: 'medium-1',
      });
    },
    get exit() {
      return createTransition({
        easing: 'standard-accelerate',
        duration: 'short-4',
      });
    },
  },
};

function createTransition<
  E extends TransitionEasing = 'standard',
  D extends TransitionDuration = 'short-4',
>({ easing, duration }: { easing: E; duration: D }): Transition<E, D> {
  const easingFunctions: TransitionEasingFunctions<E> = {
    get absoluteValue() {
      if (typeof easing === 'string') {
        if (materialEasing.has(easing))
          return materialEasing.value(easing) as EasingValue<E>;
        throw new Error('invalid material easing');
      }
      return easing as EasingValue<E>;
    },
    asMotion() {
      return easingMapper.asMotion(this.absoluteValue);
    },
    asString() {
      return easingMapper.asString(this.absoluteValue);
    },
  };

  const durationFunctions: TransitionDurationFunctions<D> = {
    get absoluteValue() {
      if (typeof duration === 'string') {
        if (materialDuration.has(duration))
          return materialDuration.value(duration) as DurationValue<D>;
        throw new Error('invalid material duration');
      }
      return duration as DurationValue<D>;
    },
    asMotion() {
      return durationMapper.asMotion(this.absoluteValue) as DurationValue<D>;
    },
    asString() {
      return durationMapper.asString(this.absoluteValue);
    },
  };

  return {
    preset: defaultPresets,
    easing: Object.assign(easing, easingFunctions) as Transition<
      E,
      D
    >['easing'],
    duration: Object.assign(duration, durationFunctions) as Transition<
      E,
      D
    >['duration'],
    withEasing<T extends TransitionEasing>(value: T): Transition<T, D> {
      return createTransition({ easing: value, duration }) as Transition<T, D>;
    },
    withDuration<T extends TransitionDuration>(value: T): Transition<E, T> {
      return createTransition({ easing, duration: value }) as Transition<E, T>;
    },
    asMotion() {
      return {
        easing: this.easing.asMotion(),
        duration: this.duration.asMotion(),
      };
    },
  };
}

export const transitionConfig = defaultPresets.short.beginEnd;
