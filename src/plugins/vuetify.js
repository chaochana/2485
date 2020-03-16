import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: process.env.VUE_APP_VUETIFY_DARK_THEME
  }
})
