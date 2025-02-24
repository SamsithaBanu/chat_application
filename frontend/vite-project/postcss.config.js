import postcssImport from "postcss-import";
import tailwindcss from "@tailwindcss/postcss"; // ✅ Use the correct package
import autoprefixer from "autoprefixer";

/** @type {import('postcss').AcceptedPlugin[]} */
export default {
  plugins: [
    postcssImport,
    tailwindcss, // ✅ Corrected TailwindCSS plugin
    autoprefixer,
  ],
};
