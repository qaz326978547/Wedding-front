<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

defineProps<{
  image: { url: string; alt: string } | null
}>()

const emit = defineEmits<{ close: [] }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="image"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="image.alt"
        @click.self="emit('close')"
      >
        <button class="lightbox__close" aria-label="關閉" @click="emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div class="lightbox__img-wrap">
          <img
            :src="image.url"
            :alt="image.alt"
            class="lightbox__img"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.lightbox {
  position: fixed;
  inset: 0;
  z-index: $z-lightbox;
  background: rgba($charcoal, 0.92);
  @include flex-center;
  padding: $sp-4;
  cursor: zoom-out;

  &__close {
    position: absolute;
    top: $sp-3;
    right: $sp-3;
    color: rgba($cream, 0.7);
    padding: $sp-1;
    transition: color $dur-fast;
    cursor: pointer;

    &:hover { color: $cream; }
  }

  &__img-wrap {
    max-width: min(90vw, 900px);
    max-height: 90dvh;
    @include flex-center;
    cursor: default;
  }

  &__img {
    max-width: 100%;
    max-height: 90dvh;
    object-fit: contain;
    border-radius: 2px;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity $dur-medium $ease-film;

  .lightbox__img-wrap {
    transition: transform $dur-medium $ease-out-expo;
  }
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;

  .lightbox__img-wrap { transform: scale(0.92); }
}
</style>
