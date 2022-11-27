import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import axios from 'axios'
import { User } from '~/types'

config.rawError = true
axios.defaults.baseURL = process.env.API_URL

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true
})
export default class Auth extends VuexModule {
  private user: User | null = null

  public get getUser(): User | null {
    return this.user
  }

  public get nowLogin(): Boolean {
    return this.user !== null
  }

  @Mutation
  setUser(user: User | null) {
    this.user = user
  }

  @Action
  public authDiscord() {
    // ここでDiscordログイン実装
    window.location.href = String(process.env.AUTHENTICATION_URL)
  }

  @Action
  public async authAgain() {
    await this.authDiscord()
    await this.fetchUser()
  }

  @Action
  public async fetchUser(): Promise<void> {
    try {
      const res = await axios.get('/users/@me')
      this.setUser(res.data)
    } catch (e: unknown) {
      this.setUser(null)
    }
  }

  @Action
  public async logout(): Promise<void> {
    await axios.post('/api/v1/auth/logout')
  }
}
