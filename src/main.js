import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

// Vuetify
import "vuetify/dist/vuetify.min.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { mdiDelete, mdiGoogle, mdiAccount, mdiMagnify } from "@mdi/js";
import {
  mdiClipboardPulseOutline,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiFileDocumentOutline
} from "@mdi/js";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// tailwind
import "./index.css";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases: {
      delete: mdiDelete,
      google: mdiGoogle,
      account: mdiAccount,
      magnify: mdiMagnify,
      checkboxBlank: mdiCheckboxBlankOutline,
      checkboxMarked: mdiCheckboxMarked,
      clipboard: mdiClipboardPulseOutline,
      document: mdiFileDocumentOutline,
    },
    sets: {
      mdi,
    },
  },
  components,
  directives,
});

createApp(App).use(vuetify).use(router).mount("#app");
