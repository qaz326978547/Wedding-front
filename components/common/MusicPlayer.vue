<script setup lang="ts">
import { wedding } from '~/wedding.config'

const audioRef = ref<HTMLAudioElement | null>(null)
const playing = ref(false)
const ready = ref(false)
const started = ref(false)

async function startPlay() {
  if (!audioRef.value || started.value) return
  started.value = true
  try {
    await audioRef.value.play()
    playing.value = true
  } catch (e) {
    console.warn('[MusicPlayer] 自動播放失敗:', e)
    started.value = false
  }
}

async function togglePlay() {
  if (!audioRef.value) return
  if (playing.value) {
    audioRef.value.pause()
    playing.value = false
  } else {
    started.value = false
    await startPlay()
  }
}

onMounted(() => {
  if (!audioRef.value) return

  audioRef.value.volume = 0.45
  audioRef.value.addEventListener('canplay', () => { ready.value = true })
  audioRef.value.addEventListener('ended', () => { playing.value = false })

  const events = ['click', 'scroll', 'touchstart', 'keydown'] as const
  events.forEach(ev =>
    document.addEventListener(ev, startPlay, { once: true, passive: true })
  )

  onUnmounted(() => {
    events.forEach(ev => document.removeEventListener(ev, startPlay))
  })
})
</script>

<template>
  <div v-if="wedding.music" class="music">
    <audio ref="audioRef" :src="wedding.music" loop preload="metadata" />

    <button
      class="music__btn"
      :class="{ 'music__btn--playing': playing }"
      :aria-label="playing ? '暫停音樂' : '播放音樂'"
      :title="playing ? '暫停音樂' : '播放音樂'"
      @click="togglePlay"
    >
      <!-- Note icon -->
      <svg v-if="!playing" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
      <!-- Pause icon -->
      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
      </svg>

      <!-- Sound wave animation (visible when playing) -->
      <span v-if="playing" class="music__waves" aria-hidden="true">
        <span v-for="n in 3" :key="n" class="music__wave" :style="`animation-delay: ${(n - 1) * 0.15}s`" />
      </span>
    </button>
  </div>
</template>

<style lang="scss">
.music {
  position: fixed;
  top: $sp-3;
  right: $sp-3;
  z-index: $z-music;

  &__btn {
    display: flex;
    align-items: center;
    gap: $sp-1;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: rgba($charcoal, 0.55);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--cream);
    border: 1px solid rgba($cream, 0.18);
    transition: all $dur-fast $ease-film;
    justify-content: center;

    &:hover {
      background: rgba($charcoal, 0.8);
      border-color: rgba($cream, 0.35);
    }

    &--playing {
      background: rgba($gold, 0.75);
      border-color: rgba($gold, 0.5);
      color: white;
    }
  }

  &__waves {
    position: absolute;
    right: -$sp-1;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 2px;
  }

  &__wave {
    display: block;
    width: 2px;
    border-radius: 2px;
    background: currentColor;
    animation: wavePulse 0.8s ease-in-out infinite alternate;

    &:nth-child(1) { height: 8px; }
    &:nth-child(2) { height: 14px; }
    &:nth-child(3) { height: 8px; }
  }
}

@keyframes wavePulse {
  from { transform: scaleY(0.4); }
  to   { transform: scaleY(1); }
}
</style>
