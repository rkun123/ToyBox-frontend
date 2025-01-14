<template>
  <hooper
    :settings="hooperSettings"
    class="
      bg-black
      rounded-t-2xl
      overflow-hidden
      pb-5
      relative
      max-h-[500px]
      min-h-[250px]
      !h-[56vw]
      isolate
    "
  >
    <slide
      v-for="asset in showAssets"
      :key="asset.id"
      class="flex justify-center items-center relative"
      :class="{ 'bg-white': asset.asset_type === 'model' }"
    >
      <item-image-view v-if="asset.asset_type === 'image'" :image="asset" />
      <video
        v-else-if="asset.asset_type === 'video'"
        controls
        class="h-full w-full"
      >
        <source :src="asset.url" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <audio v-else-if="asset.asset_type === 'music'" controls :src="asset.url">
        Your browser does not support the <code>audio</code> element.
      </audio>
      <ModelViewer
        v-else-if="asset.asset_type === 'model'"
        :model="asset"
        ref="modelViewer"
      />
      <div v-else>{{ asset.asset_type }} file is not supported.</div>
    </slide>
    <hooper-pagination slot="hooper-addons" />
    <hooper-navigation slot="hooper-addons" />
  </hooper>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator'
import {
  Hooper,
  Slide,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from 'hooper'
import 'hooper/dist/hooper.css'

import ItemImageView from '@/components/works/carouselItem/ImageView.vue'

import { Asset } from '@/types'
import ModelViewer from '@/components/works/ModelViewer.vue'

@Component({
  components: {
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation,
    ItemImageView,
    ModelViewer
  }
})
export default class WorksCarousel extends Vue {
  // @Ref() modelViewer: ModelViewer
  showAssets: Asset[] = []
  showAssetsType: string[] = ['image', 'video', 'music', 'model']

  @Prop({ type: Array, required: true })
  assets!: Asset[]

  hooperSettings: any = {
    infiniteScroll: false,
    centerMode: true,
    keysControl: false,
    itemsToShow: 1,
    mouseDrag: false,
    transition: 500,
    wheelControl: false
  }

  created() {
    for (let i = 0; i < this.assets.length; i++) {
      if (this.showAssetsType.includes(this.assets[i].asset_type)) {
        this.showAssets.push(this.assets[i])
      }
    }
  }
}
</script>

<style scoped>
::v-deep .hooper-next,
::v-deep .hooper-prev {
  background-color: white;
  opacity: 0.3;
  border-radius: 50px;
  padding: 0;
  margin: 1rem;
  transition: transform 100ms;
}
::v-deep .hooper-next:hover,
::v-deep .hooper-prev:hover {
  color: black;
}
::v-deep .hooper-next:hover {
  transform: translate(0.125rem, -50%);
}
::v-deep .hooper-prev:hover {
  transform: translate(-0.125rem, -50%);
}
</style>
