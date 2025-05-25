<script setup lang="ts">
import { AppBar, IconButton, SearchBar } from '@/components';
import { StorybookCode, StorybookStory } from '@/storybook/components';
import { IconMenu2, IconSearch } from '@tabler/icons-vue';

const searchCode = `
<AppBar>
  <template #leading>
    <div class="size-12 inline-flex items-center justify-center">
      <IconButton variant="standard">
        <IconMenu2 />
      </IconButton>
    </div>
  </template>
  <template #search-bar>
    <SearchBar placeholder="Search" />
  </template>
  <template #trailing>
    <div class="size-12 inline-flex items-center justify-center">
      <div
        class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
      >
        A
      </div>
    </div>
  </template>
</AppBar>
`;

const smallCode = `
<AppBar variant="small">
  <template #leading>
    <div class="size-12 inline-flex items-center justify-center">
      <IconButton variant="standard">
        <IconMenu2 />
      </IconButton>
    </div>
  </template>
  <template #title> Title </template>
  <template #title> Subtitle </template>
  <template #trailing>
    <div class="h-12 inline-flex items-center justify-center">
      <div class="size-12 inline-flex items-center justify-center">
        <IconButton variant="standard">
          <IconSearch />
        </IconButton>
      </div>
      <div class="size-12 inline-flex items-center justify-center">
        <div
          class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
        >
          A
        </div>
      </div>
    </div>
  </template>
</AppBar>
`;

const mediumCode = `
<AppBar variant="medium">
  <template #leading>
    <div class="size-12 inline-flex items-center justify-center">
      <IconButton variant="standard">
        <IconMenu2 />
      </IconButton>
    </div>
  </template>
  <template #title> Title </template>
  <template #title> Subtitle </template>
  <template #trailing>
    <div class="h-12 inline-flex items-center justify-center">
      <div class="size-12 inline-flex items-center justify-center">
        <IconButton variant="standard">
          <IconSearch />
        </IconButton>
      </div>
      <div class="size-12 inline-flex items-center justify-center">
        <div
          class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
        >
          A
        </div>
      </div>
    </div>
  </template>
</AppBar>
`;

const largeCode = `
<AppBar variant="large">
  <template #leading>
    <div class="size-12 inline-flex items-center justify-center">
      <IconButton variant="standard">
        <IconMenu2 />
      </IconButton>
    </div>
  </template>
  <template #title> Title </template>
  <template #title> Subtitle </template>
  <template #trailing>
    <div class="h-12 inline-flex items-center justify-center">
      <div class="size-12 inline-flex items-center justify-center">
        <IconButton variant="standard">
          <IconSearch />
        </IconButton>
      </div>
      <div class="size-12 inline-flex items-center justify-center">
        <div
          class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
        >
          A
        </div>
      </div>
    </div>
  </template>
</AppBar>
`;
</script>

