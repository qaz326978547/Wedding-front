<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { photos } from '~/wedding.config'

const sectionRef = ref<HTMLElement | null>(null)

const chapters = [
  {
    number: '01',
    label: '相識',
    titleEn: 'First Meeting',
    text: '那是一個平凡的午後，陽光灑落，我們在人群中相遇。那一刻，時間彷彿靜止了。',
    photos: photos.storyMeet,
    align: 'right',
  },
  {
    number: '02',
    label: '交往',
    titleEn: 'Falling in Love',
    text: '我們一起走過海邊、爬過山頂、笑過哭過。每一個平凡的日子，都因為你而閃閃發光。',
    photos: photos.storyDate,
    align: 'left',
  },
  {
    number: '03',
    label: '求婚',
    titleEn: 'The Proposal',
    text: '夕陽西下，浪潮聲聲，我在你面前單膝下跪。你說了「好」，那是我聽過最美的聲音。',
    photos: photos.storyPropose,
    align: 'right',
  },
]

onMounted(() => {
  document.querySelectorAll('.story-chapter').forEach((chapter) => {
    const text = chapter.querySelector('.story-chapter__text-wrap')
    const imgs = chapter.querySelectorAll('.story-chapter__img')

    gsap.from(text, {
      scrollTrigger: { trigger: chapter, start: 'top 75%', once: true },
      opacity: 0,
      x: -50,
      duration: 1.2,
      ease: 'power3.out',
    })

    gsap.from(imgs, {
      scrollTrigger: { trigger: chapter, start: 'top 75%', once: true },
      opacity: 0,
      y: 60,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2,
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="story">
    <div class="story__header container">
      <p class="t-label" style="color: var(--gold);">Our Story</p>
      <h2 class="t-heading" style="color: var(--charcoal); margin-top: 0.5rem;">愛情故事</h2>
      <div class="divider" style="margin-top: 1.5rem;" />
    </div>

    <div class="story__chapters">
      <article
        v-for="(ch, i) in chapters"
        :key="i"
        class="story-chapter"
        :class="`story-chapter--${ch.align}`"
      >
        <div class="story-chapter__text-wrap">
          <span class="story-chapter__number t-label">{{ ch.number }}</span>
          <p class="story-chapter__label-en t-label" style="color: var(--gold);">{{ ch.titleEn }}</p>
          <h3 class="story-chapter__title t-heading">{{ ch.label }}</h3>
          <p class="story-chapter__body t-body">{{ ch.text }}</p>
        </div>

        <div class="story-chapter__photos">
          <div
            v-for="(photo, pi) in ch.photos.slice(0, 2)"
            :key="pi"
            class="story-chapter__img-wrap"
            :class="pi === 1 ? 'story-chapter__img-wrap--offset' : ''"
          >
            <img
              :src="photo"
              :alt="`${ch.label} 照片 ${pi + 1}`"
              class="story-chapter__img"
              loading="lazy"
            />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss">
.story {
  background: var(--warm-white);
  @include section-padding;

  &__header {
    text-align: center;
    margin-bottom: $sp-12;
  }

  &__chapters {
    display: flex;
    flex-direction: column;
    gap: $sp-16;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 $sp-3;

    @include tablet-up { padding: 0 $sp-6; }
  }
}

.story-chapter {
  display: grid;
  grid-template-columns: 1fr;
  gap: $sp-6;
  align-items: center;

  @include tablet-up {
    grid-template-columns: 1fr 1fr;
    gap: $sp-8;

    &--right {
      .story-chapter__text-wrap { order: 2; }
      .story-chapter__photos    { order: 1; }
    }
  }

  &__text-wrap {
    display: flex;
    flex-direction: column;
    gap: $sp-2;
    padding: $sp-2 0;
  }

  &__number {
    color: var(--parchment);
    font-size: 3.5rem;
    font-family: var(--font-display);
    font-weight: 300;
    line-height: 1;
    display: block;
    margin-bottom: $sp-1;
  }

  &__title {
    color: var(--charcoal);
    margin: 0.2rem 0;
  }

  &__body {
    color: var(--charcoal-mid);
    max-width: 420px;
  }

  &__photos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $sp-2;
    align-items: start;
  }

  &__img-wrap {
    overflow: hidden;
    border-radius: 2px;

    &--offset {
      margin-top: $sp-6;

      @include tablet-up { margin-top: $sp-8; }
    }
  }

  &__img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    object-position: top center;
    transition: transform $dur-slow $ease-film;

    &:hover { transform: scale(1.04); }
  }
}
</style>
