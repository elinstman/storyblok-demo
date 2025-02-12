// import { reactRouter } from "@react-router/dev/vite";
// import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";
//   // import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [reactRouter(), tsconfigPaths(), react()],
// });


import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    reactRouter(),
  ],
  optimizeDeps: {
    exclude: ['@react-router/dev']
  }
})