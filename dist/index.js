"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const postcss_1 = require("postcss");
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const defaultConfig = {
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        spacing: {
            px: "1px",
            0: "0px",
            0.5: "0.125rem",
            1: "0.25rem",
            1.5: "0.375rem",
            2: "0.5rem",
            2.5: "0.625rem",
            3: "0.75rem",
            3.5: "0.875rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            7: "1.75rem",
            8: "2rem",
            9: "2.25rem",
            10: "2.5rem",
            11: "2.75rem",
            12: "3rem",
            14: "3.5rem",
            16: "4rem",
            20: "5rem",
            24: "6rem",
            28: "7rem",
            32: "8rem",
            36: "9rem",
            40: "10rem",
            44: "11rem",
            48: "12rem",
            52: "13rem",
            56: "14rem",
            60: "15rem",
            64: "16rem",
            72: "18rem",
            80: "20rem",
            96: "24rem",
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "2/4": "50%",
            "3/4": "75%",
            full: "100%",
            auto: "auto", // Added 'auto' to spacing for m-auto
            // Note: '7xl' should be here if max-w-7xl uses spacing.
            // If it uses a dedicated maxWidth scale, it's defined there.
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: "#000",
            white: "#fff",
            gray: {
                50: "#f9fafb",
                100: "#f3f4f6",
                200: "#e5e7eb",
                300: "#d1d5db",
                400: "#9ca3af",
                500: "#6b7280",
                600: "#4b5563",
                700: "#374151",
                800: "#1f2937",
                900: "#111827",
            },
            blue: {
                50: "#eff6ff",
                100: "#dbeafe",
                200: "#bfdbfe",
                300: "#93c5fd",
                400: "#60a5fa",
                500: "#3b82f6",
                600: "#2563eb",
                700: "#1d4ed8",
                800: "#1e40af",
                900: "#1e3a8a",
            },
            // Add more colors if needed
        },
        fontSize: {
            xs: ["0.75rem", { lineHeight: "1rem" }],
            sm: ["0.875rem", { lineHeight: "1.25rem" }],
            base: ["1rem", { lineHeight: "1.5rem" }],
            lg: ["1.125rem", { lineHeight: "1.75rem" }],
            xl: ["1.25rem", { lineHeight: "1.75rem" }],
            "2xl": ["1.5rem", { lineHeight: "2rem" }],
            "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
            "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
            "5xl": ["3rem", { lineHeight: "1" }],
            "6xl": ["3.75rem", { lineHeight: "1" }],
            "7xl": ["4.5rem", { lineHeight: "1" }],
            "8xl": ["6rem", { lineHeight: "1" }],
            "9xl": ["8rem", { lineHeight: "1" }],
        },
        fontWeight: {
            thin: "100",
            extralight: "200",
            light: "300",
            normal: "400",
            medium: "500",
            semibold: "600",
            bold: "700",
            extrabold: "800",
            black: "900",
        },
        lineHeight: {
            none: "1",
            tight: "1.25",
            snug: "1.375",
            normal: "1.5",
            relaxed: "1.625",
            loose: "2",
            3: ".75rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            7: "1.75rem",
            8: "2rem",
            9: "2.25rem",
            10: "2.5rem",
        },
        boxShadow: {
            sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
            none: "none",
        },
        zIndex: {
            0: "0",
            10: "10",
            20: "20",
            30: "30",
            40: "40",
            50: "50",
            auto: "auto",
        },
        opacity: {
            0: "0",
            5: "0.05",
            10: "0.1",
            20: "0.2",
            25: "0.25",
            30: "0.3",
            40: "0.4",
            50: "0.5",
            60: "0.6",
            70: "0.7",
            75: "0.75",
            80: "0.8",
            90: "0.9",
            95: "0.95",
            100: "1",
        },
        borderRadius: {
            none: "0",
            sm: "0.125rem",
            DEFAULT: "0.25rem",
            md: "0.375rem",
            lg: "0.5rem",
            xl: "0.75rem",
            "2xl": "1rem",
            "3xl": "1.5rem",
            full: "9999px",
        },
        borderWidth: {
            DEFAULT: "1px",
            0: "0px",
            2: "2px",
            4: "4px",
            8: "8px",
        },
        gridTemplateColumns: {
            none: "none",
            1: "repeat(1, minmax(0, 1fr))",
            2: "repeat(2, minmax(0, 1fr))",
            3: "repeat(3, minmax(0, 1fr))",
            4: "repeat(4, minmax(0, 1fr))",
            5: "repeat(5, minmax(0, 1fr))",
            6: "repeat(6, minmax(0, 1fr))",
            7: "repeat(7, minmax(0, 1fr))",
            8: "repeat(8, minmax(0, 1fr))",
            9: "repeat(9, minmax(0, 1fr))",
            10: "repeat(10, minmax(0, 1fr))",
            11: "repeat(11, minmax(0, 1fr))",
            12: "repeat(12, minmax(0, 1fr))",
        },
        gridTemplateRows: {
            none: "none",
            1: "repeat(1, minmax(0, 1fr))",
            2: "repeat(2, minmax(0, 1fr))",
            3: "repeat(3, minmax(0, 1fr))",
            4: "repeat(4, minmax(0, 1fr))",
            5: "repeat(5, minmax(0, 1fr))",
            6: "repeat(6, minmax(0, 1fr))",
        },
        flex: {
            1: "1 1 0%",
            auto: "1 1 auto",
            initial: "0 1 auto",
            none: "none",
        },
        transitionProperty: {
            none: "none",
            all: "all",
            DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
            colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
            opacity: "opacity",
            shadow: "box-shadow",
            transform: "transform",
        },
        transitionDuration: {
            DEFAULT: "150ms",
            75: "75ms",
            100: "100ms",
            150: "150ms",
            200: "200ms",
            300: "300ms",
            500: "500ms",
            700: "700ms",
            1000: "1000ms",
        },
        transitionTimingFunction: {
            DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
            linear: "linear",
            in: "cubic-bezier(0.4, 0, 1, 1)",
            out: "cubic-bezier(0, 0, 0.2, 1)",
            "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        },
        maxWidth: {
            0: "0rem",
            none: "none",
            xs: "20rem",
            sm: "24rem",
            md: "28rem",
            lg: "32rem",
            xl: "36rem",
            "2xl": "42rem",
            "3xl": "48rem",
            "4xl": "56rem",
            "5xl": "64rem",
            "6xl": "72rem",
            "7xl": "80rem", // Explicitly added for max-w-7xl
            full: "100%",
            min: "min-content",
            max: "max-content",
            prose: "65ch",
            "screen-sm": "640px",
            "screen-md": "768px",
            "screen-lg": "1024px",
            "screen-xl": "1280px",
            "screen-2xl": "1536px",
        },
        maxHeight: {
            0: "0rem",
            none: "none",
            full: "100%",
            screen: "100vh",
            min: "min-content",
            max: "max-content",
            fit: "fit-content",
        },
    },
    variants: {
        responsive: ["sm", "md", "lg", "xl", "2xl"],
        pseudoClasses: [
            "hover",
            "focus",
            "active",
            "visited",
            "first",
            "last",
            "odd",
            "even",
            "focus-within", // Added this common variant
            "disabled", // Added this common variant
            "group-hover", // Added this common variant
        ],
    },
};
// --- 2. Helper Functions ---
// Universal getter for theme values
function get(obj, path, defaultValue) {
    const travel = (regexp) => String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
    const result = travel(/[,[\]].?|[/.]/);
    return result === undefined || result === obj ? defaultValue : result;
}
/**
 * Generates CSS declarations for a given utility class name.
 * @param className The utility class name (e.g., 'text-blue-500', 'p-4', 'sm:flex').
 * @param config The merged RelaxCSS configuration.
 * @returns An array of PostCSS Declaration nodes.
 */
