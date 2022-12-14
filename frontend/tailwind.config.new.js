module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "logo": "var(--logo)",
                "icon": "var(--icon)",
                "p-bg": "var(--p-bg)"
            },
            fontSize: {
                xs: '0.688rem',
                sm: '0.813rem',
                base: '0.875rem',
                lg: '1rem',
                xl: '1.125rem',
                '2xl': '1.5rem',
                '3xl': '1.75rem',
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            spacing: {
                '128': '32rem',
                '160': '40rem',
            },
            colors: {
                "primary": "var(--primary)",
                "primary-dark": "var(--primary-dark)",
                "border-primary": "var(--border-primary)",
                "border-secondary": "var(--border-secondary)",
                "border-tertiary": "var(--border-tertiary)",
                "p-bg": "var(--p-bg)",
                "bg-01": "var(--bg-01)",
                "bg-02": "var(--bg-02)",
                "bg-03": "var(--bg-03)",
                "bg-card": "var(--bg-card)",
                "bg-input": "var(--bg-input)",
                "bg-search": "var(--bg-search)",
                "bg-card-hover": "var(--bg-card-hover)",
                "bg-card-secondary": "var(--bg-card-secondary)",
                "bg-card-secondary-hover": "var(--bg-card-secondary-hover)",
                "secondary": "var(--secondary)",
                "tertiary": "var(--tertiary)",
                "black": "var(--black)",
                "txt-hover": "var(--txt-hover)",
                "txt-primary": "var(--txt-primary)",
                "txt-inverted": "var(--txt-inverted)",
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
