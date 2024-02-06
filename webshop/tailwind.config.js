/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{html,js,jsx}",
        "./node_modules/flowbite/**/*.js",
        "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("flowbite/plugin")],
}