<template>
  <StorybookStory name="Search">
    <div class="flex flex-col items-center gap-md w-full">
      <AppBar class="w-80 elevation-2">
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #search-bar>
          <SearchBar placeholder="Search" />
        </template>
        <template #trailing>
          <div class="size-12 inline-flex items-center justify-center">
            <div
              class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
            >
              A
            </div>
          </div>
        </template>
      </AppBar>
      <AppBar class="elevation-2">
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #search-bar>
          <SearchBar placeholder="Search" />
        </template>
        <template #trailing>
          <div class="size-12 inline-flex items-center justify-center">
            <div
              class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
            >
              A
            </div>
          </div>
        </template>
      </AppBar>
    </div>
  </StorybookStory>
  <StorybookCode :code="searchCode" name="Search AppBar" />
  <StorybookStory name="Small">
    <div class="flex flex-col items-center gap-md w-full">
      <AppBar class="w-80 elevation-2" variant="small">
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #trailing>
          <div class="h-12 inline-flex items-center justify-center">
            <div class="size-12 inline-flex items-center justify-center">
              <IconButton variant="standard">
                <IconSearch />
              </IconButton>
            </div>
            <div class="size-12 inline-flex items-center justify-center">
              <div
                class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
              >
                A
              </div>
            </div>
          </div>
        </template>
      </AppBar>
      <AppBar class="w-80 elevation-2" variant="small" centered>
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #subtitle> Subtitle </template>
        <template #trailing>
          <div class="size-12 inline-flex items-center justify-center">
            <div
              class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
            >
              A
            </div>
          </div>
        </template>
      </AppBar>
      <AppBar class="elevation-2" variant="small">
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #trailing>
          <div class="h-12 inline-flex items-center justify-center">
            <div class="size-12 inline-flex items-center justify-center">
              <IconButton variant="standard">
                <IconSearch />
              </IconButton>
            </div>
            <div class="size-12 inline-flex items-center justify-center">
              <div
                class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
              >
                A
              </div>
            </div>
          </div>
        </template>
      </AppBar>
      <AppBar class="elevation-2" variant="small" centered>
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #subtitle> Subtitle </template>
        <template #trailing>
          <div class="size-12 inline-flex items-center justify-center">
            <div
              class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
            >
              A
            </div>
          </div>
        </template>
      </AppBar>
    </div>
  </StorybookStory>
  <StorybookCode :code="smallCode" name="Small AppBar" />
  <StorybookStory name="Medium">
    <div class="flex flex-col items-center gap-md w-full">
      <AppBar class="w-80 elevation-2" variant="medium">
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #trailing>
          <div class="h-12 inline-flex items-center justify-center">
            <div class="size-12 inline-flex items-center justify-center">
              <IconButton variant="standard">
                <IconSearch />
              </IconButton>
            </div>
            <div class="size-12 inline-flex items-center justify-center">
              <div
                class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
              >
                A
              </div>
            </div>
          </div>
        </template>
      </AppBar>
      <AppBar class="w-80 elevation-2" variant="medium" centered>
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #subtitle> Subtitle </template>
        <template #trailing>
          <div class="size-12 inline-flex items-center justify-center">
            <div
              class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
            >
              A
            </div>
          </div>
        </template>
      </AppBar>
      <AppBar class="elevation-2" variant="medium">
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #trailing>
          <div class="h-12 inline-flex items-center justify-center">
            <div class="size-12 inline-flex items-center justify-center">
              <IconButton variant="standard">
                <IconSearch />
              </IconButton>
            </div>
            <div class="size-12 inline-flex items-center justify-center">
              <div
                class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
              >
                A
              </div>
            </div>
          </div>
        </template>
      </AppBar>
      <AppBar class="elevation-2" variant="medium" centered>
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #subtitle> Subtitle </template>
        <template #trailing>
          <div class="size-12 inline-flex items-center justify-center">
            <div
              class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
            >
              A
            </div>
          </div>
        </template>
      </AppBar>
    </div>
  </StorybookStory>
  <StorybookCode :code="mediumCode" name="Medium AppBar" />
  <StorybookStory name="Large">
    <div class="flex flex-col items-center gap-md w-full">
      <AppBar class="w-80 elevation-2" variant="large">
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #trailing>
          <div class="h-12 inline-flex items-center justify-center">
            <div class="size-12 inline-flex items-center justify-center">
              <IconButton variant="standard">
                <IconSearch />
              </IconButton>
            </div>
            <div class="size-12 inline-flex items-center justify-center">
              <div
                class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
              >
                A
              </div>
            </div>
          </div>
        </template>
      </AppBar>
      <AppBar class="w-80 elevation-2" variant="large" centered>
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #subtitle> Subtitle </template>
        <template #trailing>
          <div class="size-12 inline-flex items-center justify-center">
            <div
              class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
            >
              A
            </div>
          </div>
        </template>
      </AppBar>
      <AppBar class="elevation-2" variant="large">
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #trailing>
          <div class="h-12 inline-flex items-center justify-center">
            <div class="size-12 inline-flex items-center justify-center">
              <IconButton variant="standard">
                <IconSearch />
              </IconButton>
            </div>
            <div class="size-12 inline-flex items-center justify-center">
              <div
                class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
              >
                A
              </div>
            </div>
          </div>
        </template>
      </AppBar>
      <AppBar class="elevation-2" variant="large" centered>
        <template #leading>
          <div class="size-12 inline-flex items-center justify-center">
            <IconButton variant="standard">
              <IconMenu2 />
            </IconButton>
          </div>
        </template>
        <template #title> Title </template>
        <template #subtitle> Subtitle </template>
        <template #trailing>
          <div class="size-12 inline-flex items-center justify-center">
            <div
              class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
            >
              A
            </div>
          </div>
        </template>
      </AppBar>
    </div>
  </StorybookStory>
  <StorybookCode :code="largeCode" name="Large AppBar" />
</template>
