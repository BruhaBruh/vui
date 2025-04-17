<script setup lang="ts">
import {
  Carousel,
  CarouselDots,
  CarouselNextButton,
  CarouselPrevButton,
  CarouselSlide,
  CarouselSlideContent,
  CarouselView,
} from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';

const slides = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const code = `
<Carousel :options="{ loop: true, slidesToScroll: 1, align: 'center' }">
  <CarouselView>
    <template #left>
      <CarouselPrevButton />
    </template>
    <CarouselSlide v-for="slide in slides" :key="slide" class="basis-1/3">
      <CarouselSlideContent>
        {{ slide }}
      </CarouselSlideContent>
    </CarouselSlide>
    <template #right>
      <CarouselNextButton />
    </template>
  </CarouselView>
  <template #after>
    <CarouselDots />
  </template>
</Carousel>
`;
</script>

<template>
  <StorybookPlayground>
    <Carousel
      class="w-full"
      :options="{ loop: true, slidesToScroll: 1, align: 'center' }"
    >
      <CarouselView>
        <template #left>
          <CarouselPrevButton />
        </template>
        <CarouselSlide v-for="slide in slides" :key="slide" class="basis-1/3">
          <CarouselSlideContent
            class="flex h-96 items-center justify-center rounded-lg typography-display-large bg-surface-container border-outline"
          >
            {{ slide }}
          </CarouselSlideContent>
        </CarouselSlide>
        <template #right>
          <CarouselNextButton />
        </template>
      </CarouselView>
      <template #after>
        <CarouselDots />
      </template>
    </Carousel>
  </StorybookPlayground>
  <StorybookCode name="Carousel" :code />
  <StorybookStory name="With Buttons">
    <Carousel
      class="w-full"
      :options="{ loop: true, slidesToScroll: 1, align: 'center' }"
    >
      <CarouselView>
        <template #left>
          <CarouselPrevButton />
        </template>
        <CarouselSlide v-for="slide in slides" :key="slide" class="basis-1/3">
          <CarouselSlideContent
            class="flex h-96 items-center justify-center rounded-lg typography-display-large bg-surface-container border-outline"
          >
            {{ slide }}
          </CarouselSlideContent>
        </CarouselSlide>
        <template #right>
          <CarouselNextButton />
        </template>
      </CarouselView>
    </Carousel>
  </StorybookStory>
  <StorybookStory name="With Dots">
    <Carousel
      class="w-full"
      :options="{ loop: true, slidesToScroll: 1, align: 'center' }"
    >
      <CarouselView>
        <CarouselSlide v-for="slide in slides" :key="slide" class="basis-1/3">
          <CarouselSlideContent
            class="flex h-96 items-center justify-center rounded-lg typography-display-large bg-surface-container border-outline"
          >
            {{ slide }}
          </CarouselSlideContent>
        </CarouselSlide>
      </CarouselView>
      <template #after>
        <CarouselDots />
      </template>
    </Carousel>
  </StorybookStory>
  <StorybookStory name="Without Controls">
    <Carousel
      class="w-full"
      :options="{ loop: true, slidesToScroll: 1, align: 'center' }"
    >
      <CarouselView>
        <CarouselSlide v-for="slide in slides" :key="slide" class="basis-1/3">
          <CarouselSlideContent
            class="flex h-96 items-center justify-center rounded-lg typography-display-large bg-surface-container border-outline"
          >
            {{ slide }}
          </CarouselSlideContent>
        </CarouselSlide>
      </CarouselView>
    </Carousel>
  </StorybookStory>
</template>
