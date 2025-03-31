<template>
  <div>
    <q-breadcrumbs class="q-mt-lg q-px-lg">
      <q-breadcrumbs-el
        icon="home"
        :to="{
          path: homeLink
        }" />
      <q-breadcrumbs-el
        label="Projects list"
        :to="{
          path: projects
        }" />
      <q-breadcrumbs-el :label="name" />
    </q-breadcrumbs>

    <h1 class="text-dark name-style text-center">{{ name }}</h1>

    <div style="max-width: 800px;" class="q-mx-auto q-px-md">

      <p class="text-justify">
        {{ description1 }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos at soluta assumenda itaque nobis omnis molestiae quis beatae fugiat repellat consectetur vel maxime natus ea officiis, voluptates amet dolore cupiditate?
      </p>
    
      <div>
        <div v-if="ytLink">
          <q-video
            :ratio="16/9"
            src="https://www.youtube.com/embed/i7fn61Dx1AU?si=xtbatclT_q0kwyjD"
          />
          <div class="text-caption text-center">
            demo
          </div>
        </div>
      </div>

      <p class="text-justify">
        {{ description2 }}
      </p>
    
    </div>


  </div>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n';

const localePath = useLocalePath();
const homeLink = localePath('/');
const projects = localePath('/projects');

type Slug =  'dt' | 'ela' | 'ai-chat' 

interface Props {
  slug: Slug
  name: string
  description1: string;
  description2: string;
  githubLink: string | null;
  ytLink: string | null;
}

const props = defineProps<Props>();
</script>

<style scoped>

.name-style {
  font-size: 72px;
}

</style>