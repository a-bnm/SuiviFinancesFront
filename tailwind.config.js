module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            "transparent": "transparent",
            "white": "white",
            "black": "black",
            "red": "red",
            "gray": {
                "100": "#f3f4f6"
            },
            "primary": {
                "100": "#048153",
                "75": "#18B478",
                "50": "#5EC2B7",
            },
            "secondary1": {
                "100": "#043281",
                "50": "#4B66AF"
            },
            "secondary2": {
                "100": "#B040B0",
                "50": "#E3BCE3"
            }
        }
    },
    plugins: [require('@tailwindcss/forms')],
}
