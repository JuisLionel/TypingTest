function Color() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "blue";
    });

    switch (theme) {
        case "1976":
            return "#6ad9c7";
        case "8008":
            return "#3c4756";
        case "9009":
            return "#b6b09a";
        case "dots":
            return "#191b25";
        case "light":
            return "#ffffff";
        case "gruvbox":
            return "#282828";
        case "leviathan":
            return "#182031";
        case "kobayashi":
            return "#ebcd01";
        case "blue":
        default:
            return "#2563eb";
    }
}

export default Color;