function generateUtilityCss(className, config) {
    var _a;
    const declarations = [];
    const arbitraryMatch = className.match(/^\[(.*?)\]$/);
    if (arbitraryMatch) {
        // For arbitrary values like `w-[100px]`
        return []; // These are typically handled by `parseValue` if it's aware of them.
        // For this context, assuming direct utility generation from named classes.
    }
    const getColor = (colorName) => {
        const parts = colorName.split("-");
        if (parts.length === 2 &&
            get(config.theme.colors, parts[0]) &&
            get(config.theme.colors, `${parts[0]}.${parts[1]}`)) {
            return get(config.theme.colors, `${parts[0]}.${parts[1]}`);
        }
        const color = get(config.theme.colors, colorName);
        return typeof color === "string" ? color : undefined;
    };
    // Helper for applying spacing-based properties
    const applySpacingProperty = (propBase, valueKey, axisOrSide) => {
        const value = get(config.theme.spacing, valueKey);
        if (value === undefined && valueKey !== "auto")
            return; // Allow 'auto' for margin
        const finalValue = valueKey === "auto" && propBase.startsWith("margin") ? "auto" : value;
        switch (axisOrSide) {
            case "x":
                declarations.push(new postcss_1.Declaration({ prop: `${propBase}-left`, value: finalValue }), new postcss_1.Declaration({ prop: `${propBase}-right`, value: finalValue }));
                break;
            case "y":
                declarations.push(new postcss_1.Declaration({ prop: `${propBase}-top`, value: finalValue }), new postcss_1.Declaration({ prop: `${propBase}-bottom`, value: finalValue }));
                break;
            case "t":
                declarations.push(new postcss_1.Declaration({ prop: `${propBase}-top`, value: finalValue }));
                break;
            case "r":
                declarations.push(new postcss_1.Declaration({ prop: `${propBase}-right`, value: finalValue }));
                break;
            case "b":
                declarations.push(new postcss_1.Declaration({ prop: `${propBase}-bottom`, value: finalValue }));
                break;
            case "l":
                declarations.push(new postcss_1.Declaration({ prop: `${propBase}-left`, value: finalValue }));
                break;
            default: // No axis or side, apply to all
                declarations.push(new postcss_1.Declaration({ prop: propBase, value: finalValue }));
                break;
        }
    };
    // Parse class name into prefix and suffix
    const dashIndex = className.indexOf("-");
    let prefix = className;
    let suffix = "";
    if (dashIndex !== -1) {
        prefix = className.substring(0, dashIndex);
        suffix = className.substring(dashIndex + 1);
    }
    // Handle complex cases with specific logic first
    if (className.startsWith("p-") || className.startsWith("m-")) {
        const match = className.match(/^(p|m)(x|y|t|r|b|l)?-(.+)$/);
        if (match) {
            const propType = match[1] === "p" ? "padding" : "margin";
            const axisOrSide = match[2];
            const valueKey = match[3];
            applySpacingProperty(propType, valueKey, axisOrSide);
        }
    }
    else if (className.startsWith("px-")) {
        applySpacingProperty("padding", className.substring(3), "x");
    }
    else if (className.startsWith("py-")) {
        applySpacingProperty("padding", className.substring(3), "y");
    }
    else if (className.startsWith("pt-")) {
        applySpacingProperty("padding", className.substring(3), "t");
    }
    else if (className.startsWith("pr-")) {
        applySpacingProperty("padding", className.substring(3), "r");
    }
    else if (className.startsWith("pb-")) {
        applySpacingProperty("padding", className.substring(3), "b");
    }
    else if (className.startsWith("pl-")) {
        applySpacingProperty("padding", className.substring(3), "l");
    }
    else if (className.startsWith("mx-")) {
        applySpacingProperty("margin", className.substring(3), "x");
    }
    else if (className.startsWith("my-")) {
        applySpacingProperty("margin", className.substring(3), "y");
    }
    else if (className.startsWith("mt-")) {
        applySpacingProperty("margin", className.substring(3), "t");
    }
    else if (className.startsWith("mr-")) {
        applySpacingProperty("margin", className.substring(3), "r");
    }
    else if (className.startsWith("mb-")) {
        applySpacingProperty("margin", className.substring(3), "b");
    }
    else if (className.startsWith("ml-")) {
        applySpacingProperty("margin", className.substring(3), "l");
    }
    else if (className.startsWith("max-w-")) {
        const value = get(config.theme.maxWidth, suffix);
        if (value !== undefined)
            declarations.push(new postcss_1.Declaration({ prop: "max-width", value }));
    }
    else if (className.startsWith("max-h-")) {
        const value = get(config.theme.maxHeight, suffix);
        if (value !== undefined)
            declarations.push(new postcss_1.Declaration({ prop: "max-height", value }));
    }
    // All other utilities handled by a switch or direct lookup
    else {
        switch (prefix) {
            case "text":
                // Handle text color (e.g., text-blue-500)
                if (suffix.includes("-")) {
                    const colorValue = getColor(suffix);
                    if (colorValue)
                        declarations.push(new postcss_1.Declaration({ prop: "color", value: colorValue }));
                }
                else {
                    // Handle font size (e.g., text-xl)
                    const fontSizeTuple = get(config.theme.fontSize, suffix);
                    if (Array.isArray(fontSizeTuple)) {
                        declarations.push(new postcss_1.Declaration({ prop: "font-size", value: fontSizeTuple[0] }));
                        if ((_a = fontSizeTuple[1]) === null || _a === void 0 ? void 0 : _a.lineHeight) {
                            declarations.push(new postcss_1.Declaration({
                                prop: "line-height",
                                value: fontSizeTuple[1].lineHeight,
                            }));
                        }
                    }
                }
                break;
            case "bg":
                // Handle background color (e.g., bg-blue-500)
                if (suffix.includes("-")) {
                    const colorValue = getColor(suffix);
                    if (colorValue)
                        declarations.push(new postcss_1.Declaration({ prop: "background-color", value: colorValue }));
                }
                // Handle other bg-* utilities
                else if (suffix === "fixed")
                    declarations.push(new postcss_1.Declaration({ prop: "background-attachment", value: "fixed" }));
                else if (suffix === "local")
                    declarations.push(new postcss_1.Declaration({ prop: "background-attachment", value: "local" }));
                else if (suffix === "scroll")
                    declarations.push(new postcss_1.Declaration({ prop: "background-attachment", value: "scroll" }));
                else if (suffix.startsWith("clip-")) {
                    declarations.push(new postcss_1.Declaration({
                        prop: "background-clip",
                        value: suffix.substring(5),
                    }));
                }
                else if (suffix.startsWith("origin-")) {
                    declarations.push(new postcss_1.Declaration({
                        prop: "background-origin",
                        value: suffix.substring(7),
                    }));
                }
                else if (["bottom", "center", "left", "right", "top"].includes(suffix)) {
                    declarations.push(new postcss_1.Declaration({ prop: "background-position", value: suffix }));
                }
                else if (suffix.match(/^(left|right|top|bottom)-(top|bottom|left|right)$/)) {
                    declarations.push(new postcss_1.Declaration({
                        prop: "background-position",
                        value: suffix.replace("-", " "),
                    }));
                }
                else if (suffix === "no-repeat")
                    declarations.push(new postcss_1.Declaration({ prop: "background-repeat", value: "no-repeat" }));
                else if (suffix === "repeat")
                    declarations.push(new postcss_1.Declaration({ prop: "background-repeat", value: "repeat" }));
                else if (suffix === "repeat-x")
                    declarations.push(new postcss_1.Declaration({ prop: "background-repeat", value: "repeat-x" }));
                else if (suffix === "repeat-y")
                    declarations.push(new postcss_1.Declaration({ prop: "background-repeat", value: "repeat-y" }));
                else if (suffix === "round")
                    declarations.push(new postcss_1.Declaration({ prop: "background-repeat", value: "round" }));
                else if (suffix === "space")
                    declarations.push(new postcss_1.Declaration({ prop: "background-repeat", value: "space" }));
                else if (suffix === "auto")
                    declarations.push(new postcss_1.Declaration({ prop: "background-size", value: "auto" }));
                else if (suffix === "cover")
                    declarations.push(new postcss_1.Declaration({ prop: "background-size", value: "cover" }));
                else if (suffix === "contain")
                    declarations.push(new postcss_1.Declaration({ prop: "background-size", value: "contain" }));
                else if (suffix === "none")
                    declarations.push(new postcss_1.Declaration({ prop: "background-image", value: "none" }));
                else if (suffix.startsWith("gradient-to-")) {
                    const direction = suffix.substring(12);
                    const gradientMap = {
                        t: "to top",
                        tr: "to top right",
                        r: "to right",
                        br: "to bottom right",
                        b: "to bottom",
                        bl: "to bottom left",
                        l: "to left",
                        tl: "to top left",
                    };
                    if (gradientMap[direction]) {
                        declarations.push(new postcss_1.Declaration({
                            prop: "background-image",
                            value: `linear-gradient(${gradientMap[direction]}, var(--tw-gradient-stops))`,
                        }));
                    }
                }
                break;
            case "font":
                const fontWeightValue = get(config.theme.fontWeight, suffix);
                if (fontWeightValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "font-weight", value: fontWeightValue }));
                break;
            case "leading":
                const lineHeightValue = get(config.theme.lineHeight, suffix);
                if (lineHeightValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "line-height", value: lineHeightValue }));
                break;
            case "shadow":
                const shadowValue = get(config.theme.boxShadow, suffix || "DEFAULT");
                if (shadowValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "box-shadow", value: shadowValue }));
                break;
            case "z":
                const zIndexValue = get(config.theme.zIndex, suffix);
                if (zIndexValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "z-index", value: zIndexValue }));
                break;
            case "opacity":
                const opacityValue = get(config.theme.opacity, suffix);
                if (opacityValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "opacity", value: opacityValue }));
                break;
            case "rounded":
                const borderRadiusValue = get(config.theme.borderRadius, suffix || "DEFAULT");
                if (borderRadiusValue !== undefined) {
                    if (suffix.startsWith("t-"))
                        declarations.push(new postcss_1.Declaration({
                            prop: "border-top-left-radius",
                            value: borderRadiusValue,
                        }), new postcss_1.Declaration({
                            prop: "border-top-right-radius",
                            value: borderRadiusValue,
                        }));
                    else if (suffix.startsWith("b-"))
                        declarations.push(new postcss_1.Declaration({
                            prop: "border-bottom-left-radius",
                            value: borderRadiusValue,
                        }), new postcss_1.Declaration({
                            prop: "border-bottom-right-radius",
                            value: borderRadiusValue,
                        }));
                    else if (suffix.startsWith("l-"))
                        declarations.push(new postcss_1.Declaration({
                            prop: "border-top-left-radius",
                            value: borderRadiusValue,
                        }), new postcss_1.Declaration({
                            prop: "border-bottom-left-radius",
                            value: borderRadiusValue,
                        }));
                    else if (suffix.startsWith("r-"))
                        declarations.push(new postcss_1.Declaration({
                            prop: "border-top-right-radius",
                            value: borderRadiusValue,
                        }), new postcss_1.Declaration({
                            prop: "border-bottom-right-radius",
                            value: borderRadiusValue,
                        }));
                    else if (suffix.startsWith("tl-"))
                        declarations.push(new postcss_1.Declaration({
                            prop: "border-top-left-radius",
                            value: borderRadiusValue,
                        }));
                    else if (suffix.startsWith("tr-"))
                        declarations.push(new postcss_1.Declaration({
                            prop: "border-top-right-radius",
                            value: borderRadiusValue,
                        }));
                    else if (suffix.startsWith("bl-"))
                        declarations.push(new postcss_1.Declaration({
                            prop: "border-bottom-left-radius",
                            value: borderRadiusValue,
                        }));
                    else if (suffix.startsWith("br-"))
                        declarations.push(new postcss_1.Declaration({
                            prop: "border-bottom-right-radius",
                            value: borderRadiusValue,
                        }));
                    else
                        declarations.push(new postcss_1.Declaration({
                            prop: "border-radius",
                            value: borderRadiusValue,
                        }));
                }
                break;
            case "border":
                if (suffix.includes("-")) {
                    // border-color (e.g., border-red-500)
                    const colorValue = getColor(suffix);
                    if (colorValue)
                        declarations.push(new postcss_1.Declaration({ prop: "border-color", value: colorValue }));
                    else {
                        // border-width (e.g., border-2)
                        const widthValue = get(config.theme.borderWidth, suffix);
                        if (widthValue !== undefined)
                            declarations.push(new postcss_1.Declaration({ prop: "border-width", value: widthValue }));
                    }
                }
                else {
                    // border (default width)
                    declarations.push(new postcss_1.Declaration({
                        prop: "border-width",
                        value: get(config.theme.borderWidth, "DEFAULT"),
                    }), new postcss_1.Declaration({ prop: "border-style", value: "solid" }), new postcss_1.Declaration({ prop: "border-color", value: "currentColor" }));
                }
                break;
            case "grid":
                if (suffix === "cols") {
                    const value = get(config.theme.gridTemplateColumns, suffix);
                    if (value)
                        declarations.push(new postcss_1.Declaration({ prop: "grid-template-columns", value }));
                }
                else if (suffix === "rows") {
                    const value = get(config.theme.gridTemplateRows, suffix);
                    if (value)
                        declarations.push(new postcss_1.Declaration({ prop: "grid-template-rows", value }));
                }
                else if (suffix === "") {
                    // display: grid
                    declarations.push(new postcss_1.Declaration({ prop: "display", value: "grid" }));
                }
                break;
            case "col":
                if (suffix.startsWith("span-")) {
                    const span = get(config.theme.spacing, suffix.substring(5)); // Using spacing for numbers
                    if (span)
                        declarations.push(new postcss_1.Declaration({
                            prop: "grid-column",
                            value: `span ${span} / span ${span}`,
                        }));
                }
                else if (suffix.startsWith("start-")) {
                    const start = get(config.theme.spacing, suffix.substring(6));
                    if (start)
                        declarations.push(new postcss_1.Declaration({ prop: "grid-column-start", value: start }));
                }
                else if (suffix.startsWith("end-")) {
                    const end = get(config.theme.spacing, suffix.substring(4));
                    if (end)
                        declarations.push(new postcss_1.Declaration({ prop: "grid-column-end", value: end }));
                }
                else if (suffix === "auto") {
                    declarations.push(new postcss_1.Declaration({ prop: "grid-column", value: "auto" }));
                }
                break;
            case "row":
                if (suffix.startsWith("span-")) {
                    const span = get(config.theme.spacing, suffix.substring(5));
                    if (span)
                        declarations.push(new postcss_1.Declaration({
                            prop: "grid-row",
                            value: `span ${span} / span ${span}`,
                        }));
                }
                else if (suffix.startsWith("start-")) {
                    const start = get(config.theme.spacing, suffix.substring(6));
                    if (start)
                        declarations.push(new postcss_1.Declaration({ prop: "grid-row-start", value: start }));
                }
                else if (suffix.startsWith("end-")) {
                    const end = get(config.theme.spacing, suffix.substring(4));
                    if (end)
                        declarations.push(new postcss_1.Declaration({ prop: "grid-row-end", value: end }));
                }
                else if (suffix === "auto") {
                    declarations.push(new postcss_1.Declaration({ prop: "grid-row", value: "auto" }));
                }
                break;
            case "gap":
                if (suffix.startsWith("x-")) {
                    const value = get(config.theme.spacing, suffix.substring(2));
                    if (value)
                        declarations.push(new postcss_1.Declaration({ prop: "column-gap", value }));
                }
                else if (suffix.startsWith("y-")) {
                    const value = get(config.theme.spacing, suffix.substring(2));
                    if (value)
                        declarations.push(new postcss_1.Declaration({ prop: "row-gap", value }));
                }
                else {
                    const value = get(config.theme.spacing, suffix);
                    if (value)
                        declarations.push(new postcss_1.Declaration({ prop: "gap", value }));
                }
                break;
            case "auto":
                if (suffix.startsWith("cols-")) {
                    declarations.push(new postcss_1.Declaration({
                        prop: "grid-auto-columns",
                        value: suffix.substring(5),
                    }));
                }
                else if (suffix.startsWith("rows-")) {
                    declarations.push(new postcss_1.Declaration({
                        prop: "grid-auto-rows",
                        value: suffix.substring(5),
                    }));
                }
                break;
            case "static":
                declarations.push(new postcss_1.Declaration({ prop: "position", value: "static" }));
                break;
            case "relative":
                declarations.push(new postcss_1.Declaration({ prop: "position", value: "relative" }));
                break;
            case "absolute":
                declarations.push(new postcss_1.Declaration({ prop: "position", value: "absolute" }));
                break;
            case "fixed":
                declarations.push(new postcss_1.Declaration({ prop: "position", value: "fixed" }));
                break;
            case "sticky":
                declarations.push(new postcss_1.Declaration({ prop: "position", value: "sticky" }));
                break;
            case "top":
            case "right":
            case "bottom":
            case "left":
                const positionValue = get(config.theme.spacing, suffix);
                if (positionValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: prefix, value: positionValue }));
                break;
            case "inset":
                if (suffix.startsWith("x-")) {
                    const value = get(config.theme.spacing, suffix.substring(2));
                    if (value !== undefined)
                        declarations.push(new postcss_1.Declaration({ prop: "left", value }), new postcss_1.Declaration({ prop: "right", value }));
                }
                else if (suffix.startsWith("y-")) {
                    const value = get(config.theme.spacing, suffix.substring(2));
                    if (value !== undefined)
                        declarations.push(new postcss_1.Declaration({ prop: "top", value }), new postcss_1.Declaration({ prop: "bottom", value }));
                }
                else {
                    const value = get(config.theme.spacing, suffix);
                    if (value !== undefined)
                        declarations.push(new postcss_1.Declaration({ prop: "top", value }), new postcss_1.Declaration({ prop: "right", value }), new postcss_1.Declaration({ prop: "bottom", value }), new postcss_1.Declaration({ prop: "left", value }));
                }
                break;
            case "overflow":
                if (suffix === "auto" ||
                    suffix === "hidden" ||
                    suffix === "visible" ||
                    suffix === "scroll" ||
                    suffix === "clip") {
                    declarations.push(new postcss_1.Declaration({ prop: "overflow", value: suffix }));
                }
                else if (suffix.startsWith("x-")) {
                    declarations.push(new postcss_1.Declaration({ prop: "overflow-x", value: suffix.substring(2) }));
                }
                else if (suffix.startsWith("y-")) {
                    declarations.push(new postcss_1.Declaration({ prop: "overflow-y", value: suffix.substring(2) }));
                }
                break;
            case "mix-blend":
                declarations.push(new postcss_1.Declaration({ prop: "mix-blend-mode", value: suffix }));
                break;
            case "background-blend":
                declarations.push(new postcss_1.Declaration({ prop: "background-blend-mode", value: suffix }));
                break;
            case "blur":
            case "brightness":
            case "contrast":
            case "drop-shadow":
            case "grayscale":
            case "hue-rotate":
            case "invert":
            case "saturate":
            case "sepia":
            case "backdrop-blur":
            case "backdrop-brightness":
            case "backdrop-contrast":
            case "backdrop-grayscale":
            case "backdrop-hue-rotate":
            case "backdrop-invert":
            case "backdrop-opacity":
            case "backdrop-saturate":
            case "backdrop-sepia":
                declarations.push(new postcss_1.Declaration({ prop: `--relax-filter`, value: `${className}` }));
                break;
            case "scale":
            case "rotate":
            case "translate":
            case "skew":
                declarations.push(new postcss_1.Declaration({ prop: `--relax-transform`, value: `${className}` }));
                break;
            case "origin":
                declarations.push(new postcss_1.Declaration({
                    prop: "transform-origin",
                    value: suffix.replace("-", " "),
                }));
                break;
            case "transition":
                const prop = get(config.theme.transitionProperty, suffix || "DEFAULT");
                if (prop !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "transition-property", value: prop }));
                break;
            case "duration":
                const duration = get(config.theme.transitionDuration, suffix);
                if (duration !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "transition-duration", value: duration }));
                break;
            case "ease":
                const timingFunction = get(config.theme.transitionTimingFunction, suffix || "DEFAULT");
                if (timingFunction !== undefined)
                    declarations.push(new postcss_1.Declaration({
                        prop: "transition-timing-function",
                        value: timingFunction,
                    }));
                break;
            case "delay":
                const delayValue = get(config.theme.transitionDuration, suffix); // Use duration scale for delays
                if (delayValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "transition-delay", value: delayValue }));
                break;
            case "pointer-events":
                declarations.push(new postcss_1.Declaration({ prop: "pointer-events", value: suffix }));
                break;
            case "cursor":
                declarations.push(new postcss_1.Declaration({ prop: "cursor", value: suffix }));
                break;
            case "resize":
                if (suffix === "")
                    declarations.push(new postcss_1.Declaration({ prop: "resize", value: "both" }));
                else if (suffix === "x")
                    declarations.push(new postcss_1.Declaration({ prop: "resize", value: "horizontal" }));
                else if (suffix === "y")
                    declarations.push(new postcss_1.Declaration({ prop: "resize", value: "vertical" }));
                else if (suffix === "none")
                    declarations.push(new postcss_1.Declaration({ prop: "resize", value: "none" }));
                break;
            case "select":
                declarations.push(new postcss_1.Declaration({
                    prop: "user-select",
                    value: suffix.replace("-", ""),
                }));
                break;
            case "sr":
                if (suffix === "only") {
                    declarations.push(new postcss_1.Declaration({ prop: "position", value: "absolute" }), new postcss_1.Declaration({ prop: "width", value: "1px" }), new postcss_1.Declaration({ prop: "height", value: "1px" }), new postcss_1.Declaration({ prop: "padding", value: "0" }), new postcss_1.Declaration({ prop: "margin", value: "-1px" }), new postcss_1.Declaration({ prop: "overflow", value: "hidden" }), new postcss_1.Declaration({ prop: "clip", value: "rect(0, 0, 0, 0)" }), new postcss_1.Declaration({ prop: "white-space", value: "nowrap" }), new postcss_1.Declaration({ prop: "border-width", value: "0" }));
                }
                break;
            case "not":
                if (suffix === "sr-only") {
                    declarations.push(new postcss_1.Declaration({ prop: "position", value: "static" }), new postcss_1.Declaration({ prop: "width", value: "auto" }), new postcss_1.Declaration({ prop: "height", value: "auto" }), new postcss_1.Declaration({ prop: "padding", value: "0" }), new postcss_1.Declaration({ prop: "margin", value: "0" }), new postcss_1.Declaration({ prop: "overflow", value: "visible" }), new postcss_1.Declaration({ prop: "clip", value: "auto" }), new postcss_1.Declaration({ prop: "white-space", value: "normal" }));
                }
                break;
            case "w": // width
                const widthValue = get(config.theme.spacing, suffix);
                if (widthValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "width", value: widthValue }));
                break;
            case "h": // height
                const heightValue = get(config.theme.spacing, suffix);
                if (heightValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "height", value: heightValue }));
                break;
            case "min-w":
                const minWidthValue = get(config.theme.spacing, suffix);
                if (minWidthValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "min-width", value: minWidthValue }));
                break;
            case "min-h":
                const minHeightValue = get(config.theme.spacing, suffix);
                if (minHeightValue !== undefined)
                    declarations.push(new postcss_1.Declaration({ prop: "min-height", value: minHeightValue }));
                break;
            case "flex-grow":
                if (suffix === "" || suffix === "0")
                    declarations.push(new postcss_1.Declaration({ prop: "flex-grow", value: "0" }));
                else
                    declarations.push(new postcss_1.Declaration({ prop: "flex-grow", value: "1" }));
                break;
            case "flex-shrink":
                if (suffix === "" || suffix === "0")
                    declarations.push(new postcss_1.Declaration({ prop: "flex-shrink", value: "0" }));
                else
                    declarations.push(new postcss_1.Declaration({ prop: "flex-shrink", value: "1" }));
                break;
            case "justify-items":
                declarations.push(new postcss_1.Declaration({ prop: "justify-items", value: suffix }));
                break;
            case "justify-self":
                declarations.push(new postcss_1.Declaration({ prop: "justify-self", value: suffix }));
                break;
            case "place-items":
                declarations.push(new postcss_1.Declaration({ prop: "place-items", value: suffix }));
                break;
            case "place-content":
                declarations.push(new postcss_1.Declaration({ prop: "place-content", value: suffix }));
                break;
            case "place-self":
                declarations.push(new postcss_1.Declaration({ prop: "place-self", value: suffix }));
                break;
            case "container": // Example of a pre-defined component/utility
                // This is a special case as it's a class not directly from theme
                // You might define this as a set of declarations
                declarations.push(new postcss_1.Declaration({ prop: "width", value: "100%" }), new postcss_1.Declaration({ prop: "margin-right", value: "auto" }), new postcss_1.Declaration({ prop: "margin-left", value: "auto" })
                // Responsive max-width would typically be handled by the user adding sm:max-w-xl etc.
                );
                break;
            case "block":
                declarations.push(new postcss_1.Declaration({ prop: "display", value: "block" }));
                break;
            case "inline":
                declarations.push(new postcss_1.Declaration({ prop: "display", value: "inline" }));
                break;
            case "inline-block":
                declarations.push(new postcss_1.Declaration({ prop: "display", value: "inline-block" }));
                break;
            case "hidden":
                declarations.push(new postcss_1.Declaration({ prop: "display", value: "none" }));
                break;
            case "flex":
                if (suffix === "")
                    declarations.push(new postcss_1.Declaration({ prop: "display", value: "flex" }));
                else if (suffix === "row")
                    declarations.push(new postcss_1.Declaration({ prop: "flex-direction", value: "row" }));
                else if (suffix === "col")
                    declarations.push(new postcss_1.Declaration({ prop: "flex-direction", value: "column" }));
                else if (suffix === "row-reverse")
                    declarations.push(new postcss_1.Declaration({ prop: "flex-direction", value: "row-reverse" }));
                else if (suffix === "col-reverse")
                    declarations.push(new postcss_1.Declaration({ prop: "flex-direction", value: "column-reverse" }));
                else if (suffix === "wrap")
                    declarations.push(new postcss_1.Declaration({ prop: "flex-wrap", value: "wrap" }));
                else if (suffix === "wrap-reverse")
                    declarations.push(new postcss_1.Declaration({ prop: "flex-wrap", value: "wrap-reverse" }));
                else if (suffix === "nowrap")
                    declarations.push(new postcss_1.Declaration({ prop: "flex-wrap", value: "nowrap" }));
                else if (suffix === "1")
                    declarations.push(new postcss_1.Declaration({ prop: "flex", value: "1 1 0%" }));
                else if (suffix === "auto")
                    declarations.push(new postcss_1.Declaration({ prop: "flex", value: "1 1 auto" }));
                else if (suffix === "initial")
                    declarations.push(new postcss_1.Declaration({ prop: "flex", value: "0 1 auto" }));
                else if (suffix === "none")
                    declarations.push(new postcss_1.Declaration({ prop: "flex", value: "none" }));
                break;
            case "items":
                if (suffix === "start")
                    declarations.push(new postcss_1.Declaration({ prop: "align-items", value: "flex-start" }));
                else if (suffix === "end")
                    declarations.push(new postcss_1.Declaration({ prop: "align-items", value: "flex-end" }));
                else if (suffix === "center")
                    declarations.push(new postcss_1.Declaration({ prop: "align-items", value: "center" }));
                else if (suffix === "baseline")
                    declarations.push(new postcss_1.Declaration({ prop: "align-items", value: "baseline" }));
                else if (suffix === "stretch")
                    declarations.push(new postcss_1.Declaration({ prop: "align-items", value: "stretch" }));
                break;
            case "justify":
                if (suffix === "start")
                    declarations.push(new postcss_1.Declaration({ prop: "justify-content", value: "flex-start" }));
                else if (suffix === "end")
                    declarations.push(new postcss_1.Declaration({ prop: "justify-content", value: "flex-end" }));
                else if (suffix === "center")
                    declarations.push(new postcss_1.Declaration({ prop: "justify-content", value: "center" }));
                else if (suffix === "between")
                    declarations.push(new postcss_1.Declaration({ prop: "justify-content", value: "space-between" }));
                else if (suffix === "around")
                    declarations.push(new postcss_1.Declaration({ prop: "justify-content", value: "space-around" }));
                else if (suffix === "evenly")
                    declarations.push(new postcss_1.Declaration({ prop: "justify-content", value: "space-evenly" }));
                break;
            case "align-self":
                declarations.push(new postcss_1.Declaration({ prop: "align-self", value: suffix }));
                break;
            case "box-border":
                declarations.push(new postcss_1.Declaration({ prop: "box-sizing", value: "border-box" }));
                break;
            case "box-content":
                declarations.push(new postcss_1.Declaration({ prop: "box-sizing", value: "content-box" }));
                break;
        }
    }
    // Fallback for direct color names as text/bg color if not caught above
    if (declarations.length === 0) {
        if (config.theme.colors[className]) {
            // e.g., 'red' for text-red
            const color = config.theme.colors[className];
            if (typeof color === "string") {
                declarations.push(new postcss_1.Declaration({ prop: "color", value: color }));
            }
        }
    }
    return declarations;
}
// --- 3. PostCSS Plugin Core ---
const plugin = (opts) => {
    const mergedConfig = (0, lodash_merge_1.default)(defaultConfig, opts);
    return {
        postcssPlugin: "relax-css",
        Once(root) {
            console.log("RelaxCSS plugin started.");
            // Remove all @import at-rules from the root
            root.walkAtRules("import", (atRule) => {
                atRule.remove();
            });
            // This map will store the generated declarations for *base* utility classes
            // E.g., 'px-4' -> [padding-left: 1rem, padding-right: 1rem]
            const generatedUtilityDeclarations = new Map();
            // Step 1: Pre-generate ALL possible base utility classes and store their declarations
            // This is crucial for @apply to find definitions.
            const allPossibleUtilityClasses = new Set();
            // Generate classes from theme values
            Object.keys(mergedConfig.theme).forEach((themeSectionKey) => {
                const themeSection = mergedConfig.theme[themeSectionKey];
                if (typeof themeSection === "object" && themeSection !== null) {
                    Object.keys(themeSection).forEach((key) => {
                        // General Spacing for p/m, w/h, min-w/h, max-w/h, etc.
                        if (themeSectionKey === "spacing") {
                            // p-*, m-*, px-*, py-*, etc.
                            allPossibleUtilityClasses.add(`p-${key}`);
                            allPossibleUtilityClasses.add(`m-${key}`);
                            allPossibleUtilityClasses.add(`px-${key}`);
                            allPossibleUtilityClasses.add(`py-${key}`);
                            allPossibleUtilityClasses.add(`pt-${key}`);
                            allPossibleUtilityClasses.add(`pr-${key}`);
                            allPossibleUtilityClasses.add(`pb-${key}`);
                            allPossibleUtilityClasses.add(`pl-${key}`);
                            allPossibleUtilityClasses.add(`mx-${key}`);
                            allPossibleUtilityClasses.add(`my-${key}`);
                            allPossibleUtilityClasses.add(`mt-${key}`);
                            allPossibleUtilityClasses.add(`mr-${key}`);
                            allPossibleUtilityClasses.add(`mb-${key}`);
                            allPossibleUtilityClasses.add(`ml-${key}`);
                            allPossibleUtilityClasses.add(`w-${key}`);
                            allPossibleUtilityClasses.add(`h-${key}`);
                            allPossibleUtilityClasses.add(`min-w-${key}`);
                            allPossibleUtilityClasses.add(`min-h-${key}`);
                            allPossibleUtilityClasses.add(`top-${key}`);
                            allPossibleUtilityClasses.add(`right-${key}`);
                            allPossibleUtilityClasses.add(`bottom-${key}`);
                            allPossibleUtilityClasses.add(`left-${key}`);
                            allPossibleUtilityClasses.add(`inset-${key}`);
                            allPossibleUtilityClasses.add(`inset-x-${key}`);
                            allPossibleUtilityClasses.add(`inset-y-${key}`);
                            // Add 'auto' for margin
                            if (key === "auto") {
                                allPossibleUtilityClasses.add(`m-auto`);
                                allPossibleUtilityClasses.add(`mx-auto`);
                                allPossibleUtilityClasses.add(`my-auto`);
                            }
                        }
                        // Max-width/Height (uses its own scales)
                        else if (themeSectionKey === "maxWidth") {
                            allPossibleUtilityClasses.add(`max-w-${key}`);
                        }
                        else if (themeSectionKey === "maxHeight") {
                            allPossibleUtilityClasses.add(`max-h-${key}`);
                        }
                        // Colors (bg-color, text-color, border-color, ring-offset-color)
                        else if (themeSectionKey === "colors") {
                            if (typeof themeSection[key] === "object" &&
                                themeSection[key] !== null) {
                                Object.keys(themeSection[key]).forEach((shade) => {
                                    allPossibleUtilityClasses.add(`bg-${key}-${shade}`);
                                    allPossibleUtilityClasses.add(`text-${key}-${shade}`);
                                    allPossibleUtilityClasses.add(`border-${key}-${shade}`);
                                    allPossibleUtilityClasses.add(`ring-offset-${key}-${shade}`);
                                });
                            }
                            else {
                                allPossibleUtilityClasses.add(`bg-${key}`);
                                allPossibleUtilityClasses.add(`text-${key}`);
                                allPossibleUtilityClasses.add(`border-${key}`);
                            }
                        }
                        // Font sizes
                        else if (themeSectionKey === "fontSize") {
                            allPossibleUtilityClasses.add(`text-${key}`);
                        }
                        // Other single-property mappings
                        else if (themeSectionKey === "fontWeight")
                            allPossibleUtilityClasses.add(`font-${key}`);
                        else if (themeSectionKey === "lineHeight")
                            allPossibleUtilityClasses.add(`leading-${key}`);
                        else if (themeSectionKey === "boxShadow")
                            allPossibleUtilityClasses.add(`shadow-${key}`);
                        else if (themeSectionKey === "zIndex")
                            allPossibleUtilityClasses.add(`z-${key}`);
                        else if (themeSectionKey === "opacity")
                            allPossibleUtilityClasses.add(`opacity-${key}`);
                        else if (themeSectionKey === "borderRadius")
                            allPossibleUtilityClasses.add(`rounded-${key}`);
                        else if (themeSectionKey === "borderWidth")
                            allPossibleUtilityClasses.add(`border-${key}`);
                        // Default border-width is handled in generateUtilityCss
                        else if (themeSectionKey === "gridTemplateColumns")
                            allPossibleUtilityClasses.add(`grid-cols-${key}`);
                        else if (themeSectionKey === "gridTemplateRows")
                            allPossibleUtilityClasses.add(`grid-rows-${key}`);
                        else if (themeSectionKey === "flex")
                            allPossibleUtilityClasses.add(`flex-${key}`);
                        else if (themeSectionKey === "transitionProperty")
                            allPossibleUtilityClasses.add(`transition-${key}`);
                        else if (themeSectionKey === "transitionDuration")
                            allPossibleUtilityClasses.add(`duration-${key}`);
                        else if (themeSectionKey === "transitionTimingFunction")
                            allPossibleUtilityClasses.add(`ease-${key}`);
                    });
                }
            });
            // Add hardcoded utilities
            allPossibleUtilityClasses.add("block");
            allPossibleUtilityClasses.add("inline");
            allPossibleUtilityClasses.add("inline-block");
            allPossibleUtilityClasses.add("hidden");
            allPossibleUtilityClasses.add("flex"); // display: flex
            allPossibleUtilityClasses.add("grid"); // display: grid
            allPossibleUtilityClasses.add("static");
            allPossibleUtilityClasses.add("relative");
            allPossibleUtilityClasses.add("absolute");
            allPossibleUtilityClasses.add("fixed");
            allPossibleUtilityClasses.add("sticky");
            allPossibleUtilityClasses.add("border"); // default border
            allPossibleUtilityClasses.add("sr-only");
            allPossibleUtilityClasses.add("not-sr-only");
            allPossibleUtilityClasses.add("justify-start");
            allPossibleUtilityClasses.add("justify-end");
            allPossibleUtilityClasses.add("justify-center");
            allPossibleUtilityClasses.add("justify-between");
            allPossibleUtilityClasses.add("justify-around");
            allPossibleUtilityClasses.add("justify-evenly");
            allPossibleUtilityClasses.add("items-start");
            allPossibleUtilityClasses.add("items-end");
            allPossibleUtilityClasses.add("items-center");
            allPossibleUtilityClasses.add("items-baseline");
            allPossibleUtilityClasses.add("items-stretch");
            allPossibleUtilityClasses.add("flex-row");
            allPossibleUtilityClasses.add("flex-col");
            allPossibleUtilityClasses.add("flex-row-reverse");
            allPossibleUtilityClasses.add("flex-col-reverse");
            allPossibleUtilityClasses.add("flex-wrap");
            allPossibleUtilityClasses.add("flex-wrap-reverse");
            allPossibleUtilityClasses.add("flex-nowrap");
            allPossibleUtilityClasses.add("overflow-auto");
            allPossibleUtilityClasses.add("overflow-hidden");
            allPossibleUtilityClasses.add("overflow-visible");
            allPossibleUtilityClasses.add("overflow-scroll");
            allPossibleUtilityClasses.add("overflow-clip");
            allPossibleUtilityClasses.add("overflow-x-auto");
            allPossibleUtilityClasses.add("overflow-x-hidden");
            allPossibleUtilityClasses.add("overflow-x-visible");
            allPossibleUtilityClasses.add("overflow-x-scroll");
            allPossibleUtilityClasses.add("overflow-x-clip");
            allPossibleUtilityClasses.add("overflow-y-auto");
            allPossibleUtilityClasses.add("overflow-y-hidden");
            allPossibleUtilityClasses.add("overflow-y-visible");
            allPossibleUtilityClasses.add("overflow-y-scroll");
            allPossibleUtilityClasses.add("overflow-y-clip");
            // Add more as needed based on your `generateUtilityCss` switch cases
            // Generate declarations for all base utilities and store them
            allPossibleUtilityClasses.forEach((className) => {
                const declarations = generateUtilityCss(className, mergedConfig);
                if (declarations.length > 0) {
                    generatedUtilityDeclarations.set(className, declarations);
                }
            });
            const atApplyQueue = [];
            const mediaQueries = new Map();
            // Step 2: Traverse rules and @apply directives
            root.walkRules((rule) => {
                rule.walkAtRules((atRule) => {
                    if (atRule.name === "apply") {
                        const appliedClasses = atRule.params.split(/\s+/).filter(Boolean);
                        atApplyQueue.push({ rule: rule, classes: appliedClasses });
                        atRule.remove(); // Remove @apply immediately
                    }
                });
            });
            root.walkAtRules((atRule) => {
                if (atRule.name === "relax") {
                    // add comment to the root node
                    root.prepend(new (require("postcss").Comment)({
                        text: "RelaxCSS processed with @relax directive",
                    }));
                    atRule.remove(); // Remove the @relax directive
                }
            });
            // Step 3: Process @apply directives
            atApplyQueue.forEach(({ rule: parentRule, classes: appliedClasses }) => {
                appliedClasses.forEach((cls) => {
                    var _a, _b;
                    // Extract base class name for lookup in generatedUtilityDeclarations
                    let baseClassToApply = cls;
                    let mediaQueryVariant; // e.g., 'sm', 'md'
                    let pseudoClassVariants = []; // e.g., 'hover', 'focus'
                    const parts = cls.split(":");
                    if (parts.length > 1) {
                        // Check for responsive variant (must be first)
                        if (mergedConfig.variants.responsive.includes(parts[0])) {
                            mediaQueryVariant = parts[0];
                            baseClassToApply = parts.slice(1).join(":");
                        }
                        // Check for pseudo-class variants (from the potentially remaining parts)
                        const remainingParts = baseClassToApply.split(":");
                        pseudoClassVariants = remainingParts.filter((part) => mergedConfig.variants.pseudoClasses.includes(part));
                        baseClassToApply = remainingParts
                            .filter((part) => !mergedConfig.variants.pseudoClasses.includes(part))
                            .join(":");
                    }
                    // Now, baseClassToApply should be something like 'px-4', 'max-w-7xl', 'bg-blue-500'
                    const declarationsToApply = generatedUtilityDeclarations.get(baseClassToApply);
                    if (declarationsToApply && declarationsToApply.length > 0) {
                        let targetRule = parentRule;
                        let currentSelector = parentRule.selector;
                        // Apply pseudo-classes to the selector if present
                        if (pseudoClassVariants.length > 0) {
                            // Create a new rule with the combined selector for pseudo-classes
                            let combinedPseudoSelector = currentSelector;
                            pseudoClassVariants.forEach((pseudo) => {
                                if (pseudo === "group-hover") {
                                    combinedPseudoSelector = `:merge(.group):hover ${combinedPseudoSelector}`;
                                }
                                else {
                                    combinedPseudoSelector += `:${pseudo}`;
                                }
                            });
                            // --- Support stacking of responsive and pseudo variants ---
                            // If we have a mediaQueryVariant, wrap the pseudo rule in the media query
                            if (mediaQueryVariant) {
                                const mqParam = `(min-width: ${mergedConfig.theme.screens[mediaQueryVariant]})`;
                                let mqAtRule = mediaQueries.get(mqParam);
                                if (!mqAtRule) {
                                    mqAtRule = new (require("postcss").AtRule)({
                                        name: "media",
                                        params: mqParam,
                                    });
                                    mediaQueries.set(mqParam, mqAtRule);
                                    root.append(mqAtRule);
                                }
                                // Create a new rule with the modified selector inside the media query
                                targetRule = new postcss_1.Rule({
                                    selector: combinedPseudoSelector,
                                });
                                declarationsToApply.forEach((d) => targetRule.append(d.clone()));
                                mqAtRule.append(targetRule);
                            }
                            else {
                                // No media query, just append the pseudo rule to the parent
                                targetRule = new postcss_1.Rule({
                                    selector: combinedPseudoSelector,
                                });
                                declarationsToApply.forEach((d) => targetRule.append(d.clone()));
                                (_a = parentRule.parent) === null || _a === void 0 ? void 0 : _a.append(targetRule);
                            }
                            // If we have pseudo-classes, we don't need to apply them again
                            return;
                            // Create a new rule with the modified selector
                            targetRule = new postcss_1.Rule({
                                selector: combinedPseudoSelector,
                            });
                            // Append the new rule to the parent rule
                            (_b = parentRule.parent) === null || _b === void 0 ? void 0 : _b.append(targetRule);
                            declarationsToApply.forEach((d) => targetRule.append(d.clone()));
                            // If we have pseudo-classes, we don't need to apply them again
                            return;
                        }
                        // Handle responsive variants by creating a new rule inside a media query
                        if (mediaQueryVariant) {
                            const mqParam = `(min-width: ${mergedConfig.theme.screens[mediaQueryVariant]})`;
                            let mqAtRule = mediaQueries.get(mqParam);
                            if (!mqAtRule) {
                                mqAtRule = new (require("postcss").AtRule)({
                                    name: "media",
                                    params: mqParam,
                                });
                                mediaQueries.set(mqParam, mqAtRule);
                                root.append(mqAtRule); // Append media query to root once
                            }
                            // Create a new rule inside the media query, with the parent's selector
                            const newResponsiveRule = new postcss_1.Rule({
                                selector: parentRule.selector,
                            });
                            declarationsToApply.forEach((d) => newResponsiveRule.append(d.clone()));
                            mqAtRule.append(newResponsiveRule);
                        }
                        else {
                            // No media query, append declarations directly to the parent rule
                            declarationsToApply.forEach((d) => parentRule.append(d.clone()));
                        }
                    }
                    else {
                        console.warn(`RelaxCSS: Could not find utility for @apply '${cls}'. Base class sought: '${baseClassToApply}'.`);
                    }
                });
            });
            // Aggregate Transform and Filter properties
            root.walkRules((rule) => {
                let transformDeclarations = [];
                let filterDeclarations = [];
                let backdropFilterDeclarations = [];
                rule.walkDecls((decl) => {
                    if (decl.prop === "--relax-transform") {
                        transformDeclarations.push(decl);
                        decl.remove();
                    }
                    else if (decl.prop === "--relax-filter") {
                        filterDeclarations.push(decl);
                        decl.remove();
                    }
                    else if (decl.prop === "--relax-backdrop-filter") {
                        backdropFilterDeclarations.push(decl);
                        decl.remove();
                    }
                });
                if (transformDeclarations.length > 0) {
                    const transformComponents = [];
                    transformDeclarations.forEach((decl) => {
                        const className = decl.value;
                        const parts = className.split("-");
                        const prefix = parts[0];
                        const suffix = parts.slice(1).join("-");
                        if (prefix === "scale-x") {
                            const value = get(mergedConfig.theme.opacity, suffix); // using opacity scale for 0-100 values
                            if (value !== undefined)
                                transformComponents.push(`scaleX(${value})`);
                        }
                        else if (prefix === "scale-y") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                transformComponents.push(`scaleY(${value})`);
                        }
                        else if (prefix === "scale") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                transformComponents.push(`scale(${value})`);
                        }
                        else if (prefix === "rotate") {
                            const value = get(mergedConfig.theme.spacing, suffix); // assuming spacing has angle values like '45' for 45deg
                            if (value !== undefined)
                                transformComponents.push(`rotate(${value}deg)`);
                        }
                        else if (prefix === "translate-x") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                transformComponents.push(`translateX(${value})`);
                        }
                        else if (prefix === "translate-y") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                transformComponents.push(`translateY(${value})`);
                        }
                        else if (prefix === "skew-x") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                transformComponents.push(`skewX(${value}deg)`);
                        }
                        else if (prefix === "skew-y") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                transformComponents.push(`skewY(${value}deg)`);
                        }
                    });
                    if (transformComponents.length > 0) {
                        rule.append(new postcss_1.Declaration({
                            prop: "transform",
                            value: transformComponents.join(" "),
                        }));
                    }
                }
                if (filterDeclarations.length > 0) {
                    const filterComponents = [];
                    filterDeclarations.forEach((decl) => {
                        const className = decl.value;
                        const parts = className.split("-");
                        const prefix = parts[0];
                        const suffix = parts.slice(1).join("-");
                        if (prefix === "blur") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                filterComponents.push(`blur(${value})`);
                        }
                        else if (prefix === "brightness") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                filterComponents.push(`brightness(${value})`);
                        }
                        else if (prefix === "contrast") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                filterComponents.push(`contrast(${value})`);
                        }
                        else if (prefix === "drop-shadow") {
                            const value = get(mergedConfig.theme.boxShadow, suffix);
                            if (value !== undefined)
                                filterComponents.push(`drop-shadow(${value})`);
                        }
                        else if (prefix === "grayscale") {
                            filterComponents.push(`grayscale(1)`);
                        }
                        else if (prefix === "hue-rotate") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                filterComponents.push(`hue-rotate(${value}deg)`);
                        }
                        else if (prefix === "invert") {
                            filterComponents.push(`invert(1)`);
                        }
                        else if (prefix === "saturate") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                filterComponents.push(`saturate(${value})`);
                        }
                        else if (prefix === "sepia") {
                            filterComponents.push(`sepia(1)`);
                        }
                    });
                    if (filterComponents.length > 0) {
                        rule.append(new postcss_1.Declaration({
                            prop: "filter",
                            value: filterComponents.join(" "),
                        }));
                    }
                }
                if (backdropFilterDeclarations.length > 0) {
                    const backdropFilterComponents = [];
                    backdropFilterDeclarations.forEach((decl) => {
                        const className = decl.value;
                        const parts = className.split("-");
                        const prefix = parts[0];
                        const suffix = parts.slice(1).join("-");
                        if (prefix === "backdrop-blur") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                backdropFilterComponents.push(`blur(${value})`);
                        }
                        // Add other backdrop filters here
                    });
                    if (backdropFilterComponents.length > 0) {
                        rule.append(new postcss_1.Declaration({
                            prop: "backdrop-filter",
                            value: backdropFilterComponents.join(" "),
                        }));
                    }
                }
            });
            console.log("RelaxCSS plugin finished processing.");
        },
    };
};
plugin.postcss = true;
// Support for custom input like bg-[#222], p-[4px], etc.
function parseArbitraryValue(className, config) {
    // e.g. bg-[#222], p-[4px], text-[red], w-[100px], m-[1rem], etc.
    const arbitraryMatch = className.match(/^([a-z-]+)-\[(.+)\]$/i);
    if (!arbitraryMatch)
        return [];
    const prefix = arbitraryMatch[1];
    const value = arbitraryMatch[2];
    // Map prefix to CSS property
    switch (prefix) {
        case "bg":
            return [new postcss_1.Declaration({ prop: "background-color", value })];
        case "text":
            return [new postcss_1.Declaration({ prop: "color", value })];
        case "border":
            return [new postcss_1.Declaration({ prop: "border-color", value })];
        case "w":
            return [new postcss_1.Declaration({ prop: "width", value })];
        case "h":
            return [new postcss_1.Declaration({ prop: "height", value })];
        case "min-w":
            return [new postcss_1.Declaration({ prop: "min-width", value })];
        case "min-h":
            return [new postcss_1.Declaration({ prop: "min-height", value })];
        case "max-w":
            return [new postcss_1.Declaration({ prop: "max-width", value })];
        case "max-h":
            return [new postcss_1.Declaration({ prop: "max-height", value })];
        case "p":
            return [new postcss_1.Declaration({ prop: "padding", value })];
        case "px":
            return [
                new postcss_1.Declaration({ prop: "padding-left", value }),
                new postcss_1.Declaration({ prop: "padding-right", value }),
            ];
        case "py":
            return [
                new postcss_1.Declaration({ prop: "padding-top", value }),
                new postcss_1.Declaration({ prop: "padding-bottom", value }),
            ];
        case "pt":
            return [new postcss_1.Declaration({ prop: "padding-top", value })];
        case "pr":
            return [new postcss_1.Declaration({ prop: "padding-right", value })];
        case "pb":
            return [new postcss_1.Declaration({ prop: "padding-bottom", value })];
        case "pl":
            return [new postcss_1.Declaration({ prop: "padding-left", value })];
        case "m":
            return [new postcss_1.Declaration({ prop: "margin", value })];
        case "mx":
            return [
                new postcss_1.Declaration({ prop: "margin-left", value }),
                new postcss_1.Declaration({ prop: "margin-right", value }),
            ];
        case "my":
            return [
                new postcss_1.Declaration({ prop: "margin-top", value }),
                new postcss_1.Declaration({ prop: "margin-bottom", value }),
            ];
        case "mt":
            return [new postcss_1.Declaration({ prop: "margin-top", value })];
        case "mr":
            return [new postcss_1.Declaration({ prop: "margin-right", value })];
        case "mb":
            return [new postcss_1.Declaration({ prop: "margin-bottom", value })];
        case "ml":
            return [new postcss_1.Declaration({ prop: "margin-left", value })];
        case "rounded":
            return [new postcss_1.Declaration({ prop: "border-radius", value })];
        case "shadow":
            return [new postcss_1.Declaration({ prop: "box-shadow", value })];
        case "z":
            return [new postcss_1.Declaration({ prop: "z-index", value })];
        case "opacity":
            return [new postcss_1.Declaration({ prop: "opacity", value })];
        case "top":
        case "right":
        case "bottom":
        case "left":
            return [new postcss_1.Declaration({ prop: prefix, value })];
        default:
            // fallback: try to use as property directly (dangerous, but useful for advanced users)
            return [new postcss_1.Declaration({ prop: prefix, value })];
    }
}
// Patch generateUtilityCss to support arbitrary values
const originalGenerateUtilityCss = generateUtilityCss;
function generateUtilityCssWithArbitrary(className, config) {
    // Try arbitrary value first
    const arbitrary = parseArbitraryValue(className, config);
    if (arbitrary.length > 0)
        return arbitrary;
    // Fallback to original
    return originalGenerateUtilityCss(className, config);
}
// Patch plugin to use the new generateUtilityCssWithArbitrary
const patchedPlugin = (opts) => {
    const mergedConfig = (0, lodash_merge_1.default)(defaultConfig, opts);
    // Patch all usages of generateUtilityCss in the plugin
    // (copy-paste the plugin code, replacing generateUtilityCss with generateUtilityCssWithArbitrary)
    // --- BEGIN PATCHED PLUGIN BODY ---
    return {
        postcssPlugin: "relax-css",
        Once(root) {
            console.log("RelaxCSS plugin started.");
            // Remove all @import at-rules from the root
            root.walkAtRules("import", (atRule) => {
                atRule.remove();
            });
            const generatedUtilityDeclarations = new Map();
            const allPossibleUtilityClasses = new Set();
            Object.keys(mergedConfig.theme).forEach((themeSectionKey) => {
                const themeSection = mergedConfig.theme[themeSectionKey];
                if (typeof themeSection === "object" && themeSection !== null) {
                    Object.keys(themeSection).forEach((key) => {
                        if (themeSectionKey === "spacing") {
                            allPossibleUtilityClasses.add(`p-${key}`);
                            allPossibleUtilityClasses.add(`m-${key}`);
                            allPossibleUtilityClasses.add(`px-${key}`);
                            allPossibleUtilityClasses.add(`py-${key}`);
                            allPossibleUtilityClasses.add(`pt-${key}`);
                            allPossibleUtilityClasses.add(`pr-${key}`);
                            allPossibleUtilityClasses.add(`pb-${key}`);
                            allPossibleUtilityClasses.add(`pl-${key}`);
                            allPossibleUtilityClasses.add(`mx-${key}`);
                            allPossibleUtilityClasses.add(`my-${key}`);
                            allPossibleUtilityClasses.add(`mt-${key}`);
                            allPossibleUtilityClasses.add(`mr-${key}`);
                            allPossibleUtilityClasses.add(`mb-${key}`);
                            allPossibleUtilityClasses.add(`ml-${key}`);
                            allPossibleUtilityClasses.add(`w-${key}`);
                            allPossibleUtilityClasses.add(`h-${key}`);
                            allPossibleUtilityClasses.add(`min-w-${key}`);
                            allPossibleUtilityClasses.add(`min-h-${key}`);
                            allPossibleUtilityClasses.add(`top-${key}`);
                            allPossibleUtilityClasses.add(`right-${key}`);
                            allPossibleUtilityClasses.add(`bottom-${key}`);
                            allPossibleUtilityClasses.add(`left-${key}`);
                            allPossibleUtilityClasses.add(`inset-${key}`);
                            allPossibleUtilityClasses.add(`inset-x-${key}`);
                            allPossibleUtilityClasses.add(`inset-y-${key}`);
                            // Add 'auto' for margin
                            if (key === "auto") {
                                allPossibleUtilityClasses.add(`m-auto`);
                                allPossibleUtilityClasses.add(`mx-auto`);
                                allPossibleUtilityClasses.add(`my-auto`);
                            }
                        }
                        // Max-width/Height (uses its own scales)
                        else if (themeSectionKey === "maxWidth") {
                            allPossibleUtilityClasses.add(`max-w-${key}`);
                        }
                        else if (themeSectionKey === "maxHeight") {
                            allPossibleUtilityClasses.add(`max-h-${key}`);
                        }
                        else if (themeSectionKey === "colors") {
                            if (typeof themeSection[key] === "object" &&
                                themeSection[key] !== null) {
                                Object.keys(themeSection[key]).forEach((shade) => {
                                    allPossibleUtilityClasses.add(`bg-${key}-${shade}`);
                                    allPossibleUtilityClasses.add(`text-${key}-${shade}`);
                                    allPossibleUtilityClasses.add(`border-${key}-${shade}`);
                                    allPossibleUtilityClasses.add(`ring-offset-${key}-${shade}`);
                                });
                            }
                            else {
                                allPossibleUtilityClasses.add(`bg-${key}`);
                                allPossibleUtilityClasses.add(`text-${key}`);
                                allPossibleUtilityClasses.add(`border-${key}`);
                            }
                        }
                        else if (themeSectionKey === "fontSize") {
                            allPossibleUtilityClasses.add(`text-${key}`);
                        }
                        else if (themeSectionKey === "fontWeight")
                            allPossibleUtilityClasses.add(`font-${key}`);
                        else if (themeSectionKey === "lineHeight")
                            allPossibleUtilityClasses.add(`leading-${key}`);
                        else if (themeSectionKey === "boxShadow")
                            allPossibleUtilityClasses.add(`shadow-${key}`);
                        else if (themeSectionKey === "zIndex")
                            allPossibleUtilityClasses.add(`z-${key}`);
                        else if (themeSectionKey === "opacity")
                            allPossibleUtilityClasses.add(`opacity-${key}`);
                        else if (themeSectionKey === "borderRadius")
                            allPossibleUtilityClasses.add(`rounded-${key}`);
                        else if (themeSectionKey === "borderWidth")
                            allPossibleUtilityClasses.add(`border-${key}`);
                        // Default border-width is handled in generateUtilityCss
                        else if (themeSectionKey === "gridTemplateColumns")
                            allPossibleUtilityClasses.add(`grid-cols-${key}`);
                        else if (themeSectionKey === "gridTemplateRows")
                            allPossibleUtilityClasses.add(`grid-rows-${key}`);
                        else if (themeSectionKey === "flex")
                            allPossibleUtilityClasses.add(`flex-${key}`);
                        else if (themeSectionKey === "transitionProperty")
                            allPossibleUtilityClasses.add(`transition-${key}`);
                        else if (themeSectionKey === "transitionDuration")
                            allPossibleUtilityClasses.add(`duration-${key}`);
                        else if (themeSectionKey === "transitionTimingFunction")
                            allPossibleUtilityClasses.add(`ease-${key}`);
                    });
                }
            });
            // Add hardcoded utilities
            allPossibleUtilityClasses.add("block");
            allPossibleUtilityClasses.add("inline");
            allPossibleUtilityClasses.add("inline-block");
            allPossibleUtilityClasses.add("hidden");
            allPossibleUtilityClasses.add("flex"); // display: flex
            allPossibleUtilityClasses.add("grid"); // display: grid
            allPossibleUtilityClasses.add("static");
            allPossibleUtilityClasses.add("relative");
            allPossibleUtilityClasses.add("absolute");
            allPossibleUtilityClasses.add("fixed");
            allPossibleUtilityClasses.add("sticky");
            allPossibleUtilityClasses.add("border"); // default border
            allPossibleUtilityClasses.add("sr-only");
            allPossibleUtilityClasses.add("not-sr-only");
            allPossibleUtilityClasses.add("justify-start");
            allPossibleUtilityClasses.add("justify-end");
            allPossibleUtilityClasses.add("justify-center");
            allPossibleUtilityClasses.add("justify-between");
            allPossibleUtilityClasses.add("justify-around");
            allPossibleUtilityClasses.add("justify-evenly");
            allPossibleUtilityClasses.add("items-start");
            allPossibleUtilityClasses.add("items-end");
            allPossibleUtilityClasses.add("items-center");
            allPossibleUtilityClasses.add("items-baseline");
            allPossibleUtilityClasses.add("items-stretch");
            allPossibleUtilityClasses.add("flex-row");
            allPossibleUtilityClasses.add("flex-col");
            allPossibleUtilityClasses.add("flex-row-reverse");
            allPossibleUtilityClasses.add("flex-col-reverse");
            allPossibleUtilityClasses.add("flex-wrap");
            allPossibleUtilityClasses.add("flex-wrap-reverse");
            allPossibleUtilityClasses.add("flex-nowrap");
            allPossibleUtilityClasses.add("overflow-auto");
            allPossibleUtilityClasses.add("overflow-hidden");
            allPossibleUtilityClasses.add("overflow-visible");
            allPossibleUtilityClasses.add("overflow-scroll");
            allPossibleUtilityClasses.add("overflow-clip");
            allPossibleUtilityClasses.add("overflow-x-auto");
            allPossibleUtilityClasses.add("overflow-x-hidden");
            allPossibleUtilityClasses.add("overflow-x-visible");
            allPossibleUtilityClasses.add("overflow-x-scroll");
            allPossibleUtilityClasses.add("overflow-x-clip");
            allPossibleUtilityClasses.add("overflow-y-auto");
            allPossibleUtilityClasses.add("overflow-y-hidden");
            allPossibleUtilityClasses.add("overflow-y-visible");
            allPossibleUtilityClasses.add("overflow-y-scroll");
            allPossibleUtilityClasses.add("overflow-y-clip");
            // Add more as needed based on your `generateUtilityCss` switch cases
            // Generate declarations for all base utilities and store them
            allPossibleUtilityClasses.forEach((className) => {
                const declarations = generateUtilityCssWithArbitrary(className, mergedConfig);
                if (declarations.length > 0) {
                    generatedUtilityDeclarations.set(className, declarations);
                }
            });
            const atApplyQueue = [];
            const mediaQueries = new Map();
            root.walkRules((rule) => {
                rule.walkAtRules((atRule) => {
                    if (atRule.name === "apply") {
                        const appliedClasses = atRule.params.split(/\s+/).filter(Boolean);
                        atApplyQueue.push({ rule: rule, classes: appliedClasses });
                        atRule.remove();
                    }
                });
            });
            root.walkAtRules((atRule) => {
                if (atRule.name === "relax") {
                    root.prepend(new (require("postcss").Comment)({
                        text: "RelaxCSS processed with @relax directive",
                    }));
                    atRule.remove();
                }
            });
            atApplyQueue.forEach(({ rule: parentRule, classes: appliedClasses }) => {
                appliedClasses.forEach((cls) => {
                    var _a, _b;
                    let baseClassToApply = cls;
                    let mediaQueryVariant;
                    let pseudoClassVariants = [];
                    const parts = cls.split(":");
                    if (parts.length > 1) {
                        if (mergedConfig.variants.responsive.includes(parts[0])) {
                            mediaQueryVariant = parts[0];
                            baseClassToApply = parts.slice(1).join(":");
                        }
                        const remainingParts = baseClassToApply.split(":");
                        pseudoClassVariants = remainingParts.filter((part) => mergedConfig.variants.pseudoClasses.includes(part));
                        baseClassToApply = remainingParts
                            .filter((part) => !mergedConfig.variants.pseudoClasses.includes(part))
                            .join(":");
                    }
                    // Support arbitrary values in @apply
                    let declarationsToApply = generatedUtilityDeclarations.get(baseClassToApply);
                    // If not found, try arbitrary value
                    if (!declarationsToApply || declarationsToApply.length === 0) {
                        declarationsToApply = parseArbitraryValue(baseClassToApply, mergedConfig);
                    }
                    if (declarationsToApply && declarationsToApply.length > 0) {
                        let targetRule = parentRule;
                        let currentSelector = parentRule.selector;
                        // Apply pseudo-classes to the selector if present
                        if (pseudoClassVariants.length > 0) {
                            // Create a new rule with the combined selector for pseudo-classes
                            let combinedPseudoSelector = currentSelector;
                            pseudoClassVariants.forEach((pseudo) => {
                                if (pseudo === "group-hover") {
                                    combinedPseudoSelector = `:merge(.group):hover ${combinedPseudoSelector}`;
                                }
                                else {
                                    combinedPseudoSelector += `:${pseudo}`;
                                }
                            });
                            // --- Support stacking of responsive and pseudo variants ---
                            // If we have a mediaQueryVariant, wrap the pseudo rule in the media query
                            if (mediaQueryVariant) {
                                const mqParam = `(min-width: ${mergedConfig.theme.screens[mediaQueryVariant]})`;
                                let mqAtRule = mediaQueries.get(mqParam);
                                if (!mqAtRule) {
                                    mqAtRule = new (require("postcss").AtRule)({
                                        name: "media",
                                        params: mqParam,
                                    });
                                    mediaQueries.set(mqParam, mqAtRule);
                                    root.append(mqAtRule);
                                }
                                // Create a new rule with the modified selector inside the media query
                                targetRule = new postcss_1.Rule({
                                    selector: combinedPseudoSelector,
                                });
                                declarationsToApply.forEach((d) => targetRule.append(d.clone()));
                                mqAtRule.append(targetRule);
                            }
                            else {
                                // No media query, just append the pseudo rule to the parent
                                targetRule = new postcss_1.Rule({
                                    selector: combinedPseudoSelector,
                                });
                                declarationsToApply.forEach((d) => targetRule.append(d.clone()));
                                (_a = parentRule.parent) === null || _a === void 0 ? void 0 : _a.append(targetRule);
                            }
                            // If we have pseudo-classes, we don't need to apply them again
                            return;
                            // Create a new rule with the modified selector
                            targetRule = new postcss_1.Rule({
                                selector: combinedPseudoSelector,
                            });
                            // Append the new rule to the parent rule
                            (_b = parentRule.parent) === null || _b === void 0 ? void 0 : _b.append(targetRule);
                            declarationsToApply.forEach((d) => targetRule.append(d.clone()));
                            // If we have pseudo-classes, we don't need to apply them again
                            return;
                        }
                        // Handle responsive variants by creating a new rule inside a media query
                        if (mediaQueryVariant) {
                            const mqParam = `(min-width: ${mergedConfig.theme.screens[mediaQueryVariant]})`;
                            let mqAtRule = mediaQueries.get(mqParam);
                            if (!mqAtRule) {
                                mqAtRule = new (require("postcss").AtRule)({
                                    name: "media",
                                    params: mqParam,
                                });
                                mediaQueries.set(mqParam, mqAtRule);
                                root.append(mqAtRule); // Append media query to root once
                            }
                            // Create a new rule inside the media query, with the parent's selector
                            const newResponsiveRule = new postcss_1.Rule({
                                selector: parentRule.selector,
                            });
                            declarationsToApply.forEach((d) => newResponsiveRule.append(d.clone()));
                            mqAtRule.append(newResponsiveRule);
                        }
                        else {
                            // No media query, append declarations directly to the parent rule
                            declarationsToApply.forEach((d) => parentRule.append(d.clone()));
                        }
                    }
                    else {
                        console.warn(`RelaxCSS: Could not find utility for @apply '${cls}'. Base class sought: '${baseClassToApply}'.`);
                    }
                });
            });
            // The rest of the plugin body is unchanged (aggregation, etc.)
            root.walkRules((rule) => {
                let transformDeclarations = [];
                let filterDeclarations = [];
                let backdropFilterDeclarations = [];
                rule.walkDecls((decl) => {
                    if (decl.prop === "--relax-transform") {
                        transformDeclarations.push(decl);
                        decl.remove();
                    }
                    else if (decl.prop === "--relax-filter") {
                        filterDeclarations.push(decl);
                        decl.remove();
                    }
                    else if (decl.prop === "--relax-backdrop-filter") {
                        backdropFilterDeclarations.push(decl);
                        decl.remove();
                    }
                });
                if (transformDeclarations.length > 0) {
                    const transformComponents = [];
                    transformDeclarations.forEach((decl) => {
                        const className = decl.value;
                        const parts = className.split("-");
                        const prefix = parts[0];
                        const suffix = parts.slice(1).join("-");
                        if (prefix === "scale-x") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                transformComponents.push(`scaleX(${value})`);
                        }
                        else if (prefix === "scale-y") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                transformComponents.push(`scaleY(${value})`);
                        }
                        else if (prefix === "scale") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                transformComponents.push(`scale(${value})`);
                        }
                        else if (prefix === "rotate") {
                            const value = get(mergedConfig.theme.spacing, suffix); // assuming spacing has angle values like '45' for 45deg
                            if (value !== undefined)
                                transformComponents.push(`rotate(${value}deg)`);
                        }
                        else if (prefix === "translate-x") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                transformComponents.push(`translateX(${value})`);
                        }
                        else if (prefix === "translate-y") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                transformComponents.push(`translateY(${value})`);
                        }
                        else if (prefix === "skew-x") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                transformComponents.push(`skewX(${value}deg)`);
                        }
                        else if (prefix === "skew-y") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                transformComponents.push(`skewY(${value}deg)`);
                        }
                    });
                    if (transformComponents.length > 0) {
                        rule.append(new postcss_1.Declaration({
                            prop: "transform",
                            value: transformComponents.join(" "),
                        }));
                    }
                }
                if (filterDeclarations.length > 0) {
                    const filterComponents = [];
                    filterDeclarations.forEach((decl) => {
                        const className = decl.value;
                        const parts = className.split("-");
                        const prefix = parts[0];
                        const suffix = parts.slice(1).join("-");
                        if (prefix === "blur") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                filterComponents.push(`blur(${value})`);
                        }
                        else if (prefix === "brightness") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                filterComponents.push(`brightness(${value})`);
                        }
                        else if (prefix === "contrast") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                filterComponents.push(`contrast(${value})`);
                        }
                        else if (prefix === "drop-shadow") {
                            const value = get(mergedConfig.theme.boxShadow, suffix);
                            if (value !== undefined)
                                filterComponents.push(`drop-shadow(${value})`);
                        }
                        else if (prefix === "grayscale") {
                            filterComponents.push(`grayscale(1)`);
                        }
                        else if (prefix === "hue-rotate") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                filterComponents.push(`hue-rotate(${value}deg)`);
                        }
                        else if (prefix === "invert") {
                            filterComponents.push(`invert(1)`);
                        }
                        else if (prefix === "saturate") {
                            const value = get(mergedConfig.theme.opacity, suffix);
                            if (value !== undefined)
                                filterComponents.push(`saturate(${value})`);
                        }
                        else if (prefix === "sepia") {
                            filterComponents.push(`sepia(1)`);
                        }
                    });
                    if (filterComponents.length > 0) {
                        rule.append(new postcss_1.Declaration({
                            prop: "filter",
                            value: filterComponents.join(" "),
                        }));
                    }
                }
                if (backdropFilterDeclarations.length > 0) {
                    const backdropFilterComponents = [];
                    backdropFilterDeclarations.forEach((decl) => {
                        const className = decl.value;
                        const parts = className.split("-");
                        const prefix = parts[0];
                        const suffix = parts.slice(1).join("-");
                        if (prefix === "backdrop-blur") {
                            const value = get(mergedConfig.theme.spacing, suffix);
                            if (value !== undefined)
                                backdropFilterComponents.push(`blur(${value})`);
                        }
                    });
                    if (backdropFilterComponents.length > 0) {
                        rule.append(new postcss_1.Declaration({
                            prop: "backdrop-filter",
                            value: backdropFilterComponents.join(" "),
                        }));
                    }
                }
            });
            console.log("RelaxCSS plugin finished processing.");
        },
    };
    // --- END PATCHED PLUGIN BODY ---
};
patchedPlugin.postcss = true;
module.exports = patchedPlugin;
