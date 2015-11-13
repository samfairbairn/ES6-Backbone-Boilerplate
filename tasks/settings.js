export default () => ({
    source: {
        dir_target: "./src",
        styles_target: "/styles/style.scss",
        scripts_target: "/scripts/main.js"

    },
    development: {
        dir_target: "build",
        styles_target: "style",
        scripts_target: "main"

    },
    production: {
        target_dir: "dist",
        styles_target: "styles/style.min",
        scripts_target: "scripts/main.min"
    }
});