import { Middleware } from '@nuxt/types'
import { authStore } from '~/store'

const auth: Middleware = async ({ route }) => {
  await authStore.fetchUser()
}

export default auth
