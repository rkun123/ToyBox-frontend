<template>
  <div>
    <users-profile :user="user" />
    <works-filter
      :include-draft="me && me.id === $route.params.id"
      @search="searchWorks"
      @clear="clear"
      id="user_work"
    />
    <div class="relative w-full min-h-[50vh]">
      <works-list v-if="!processing" :works="works" />
      <loading v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import UsersProfile from '@/components/users/UsersProfile.vue'
import WorksFilter from '@/components/works/WorksFilter.vue'
import WorksList from '@/components/works/WorksList.vue'
import Loading from '@/components/commons/Loading.vue'

import { User, Work } from '@/types'
import { authStore, tagSelectorStore, workFilterStore } from '~/store'
import { AxiosClient } from '@/utils/axios'
import { Query } from '@/utils/query'
import axios, { AxiosResponse } from 'axios'

@Component({
  components: {
    UsersProfile,
    WorksFilter,
    WorksList,
    Loading
  }
})
export default class Users extends Vue {
  works!: Work[]
  user!: User
  userWorksCount: number = 6
  userWorks: string[] = Array(this.userWorksCount)
  processing: boolean = false
  query: Query = new Query()

  get me() {
    return authStore.getUser
  }

  get getSelectedTags() {
    return tagSelectorStore.getSelectedTags
  }

  get getFilterVisibility() {
    return workFilterStore.getFilterVisibility
  }

  created() {
    workFilterStore.setUseConditionsWhenAsyncData(true)
    workFilterStore.setSearched(true)
    this.searchWorks()
  }

  async getUser() {
    if (!this.me) {
      // 認証されていない or 自分以外のユーザーページであれば取得する
      const userResponse: AxiosResponse<User> = await AxiosClient.client(
        'GET',
        `/users/${this.$route.params.id}`
      )
      this.user = userResponse.data
    }
  }

  async searchWorks() {
    workFilterStore.setSearched(true)
    this.processing = true
    this.query.init()
    this.query.create(this.getSelectedTags, this.getFilterVisibility)
    let resWorks: AxiosResponse<Work[]>
    if (this.me?.id === this.$route.params.id) {
      // 自分のマイページであれば/users/@me/worksを取得
      resWorks = await AxiosClient.client(
        'GET',
        `/users/@me/works${this.query.getQuery()}`
      )
    } else {
      // 自分以外のページであればidで取得
      resWorks = await AxiosClient.client(
        'GET',
        `/users/${this.$route.params.id}/works${this.query.getQuery()}`
      )
    }
    if (resWorks.status !== 200) {
      alert('作品一覧の取得に失敗しました')
    }
    this.works = resWorks.data
    this.works.splice(0)
    this.processing = false
  }

  async clear() {
    if (this.me) {
      workFilterStore.deleteFilterVisibility()
      tagSelectorStore.initSelectedTags()
      await this.searchWorks()
      workFilterStore.setSearched(true)
    }
  }
}
</script>
