/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        redditMono: ['Reddit Mono', 'monospace']
      }
    },
  },
   //plugins: [
    //require('@tailwindcss/forms')
  //],
}
