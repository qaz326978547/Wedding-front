<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { wedding } from '~/wedding.config'

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.from('.info-card', {
    scrollTrigger: { trigger: sectionRef.value, start: 'top 75%', once: true },
    opacity: 0,
    y: 50,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power3.out',
  })
})

const details = [
  { label: '日期', icon: '◯', value: wedding.date },
  { label: '時間', icon: '◯', value: wedding.time },
  { label: '地點', icon: '◯', value: wedding.venue },
  { label: '地址', icon: '◯', value: wedding.venueAddress },
]
</script>

<template>
  <section ref="sectionRef" class="info">
    <div class="container">
      <div class="info__header">
        <p class="t-label" style="color: var(--gold);">Wedding Details</p>
        <h2 class="t-heading" style="margin-top: 0.5rem;">婚禮資訊</h2>
        <div class="divider" style="margin-top: 1.5rem;" />
      </div>

      <div class="info__grid">
        <div
          v-for="(item, i) in details"
          :key="i"
          class="info-card"
        >
          <span class="info-card__label t-label">{{ item.label }}</span>
          <p class="info-card__value">{{ item.value }}</p>
        </div>
      </div>

      <div class="info__map">
        <a
          :href="wedding.mapUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="info__map-btn"
        >
          <span class="t-label">查看地圖</span>
          <span class="info__map-arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.info {
  background: var(--cream-dark);
  @include section-padding;
  text-align: center;

  &__header {
    margin-bottom: $sp-8;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $sp-3;
    max-width: 640px;
    margin: 0 auto $sp-8;

    @include tablet-up {
      grid-template-columns: repeat(4, 1fr);
      max-width: 900px;
    }
  }

  &__map {
    display: flex;
    justify-content: center;
  }

  &__map-btn {
    display: inline-flex;
    align-items: center;
    gap: $sp-2;
    padding: $sp-2 $sp-4;
    border: 1px solid var(--gold);
    color: var(--charcoal);
    transition: all $dur-fast $ease-film;
    letter-spacing: 0.1em;

    &:hover {
      background: var(--gold);
      color: var(--warm-white);
    }
  }

  &__map-arrow {
    transition: transform $dur-fast $ease-film;

    .info__map-btn:hover & { transform: translateX(4px); }
  }
}

.info-card {
  @include card-base;
  padding: $sp-4 $sp-3;
  display: flex;
  flex-direction: column;
  gap: $sp-1;
  align-items: center;

  &__label {
    color: var(--gold);
  }

  &__value {
    font-family: var(--font-display);
    font-size: clamp(1rem, 3vw, 1.35rem);
    font-weight: 400;
    color: var(--charcoal);
    line-height: 1.4;
  }
}
</style>
