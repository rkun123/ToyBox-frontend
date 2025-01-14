import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 1. 利用したいアイコンを以下にてimportする
import {
  faDownload,
  faHeart as faSolidHeart,
  faPlus,
  faTimes,
  faCaretUp,
  faLock,
  faUpload,
  faCheck,
  faLink,
  faUsers,
  faTags,
  faPlusCircle,
  faInfoCircle,
  faPen,
  faReply,
  faPaperPlane,
  faCircleNotch,
  faGlobe,
  faSearch,
  faMinus,
  faCaretDown,
  faSave,
  faEllipsisH,
  faTrashAlt,
  faChevronDown,
  faChevronUp,
  faVoteYea,
  faCube
} from '@fortawesome/free-solid-svg-icons'

import {
  faYoutube,
  faTwitter,
  faGithub,
  faMastodon,
  faUnity,
  faSoundcloud
} from '@fortawesome/free-brands-svg-icons'

import {
  faHeart,
  faQuestionCircle,
  faCheckCircle,
  faCircle
} from '@fortawesome/free-regular-svg-icons'

config.autoAddCss = false

// 2. 利用したいアイコンを以下にてlibrary.addする
library.add(
  faYoutube,
  faHeart,
  faSolidHeart,
  faTwitter,
  faDownload,
  faPlus,
  faTimes,
  faCaretUp,
  faLock,
  faUpload,
  faSave,
  faCheck,
  faLink,
  faGithub,
  faUsers,
  faTags,
  faPlusCircle,
  faInfoCircle,
  faPen,
  faReply,
  faPaperPlane,
  faMastodon,
  faCircleNotch,
  faGlobe,
  faSearch,
  faMinus,
  faQuestionCircle,
  faCaretDown,
  faEllipsisH,
  faTrashAlt,
  faChevronDown,
  faChevronUp,
  faVoteYea,
  faUnity,
  faSoundcloud,
  faCube,
  faCheckCircle,
  faCircle
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

/**
 * <!-- 利用 -->
 * <font-awesome-icon icon="times" />
 *
 * <!-- brandsの場合 -->
 * <font-awesome-icon :icon="['fab', 'youtube']" />
 * <!-- regularの場合 -->
 * <font-awesome-icon :icon="['far', 'faHeart']" />
 */
