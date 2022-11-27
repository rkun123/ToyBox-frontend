import axios from 'axios'
import type { Method } from 'axios'

axios.defaults.withCredentials = true
export class AxiosClient {
  constructor() {}

  private static async request(
    method: Method,
    url: string,
    data?: object,
    content_type?: string
  ) {
    if (data) {
      return await axios.request({
        method,
        url,
        data
      })
    } else {
      return await axios.request({
        method,
        url
      })
    }
  }

  public static async client(
    method: Method = 'GET',
    url: string,
    data?: object,
    content_type?: string
  ) {
    if (data) {
      return await this.request(method, url, data, content_type)
    }
    return await this.request(method, url)
  }
}
