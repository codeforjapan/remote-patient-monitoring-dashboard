<template>
  <transition name="modalWrapTransition" @after-enter="showContent = true">
    <div
      v-if="show"
      class="modalWrap"
      @click="showContent ? (showContent = false) : $emit('close')"
    >
      <transition name="modalContentTransition" @after-leave="$emit('close')">
        <div
          v-if="showContent"
          :class="['modalContent', wide ? 'wide' : '']"
          @click.stop
        >
          <div class="closeButton" @click="showContent = false">
            <CloseIcon />
          </div>
          <div class="modalContentBody">
            <slot />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
/**
 * usage:
 *      <ModalBase
 *        :show="state.showModal"
 *        @close="state.showModal = false"
 *      >
 *        （モーダルコンテンツまたはコンテンツを含んだコンポーネント）
 *      </ModalBase>
 */
import Vue from 'vue'
import CloseIcon from '@/static/icon-close.svg'

export default Vue.extend({
  components: {
    CloseIcon,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    wide: {
      type: Boolean,
      default: false,
    },
  },
  data(): {
    showContent: boolean
  } {
    return {
      showContent: false,
    }
  },
})
</script>

<style scoped lang="scss">
.modalWrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7000;
  width: 100%;
  height: 100%;
  background-color: rgba($black, 0.85);

  &Transition {
    &-enter,
    &-leave-to {
      opacity: 0;
    }
    &-enter-active,
    &-leave-active {
      transition: all 0.15s ease-in-out;
    }
  }
}
.modalContent {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 520px;
  max-height: calc(100vh - 100px);
  padding: 22px 10px 40px;
  background-color: $white;
  border-radius: 10px;
  transform: translate(-50%, -50%);

  &.wide {
    max-width: 850px;
  }

  &Transition {
    &-enter,
    &-leave-to {
      opacity: 0;
      transform: translate(-50%, 50px);
    }
    &-enter-active,
    &-leave-active {
      transition: all 0.25s ease-in-out;
    }
  }
}
.modalContentBody {
  max-height: calc(100vh - 200px);
  padding: 0 30px;
  overflow-y: auto;
}
.closeButton {
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
  }
}
</style>
