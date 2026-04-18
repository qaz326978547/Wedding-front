<script setup lang="ts">
import { wedding, photos, signs } from '~/wedding.config'

const bgRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { $gsap } = useNuxtApp()

  // Ken Burns — subtle background zoom
  $gsap.to(bgRef.value, {
    scale: 1.1,
    duration: 16,
    ease: 'none',
    repeat: -1,
    yoyo: true,
  })

  // Staggered content reveal
  $gsap.from(Array.from((contentRef.value as HTMLElement)?.children ?? []), {
    opacity: 0,
    y: 36,
    duration: 1.6,
    stagger: 0.22,
    ease: 'power3.out',
    delay: 0.4,
  })
})
</script>

<template>
  <section class="hero">
    <!-- Background image with Ken Burns -->
    <div ref="bgRef" class="hero__bg">
      <img
        :src="photos.hero"
        alt="婚紗照"
        class="hero__bg-img"
        loading="eager"
      />
    </div>

    <!-- Dark gradient overlays -->
    <div class="hero__overlay-top" />
    <div class="hero__overlay-bottom" />

    <!-- Content -->
    <div ref="contentRef" class="hero__content">
      <p class="hero__label t-label">Wedding Invitation</p>

      <img
        :src="signs.invitation"
        alt="Invitation"
        class="hero__sign-invitation"
      />

      <h1 class="hero__names t-display--xl">
        <span>{{ wedding.groomName }}</span>
        <span class="hero__amp">&amp;</span>
        <span>{{ wedding.brideName }}</span>
      </h1>

      <div class="divider" style="background: linear-gradient(to bottom, transparent, rgba(244,237,228,0.4), transparent);" />

      <p class="hero__date t-label">{{ wedding.date }}</p>

      <img
        :src="signs.sweetDay"
        alt="Sweet Day"
        class="hero__sign-sweetday"
      />
    </div>

    <!-- Scroll hint -->
    <div class="hero__scroll">
      <span class="t-label">Scroll</span>
      <div class="hero__scroll-line" />
    </div>

    <!-- Floating music player -->
    <ClientOnly>
      <MusicPlayer />
    </ClientOnly>
  </section>
</template>

<style lang="scss">
.hero {
  position: relative;
  height: 100dvh;
  min-height: 600px;
  overflow: hidden;
  @include flex-col-center;

  &__bg {
    @include cover;
    transform-origin: center center;
  }

  &__bg-img {
    @include img-cover;
  }

  // Top dark vignette
  &__overlay-top {
    @include overlay-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.05));
    z-index: $z-above;
    height: 35%;
    bottom: auto;
  }

  // Bottom gradient for text legibility
  &__overlay-bottom {
    @include overlay-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
    z-index: $z-above;
    height: 65%;
    top: auto;
  }

  &__content {
    position: relative;
    z-index: $z-above + 1;
    @include flex-col-center;
    gap: $sp-3;
    text-align: center;
    color: var(--cream);
    padding: 0 $sp-3;
    width: 100%;
    max-width: 700px;
  }

  &__label {
    color: rgba($cream, 0.7);
  }

  &__sign-invitation {
    height: 2.2rem;
    width: auto;
    opacity: 0.75;
    filter: brightness(0) invert(1);
  }

  &__names {
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: var(--cream);
    text-shadow: 0 4px 40px rgba(0, 0, 0, 0.3);
  }

  &__amp {
    font-size: 0.6em;
    color: var(--gold-light);
    font-style: italic;
  }

  &__date {
    color: rgba($cream, 0.65);
    letter-spacing: 0.3em;
  }

  &__sign-sweetday {
    height: 4rem;
    width: auto;
    opacity: 0.85;
    filter: brightness(0) invert(1) sepia(0.2);
    margin-top: $sp-1;
  }

  // Scroll indicator
  &__scroll {
    position: absolute;
    bottom: $sp-4;
    left: 50%;
    transform: translateX(-50%);
    z-index: $z-above + 1;
    @include flex-col-center;
    gap: $sp-1;
    color: rgba($cream, 0.5);
  }

  &__scroll-line {
    width: 1px;
    height: 3rem;
    background: linear-gradient(to bottom, rgba($cream, 0.4), transparent);
    animation: scrollPulse 2.4s ease-in-out infinite;
  }
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50%       { opacity: 0.9; transform: scaleY(1.15); }
}
</style>
