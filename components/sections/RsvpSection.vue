<script setup lang="ts">
const { form, loading, submitted, error, submit } = useRsvp()
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { $gsap } = useNuxtApp()

  $gsap.from('.rsvp__inner', {
    scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true },
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out',
  })
})
</script>

<template>
  <section ref="sectionRef" class="rsvp">
    <div class="container">
      <div class="rsvp__header">
        <p class="t-label" style="color: var(--gold);">RSVP</p>
        <h2 class="t-heading" style="margin-top: 0.5rem;">出席回覆</h2>
        <p class="t-body" style="margin-top: 1rem; color: var(--charcoal-mid);">
          請於 2026 年 5 月 20 日前完成回覆，感謝您的配合。
        </p>
        <div class="divider" style="margin-top: 1.5rem;" />
      </div>

      <!-- Success state -->
      <div v-if="submitted" class="rsvp__success">
        <p class="t-heading" style="color: var(--gold);">感謝您的回覆</p>
        <p class="t-body" style="margin-top: 1rem; color: var(--charcoal-mid);">
          我們期待在婚禮上與您相聚 ♡
        </p>
      </div>

      <!-- Form -->
      <form v-else class="rsvp__inner" @submit.prevent="submit">
        <!-- Name + Phone -->
        <div class="rsvp__row">
          <div class="rsvp__field">
            <label class="rsvp__label t-label">姓名 *</label>
            <input v-model="form.name" type="text" required placeholder="您的姓名" class="rsvp__input" />
          </div>
          <div class="rsvp__field">
            <label class="rsvp__label t-label">電話 *</label>
            <input v-model="form.phone" type="tel" required placeholder="09xx-xxx-xxx" class="rsvp__input" />
          </div>
        </div>

        <!-- Side -->
        <div class="rsvp__field">
          <label class="rsvp__label t-label">賓客身份</label>
          <div class="rsvp__radio-group">
            <label class="rsvp__radio">
              <input v-model="form.side" type="radio" value="groom" />
              <span>男方賓客</span>
            </label>
            <label class="rsvp__radio">
              <input v-model="form.side" type="radio" value="bride" />
              <span>女方賓客</span>
            </label>
          </div>
        </div>

        <!-- Attending -->
        <div class="rsvp__field">
          <label class="rsvp__label t-label">是否出席</label>
          <div class="rsvp__radio-group">
            <label class="rsvp__radio">
              <input v-model="form.attending" type="radio" value="yes" />
              <span>出席</span>
            </label>
            <label class="rsvp__radio">
              <input v-model="form.attending" type="radio" value="no" />
              <span>無法出席</span>
            </label>
          </div>
        </div>

        <!-- Counts (only if attending) -->
        <Transition name="slide">
          <div v-if="form.attending === 'yes'" class="rsvp__row">
            <div class="rsvp__field">
              <label class="rsvp__label t-label">大人人數</label>
              <input v-model.number="form.adults" type="number" min="0" max="20" class="rsvp__input" />
            </div>
            <div class="rsvp__field">
              <label class="rsvp__label t-label">小孩人數</label>
              <input v-model.number="form.children" type="number" min="0" max="10" class="rsvp__input" />
            </div>
          </div>
        </Transition>

        <!-- Paper invite -->
        <div class="rsvp__field rsvp__field--check">
          <label class="rsvp__checkbox">
            <input v-model="form.needPaper" type="checkbox" />
            <span class="t-body">需要紙本喜帖</span>
          </label>
        </div>

        <!-- Address (conditional) -->
        <Transition name="slide">
          <div v-if="form.needPaper" class="rsvp__field">
            <label class="rsvp__label t-label">寄送地址</label>
            <input
              v-model="form.address"
              type="text"
              :required="form.needPaper"
              placeholder="縣市 + 完整地址"
              class="rsvp__input"
            />
          </div>
        </Transition>

        <!-- Vegetarian -->
        <div class="rsvp__field rsvp__field--check">
          <label class="rsvp__checkbox">
            <input v-model="form.vegetarian" type="checkbox" />
            <span class="t-body">我是素食者</span>
          </label>
        </div>

        <!-- Notes -->
        <div class="rsvp__field">
          <label class="rsvp__label t-label">備註</label>
          <textarea v-model="form.notes" rows="3" placeholder="飲食需求、過敏資訊…" class="rsvp__input rsvp__input--textarea" />
        </div>

        <!-- Error -->
        <p v-if="error" class="rsvp__error t-body">{{ error }}</p>

        <!-- Submit -->
        <button type="submit" class="rsvp__submit" :disabled="loading">
          <span v-if="loading" class="t-label">送出中…</span>
          <span v-else class="t-label">送出回覆</span>
        </button>
      </form>
    </div>
  </section>
</template>

<style lang="scss">
.rsvp {
  background: var(--cream-dark);
  @include section-padding;

  &__header {
    text-align: center;
    margin-bottom: $sp-8;
  }

  &__success {
    text-align: center;
    padding: $sp-12 0;
  }

  &__inner {
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: $sp-4;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $sp-3;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: $sp-1;

    &--check { flex-direction: row; align-items: center; }
  }

  &__label {
    color: var(--charcoal-mid);
  }

  &__input {
    width: 100%;
    padding: $sp-2 $sp-2;
    border-bottom: 1px solid var(--parchment);
    background: transparent;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--charcoal);
    transition: border-color $dur-fast;
    resize: none;

    &::placeholder { color: var(--fog-blue); }
    &:focus        { border-color: var(--gold); outline: none; }

    &--textarea {
      border: 1px solid var(--parchment);
      padding: $sp-2;
      border-radius: 2px;

      &:focus { border-color: var(--gold); }
    }
  }

  &__radio-group {
    display: flex;
    gap: $sp-4;
    flex-wrap: wrap;
  }

  &__radio {
    display: flex;
    align-items: center;
    gap: $sp-1;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 0.95rem;

    input { accent-color: var(--gold); }
  }

  &__checkbox {
    display: flex;
    align-items: center;
    gap: $sp-2;
    cursor: pointer;

    input { accent-color: var(--gold); width: 1rem; height: 1rem; }
  }

  &__error {
    color: #c0392b;
    text-align: center;
  }

  &__submit {
    align-self: center;
    padding: $sp-2 $sp-8;
    border: 1px solid var(--gold);
    color: var(--charcoal);
    letter-spacing: 0.15em;
    transition: all $dur-fast $ease-film;
    margin-top: $sp-2;

    &:hover:not(:disabled) {
      background: var(--gold);
      color: var(--warm-white);
    }

    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }
}

// Transition for conditional fields
.slide-enter-active,
.slide-leave-active {
  transition: all $dur-medium $ease-out-expo;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
