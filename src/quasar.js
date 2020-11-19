import Vue from 'vue'

import 'quasar/dist/quasar.css'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

import {
  Quasar,
  LoadingBar,
  Dialog,
  Notify,
  Cookies,
  QAjaxBar,
  TouchPan,
  QMenu,
  ClosePopup,
  Ripple,
  AppFullscreen
} from 'quasar'

Vue.use(Quasar,
  {
    config: {},
    components: { /* not needed if importStrategy is not 'manual' */ },
    directives: { ClosePopup, Ripple },
    plugins: {
      LoadingBar,
      Dialog,
      Notify,
      Cookies,
      QAjaxBar,
      TouchPan,
      QMenu,
      AppFullscreen
    }
  })
