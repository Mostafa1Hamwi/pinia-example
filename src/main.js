import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'

// Icons and Styles
import "./assets/main.pcss";

// App Wide Components
import AppButton from "./components/AppButton.vue";
import AppCountInput from "./components/AppCountInput.vue";
import AppModalOverlay from "./components/AppModalOverlay.vue";

// Init App
createApp(App)
    .use(createPinia())
    .component("AppButton", AppButton)
    .component("AppCountInput", AppCountInput)
    .component("AppModalOverlay", AppModalOverlay)
    .mount("#app");
