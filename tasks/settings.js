export default () => ({
    ports: {
        frontend: 3001,
        backend: 3000
    },
    source: {
        dir_target: "./src",
        styles_target: "/styles/style.scss",
        scripts_target: "/scripts/main.js"

    },
    common: {
        styles_dir: "static/styles/",
        scripts_dir: "static/scripts/",
        images_dir: "static/images/",
        fonts_dir: "static/fonts/",
        json_dir: "static/json/"
    },
    development: {
        root: "http://localhost",
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