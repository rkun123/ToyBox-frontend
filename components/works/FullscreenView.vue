<template>
  <div
    class="
      m-0
      overflow-hidden
      absolute
      top-0
      left-1/2
      -translate-x-1/2
      w-screen
      h-full
      z-40
      bg-black
    "
  >
    <img
      v-if="getAsset.asset_type === 'image'"
      class="
        w-full
        h-full
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2 -translate-y-1/2
        object-contain
      "
      :src="getAsset.url"
      alt="asset image"
    />
    <model-viewer
      v-if="getAsset.asset_type === 'model'"
      :model="getAsset"
      :fullscreen="true"
    />
    <span
      class="
        material-symbols-outlined
        cursor-pointer
        transition-all
        text-3xl
        select-none
        absolute
        bottom-3
        right-5
        z-50
        text-white
        bg-black bg-opacity-30
        rounded-full
        px-1
      "
      @click="exitFullscreen()"
    >
      fullscreen_exit
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Asset } from '@/types'
import { fullscreenStore } from '@/store'
import ModelViewer from '@/components/works/ModelViewer.vue'

@Component({
  components: { ModelViewer }
})
export default class WorksCarousel extends Vue {
  get getFullscreen() {
    return fullscreenStore.getFullscreen
  }

  get getAsset() {
    return fullscreenStore.getAsset
  }

  setFullscreen(boolean: boolean) {
    fullscreenStore.setFullscreen(boolean)
  }

  exitFullscreen() {
    fullscreenStore.setFullscreen(false)
    fullscreenStore.initAsset()
  }

  mounted() {
    window.addEventListener('popstate', this.exitFullscreen)
  }

  beforeDestroy() {
    window.removeEventListener('popstate', this.exitFullscreen)
  }
}
</script>
