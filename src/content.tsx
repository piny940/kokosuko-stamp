import './styles/global.scss'
import 'bootstrap'
import { insertMioLink } from './lib/utils'
import { onYoutube } from './youtube'

insertMioLink()
if (window.location.hostname == 'www.youtube.com') {
  onYoutube()
}
