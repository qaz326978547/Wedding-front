<script setup lang="ts">
import { wedding, photos, signs } from '~/wedding.config'

const sectionRef = ref<HTMLElement | null>(null)
const signRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { $gsap } = useNuxtApp()

  $gsap.from(signRef.value, {
    scrollTrigger: { trigger: sectionRef.value, start: 'top 65%', once: true },
    opacity: 0,
    scale: 0.9,
    duration: 1.8,
    ease: 'power3.out',
  })

  $gsap.from('.footer__text-group > *', {
    scrollTrigger: { trigger: sectionRef.value, start: 'top 65%', once: true },
    opacity: 0,
    y: 30,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 0.4,
  })
})
</script>

<template>
  <footer ref="sectionRef" class="footer">
    <div class="footer__bg">
      <img
        :src="photos.footer"
        alt="海邊婚紗"
        class="footer__bg-img"
        loading="lazy"
      />
    </div>

    <div class="footer__overlay" />

    <div class="footer__content">
      <img
        ref="signRef"
        :src="signs.thanks"
        alt="Thanks"
        class="footer__sign"
      />

      <div class="footer__text-group">
        <p class="footer__names t-heading">
          {{ wedding.groomName }} &amp; {{ wedding.brideName }}
        </p>
        <p class="footer__quote t-subheading">
          感謝您的到來，見證我們最美的時刻。
        </p>
        <div class="divider" style="background: linear-gradient(to bottom, transparent, rgba(244,237,228,0.3), transparent);" />
        <p class="footer__date t-label">{{ wedding.date }}</p>
      </div>
    </div>

    <p class="footer__credit t-label">
      Made with love ♡
    </p>
  </footer>
</template>

<style lang="scss">
.footer {
  position: relative;
  height: 80dvh;
  min-height: 500px;
  overflow: hidden;
  @include flex-col-center;

  &__bg {
    @include cover;
  }

  &__bg-img {
    @include img-cover;
    filter: saturate(0.7) brightness(0.9);
  }

  &__overlay {
    @include cover;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6));
    z-index: $z-above;
  }

  &__content {
    position: relative;
    z-index: $z-above + 1;
    @include flex-col-center;
    gap: $sp-4;
    text-align: center;
    padding: $sp-4;
    color: var(--cream);
  }

  &__sign {
    height: 7rem;
    width: auto;
    filter: brightness(0) invert(1) sepia(0.05);
    opacity: 0.88;

    @include tablet-up { height: 10rem; }
  }

  &__text-group {
    @include flex-col-center;
    gap: $sp-3;
  }

  &__names {
    color: var(--cream);
    font-size: clamp(1.8rem, 5vw, 3rem);
  }

  &__quote {
    color: rgba($cream, 0.75);
    max-width: 380px;
    font-size: clamp(0.95rem, 2.5vw, 1.3rem);
  }

  &__date {
    color: rgba($cream, 0.5);
    letter-spacing: 0.3em;
  }

  &__credit {
    position: absolute;
    bottom: $sp-3;
    left: 50%;
    transform: translateX(-50%);
    z-index: $z-above + 1;
    color: rgba($cream, 0.3);
    letter-spacing: 0.2em;
    white-space: nowrap;
  }
}
</style>
