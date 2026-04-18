<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { photos, signs } from '~/wedding.config'

const sectionRef = ref<HTMLElement | null>(null)
const signRef = ref<HTMLElement | null>(null)
const photoRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.to(photoRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    },
    yPercent: -12,
    ease: 'none',
  })

  gsap.from(signRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 60%',
      once: true,
    },
    opacity: 0,
    scale: 0.88,
    duration: 1.8,
    ease: 'power3.out',
  })
})
</script>

<template>
  <section ref="sectionRef" class="emotion">
    <div ref="photoRef" class="emotion__bg">
      <img
        :src="photos.emotion[0]"
        alt="情感照片"
        class="emotion__bg-img"
        loading="lazy"
      />
    </div>

    <div class="emotion__warm-overlay" />
    <div class="emotion__gradient" />

    <div class="emotion__content">
      <img
        ref="signRef"
        :src="signs.loveYou"
        alt="Love You"
        class="emotion__sign"
      />
      <p class="emotion__quote t-subheading">
        「在這世界上，我只要你。」
      </p>
    </div>
  </section>
</template>

<style lang="scss">
.emotion {
  position: relative;
  height: 85dvh;
  min-height: 500px;
  overflow: hidden;
  @include flex-col-center;

  &__bg {
    @include cover;
    transform-origin: center center;
    will-change: transform;
  }

  &__bg-img {
    @include img-cover;
    object-position: center 30%;
    width: 100%;
    height: 120%;
    object-fit: cover;
  }

  &__warm-overlay {
    @include overlay(rgba(180, 100, 60, 0.18));
    z-index: $z-above;
    mix-blend-mode: multiply;
  }

  &__gradient {
    @include cover;
    z-index: $z-above + 1;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.55) 100%);
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: $z-above + 2;
    @include flex-col-center;
    gap: $sp-4;
    text-align: center;
    padding: $sp-4;
  }

  &__sign {
    height: 6rem;
    width: auto;
    filter: brightness(0) invert(1) sepia(0.1);
    opacity: 0.9;

    @include tablet-up { height: 9rem; }
  }

  &__quote {
    color: rgba($cream, 0.88);
    max-width: 400px;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
  }
}
</style>
