<script setup lang="ts">
const gallery = useGallery()
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { $gsap } = useNuxtApp()

  $gsap.from('.gallery__item', {
    scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true },
    opacity: 0,
    scale: 0.94,
    duration: 1,
    stagger: { amount: 1.2, from: 'start' },
    ease: 'power3.out',
  })
})
</script>

<template>
  <section ref="sectionRef" class="gallery">
    <div class="container">
      <div class="gallery__header">
        <p class="t-label" style="color: var(--gold);">Photo Album</p>
        <h2 class="t-heading" style="margin-top: 0.5rem;">相簿</h2>
        <div class="divider" style="margin-top: 1.5rem;" />
      </div>

      <div class="gallery__grid">
        <button
          v-for="img in gallery.images.value"
          :key="img.id"
          class="gallery__item"
          :aria-label="`查看 ${img.alt}`"
          @click="gallery.open(img)"
        >
          <img
            :src="img.url"
            :alt="img.alt"
            class="gallery__img"
            loading="lazy"
          />
          <div class="gallery__item-hover">
            <span class="t-label" style="color: white;">放大</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <ImageLightbox
      :image="gallery.active.value"
      @close="gallery.close()"
    />
  </section>
</template>

<style lang="scss">
.gallery {
  background: var(--warm-white);
  @include section-padding;

  &__header {
    text-align: center;
    margin-bottom: $sp-8;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $sp-2;

    @include tablet-up  { grid-template-columns: repeat(3, 1fr); gap: $sp-2; }
    @include desktop-up { grid-template-columns: repeat(4, 1fr); }

    // Give variety to the grid with wider tiles
    .gallery__item:nth-child(7n + 1) {
      @include tablet-up { grid-column: span 2; }
    }
  }

  &__item {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    display: block;
    border-radius: 2px;

    &:hover .gallery__img { transform: scale(1.06); }
    &:hover .gallery__item-hover { opacity: 1; }
  }

  &__img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    object-position: top center;
    transition: transform $dur-slow $ease-film;
    display: block;
  }

  &__item-hover {
    @include cover;
    @include flex-center;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity $dur-medium $ease-film;
  }
}
</style>
