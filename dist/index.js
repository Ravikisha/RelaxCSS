"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_1 = __importDefault(require("postcss"));
// --- Updated defaultConfig (More comprehensive) ---
const defaultConfig = {
    theme: {
        colors: {
            primary: "#3490dc",
            secondary: "#ffed4a",
            "red-500": "#ef4444",
            "blue-500": "#3b82f6",
            tertiary: "#805ad5",
            white: "#ffffff",
            black: "#000000",
            transparent: "transparent",
            // Add more common colors as needed
        },
        spacing: {
            "0": "0rem",
            px: "1px",
            "0.5": "0.125rem",
            "1": "0.25rem",
            "1.5": "0.375rem",
            "2": "0.5rem",
            "2.5": "0.625rem",
            "3": "0.75rem",
            "3.5": "0.875rem",
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "8": "2rem",
            "10": "2.5rem",
            "12": "3rem",
            "16": "4rem",
            "20": "5rem",
            "24": "6rem",
            "32": "8rem",
            "40": "10rem",
            "48": "12rem",
            "56": "14rem",
            "64": "16rem",
            "72": "18rem",
            "80": "20rem",
            "96": "24rem",
            // For width/height:
            "1/2": "50%",
            "1/3": "33.333333%",
            "2/3": "66.666667%",
            "1/4": "25%",
            "3/4": "75%",
            full: "100%",
            screen: "100vw", // Added for screen width/height
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px", // Added
            "2xl": "1536px", // Added
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
        fontSizes: {
            xs: "0.75rem",
            sm: "0.875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
            "6xl": "3.75rem",
        },
        fontWeights: {
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
        lineHeights: {
            none: "1",
            tight: "1.25",
            snug: "1.375",
            normal: "1.5",
            relaxed: "1.625",
            loose: "2",
            "3": ".75rem", // For fixed line heights
            "4": "1rem",
            "5": "1.25rem",
            "6": "1.5rem",
            "7": "1.75rem",
            "8": "2rem",
            "9": "2.25rem",
            "10": "2.5rem",
        },
        boxShadow: {
            sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
            none: "none",
        },
        zIndex: {
            "0": "0",
            "10": "10",
            "20": "20",
            "30": "30",
            "40": "40",
            "50": "50",
            auto: "auto",
        },
        maxWidth: {
            "0": "0rem",
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
            "7xl": "80rem",
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
        minWidth: {
            "0": "0rem",
            full: "100%",
            min: "min-content",
            max: "max-content",
        },
        maxHeight: {
            full: "100%",
            screen: "100vh",
        },
        minHeight: {
            "0": "0rem",
            full: "100%",
            screen: "100vh",
        },
    },
    variants: {
        responsive: ["sm", "md", "lg", "xl", "2xl"], // Added new breakpoints
        pseudoClass: ["hover", "focus", "active", "disabled", "visited"], // Added more pseudo-classes
    },
};
function relaxcss(opts = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    let userConfig;
    if (opts.config) {
        try {
            const loadedConfig = require(opts.config);
            // Deep merge for theme properties
            userConfig = {
                ...defaultConfig,
                theme: {
                    ...defaultConfig.theme,
                    ...loadedConfig.theme, // This shallow merges, we need deeper for nested objects
                    // Explicitly deep merge nested theme objects
                    screens: {
                        ...defaultConfig.theme.screens,
                        ...(((_a = loadedConfig.theme) === null || _a === void 0 ? void 0 : _a.screens) || {}),
                    },
                    colors: {
                        ...defaultConfig.theme.colors,
                        ...(((_b = loadedConfig.theme) === null || _b === void 0 ? void 0 : _b.colors) || {}),
                    },
                    spacing: {
                        ...defaultConfig.theme.spacing,
                        ...(((_c = loadedConfig.theme) === null || _c === void 0 ? void 0 : _c.spacing) || {}),
                    },
                    borderRadius: {
                        ...defaultConfig.theme.borderRadius,
                        ...(((_d = loadedConfig.theme) === null || _d === void 0 ? void 0 : _d.borderRadius) || {}),
                    },
                    fontSizes: {
                        ...defaultConfig.theme.fontSizes,
                        ...(((_e = loadedConfig.theme) === null || _e === void 0 ? void 0 : _e.fontSizes) || {}),
                    },
                    fontWeights: {
                        ...defaultConfig.theme.fontWeights,
                        ...(((_f = loadedConfig.theme) === null || _f === void 0 ? void 0 : _f.fontWeights) || {}),
                    },
                    lineHeights: {
                        ...defaultConfig.theme.lineHeights,
                        ...(((_g = loadedConfig.theme) === null || _g === void 0 ? void 0 : _g.lineHeights) || {}),
                    },
                    boxShadow: {
                        ...defaultConfig.theme.boxShadow,
                        ...(((_h = loadedConfig.theme) === null || _h === void 0 ? void 0 : _h.boxShadow) || {}),
                    },
                    zIndex: {
                        ...defaultConfig.theme.zIndex,
                        ...(((_j = loadedConfig.theme) === null || _j === void 0 ? void 0 : _j.zIndex) || {}),
                    },
                    maxWidth: {
                        ...defaultConfig.theme.maxWidth,
                        ...(((_k = loadedConfig.theme) === null || _k === void 0 ? void 0 : _k.maxWidth) || {}),
                    },
                    minWidth: {
                        ...defaultConfig.theme.minWidth,
                        ...(((_l = loadedConfig.theme) === null || _l === void 0 ? void 0 : _l.minWidth) || {}),
                    },
                    maxHeight: {
                        ...defaultConfig.theme.maxHeight,
                        ...(((_m = loadedConfig.theme) === null || _m === void 0 ? void 0 : _m.maxHeight) || {}),
                    },
                    minHeight: {
                        ...defaultConfig.theme.minHeight,
                        ...(((_o = loadedConfig.theme) === null || _o === void 0 ? void 0 : _o.minHeight) || {}),
                    },
                },
                variants: {
                    ...defaultConfig.variants,
                    ...(loadedConfig.variants || {}), // Variants can be shallow merged
                },
            };
            // Ensure variant arrays are merged, not overwritten, unless explicitly defined
            if (loadedConfig.variants) {
                if (loadedConfig.variants.responsive) {
                    // If responsive is an array, use it; otherwise, default to current (merged)
                    if (Array.isArray(loadedConfig.variants.responsive)) {
                        userConfig.variants.responsive = loadedConfig.variants.responsive;
                    }
                }
                if (loadedConfig.variants.pseudoClass) {
                    // If pseudoClass is an array, use it; otherwise, default to current (merged)
                    if (Array.isArray(loadedConfig.variants.pseudoClass)) {
                        userConfig.variants.pseudoClass = loadedConfig.variants.pseudoClass;
                    }
                }
            }
        }
        catch (e) {
            console.error(`RelaxCSS: Could not load config file at ${opts.config}. Using default configuration.`, e);
            userConfig = defaultConfig;
        }
    }
    else {
        userConfig = defaultConfig;
    }
    // Helper to get variant prefix from a class string
    const getVariant = (cls, variantTypes) => {
        for (const v of variantTypes) {
            if (cls.startsWith(`${v}:`))
                return v;
        }
        return null;
    };
    return {
        postcssPlugin: "relaxcss",
        Once(root) {
            console.log("RelaxCSS plugin started.");
            console.log("Initial root nodes count:", root.nodes.length);
            const classesToGenerateUtilitiesFor = new Set();
            const atApplyQueue = [];
            root.walkAtRules("relax", (atRule) => {
                atRule.remove();
            });
            // Step 1: Populate classesToGenerateUtilitiesFor and queue @apply rules
            root.walkRules((rule) => {
                rule.selectors.forEach((sel) => {
                    // Updated regex for arbitrary values and variants in selectors
                    const classMatches = sel.match(/\.([a-zA-Z0-9_-]+(?:\[.*?\])?(?::[a-zA-Z0-9_-]+)*)/g);
                    if (classMatches) {
                        classMatches.forEach((match) => {
                            classesToGenerateUtilitiesFor.add(match.substring(1));
                        });
                    }
                });
                rule.walkAtRules("apply", (atRule) => {
                    const params = atRule.params.trim().split(/\s+/);
                    params.forEach((appliedCls) => {
                        atApplyQueue.push({ parentRule: rule, appliedClass: appliedCls });
                    });
                    atRule.remove();
                });
            });
            // Step 2: Process queued @apply rules (inlining styles)
            atApplyQueue.forEach(({ parentRule, appliedClass }) => {
                var _a;
                let currentClass = appliedClass;
                let responsiveVariant = null;
                let pseudoClassVariant = null;
                let baseUtility = "";
                // Extract responsive variant
                if (userConfig.variants.responsive &&
                    Array.isArray(userConfig.variants.responsive)) {
                    responsiveVariant = getVariant(currentClass, userConfig.variants.responsive);
                    if (responsiveVariant) {
                        currentClass = currentClass.replace(`${responsiveVariant}:`, "");
                    }
                }
                // Extract pseudo-class variant
                if (userConfig.variants.pseudoClass &&
                    Array.isArray(userConfig.variants.pseudoClass)) {
                    pseudoClassVariant = getVariant(currentClass, userConfig.variants.pseudoClass);
                    if (pseudoClassVariant) {
                        currentClass = currentClass.replace(`${pseudoClassVariant}:`, "");
                    }
                }
                baseUtility = currentClass; // The utility class without variants
                const baseRuleDeclarations = generateRuleFor(baseUtility, userConfig);
                if (!baseRuleDeclarations)
                    return; // If no declarations are generated for the base utility, skip
                let targetRule = parentRule;
                let mediaQueryRule = null;
                if (responsiveVariant) {
                    if (!userConfig.theme.screens[responsiveVariant]) {
                        console.warn(`RelaxCSS: Responsive variant '${responsiveVariant}' used in @apply for '${appliedClass}' but no screen size defined in config. Skipping.`);
                        return;
                    }
                    const mqParams = `(min-width: ${userConfig.theme.screens[responsiveVariant]})`;
                    // Find or create the media query rule at the root level
                    mediaQueryRule = root.nodes.find((node) => node.type === "atrule" &&
                        node.name === "media" &&
                        node.params === mqParams);
                    if (!mediaQueryRule) {
                        mediaQueryRule = postcss_1.default.atRule({
                            name: "media",
                            params: mqParams,
                        });
                        root.append(mediaQueryRule);
                    }
                    // Ensure mediaQueryRule has a `nodes` array
                    if (!mediaQueryRule.nodes) {
                        mediaQueryRule.nodes = []; // Cast to any to add nodes if missing
                    }
                    let innerSelector = parentRule.selector;
                    if (pseudoClassVariant) {
                        innerSelector = `${parentRule.selector}:${pseudoClassVariant}`;
                    }
                    // Find or create the rule inside the media query
                    let existingRuleInMq = (mediaQueryRule.nodes || []).find((node) => node.type === "rule" && node.selector === innerSelector);
                    if (!existingRuleInMq) {
                        existingRuleInMq = postcss_1.default.rule({ selector: innerSelector });
                        mediaQueryRule.append(existingRuleInMq);
                    }
                    targetRule = existingRuleInMq; // Set targetRule to the one inside the media query
                }
                else if (pseudoClassVariant) {
                    const variantSelector = `${parentRule.selector}:${pseudoClassVariant}`;
                    // Find or create the pseudo-class rule at the same level as parentRule
                    let existingVariantRule = (_a = parentRule.parent) === null || _a === void 0 ? void 0 : _a.nodes.find((node) => node.type === "rule" && node.selector === variantSelector);
                    if (!existingVariantRule) {
                        existingVariantRule = postcss_1.default.rule({ selector: variantSelector });
                        // Insert the pseudo-class rule right after the original rule
                        parentRule.after(existingVariantRule);
                    }
                    targetRule = existingVariantRule; // Set targetRule to the pseudo-class variant rule
                }
                // Append declarations to the determined target rule
                baseRuleDeclarations.nodes.forEach((decl) => {
                    if (decl.type === "decl") {
                        targetRule.append(decl.clone()); // Append a clone to avoid moving the original node
                    }
                });
            });
            // Step 3: Generate standalone utility rules only for classes found directly in selectors
            const utilities = [];
            classesToGenerateUtilitiesFor.forEach((cls) => {
                let currentClass = cls;
                let responsiveVariant = null;
                let pseudoClassVariant = null;
                let baseUtility = "";
                // Extract responsive variant
                if (userConfig.variants.responsive &&
                    Array.isArray(userConfig.variants.responsive)) {
                    responsiveVariant = getVariant(currentClass, userConfig.variants.responsive);
                    if (responsiveVariant) {
                        currentClass = currentClass.replace(`${responsiveVariant}:`, "");
                    }
                }
                // Extract pseudo-class variant
                if (userConfig.variants.pseudoClass &&
                    Array.isArray(userConfig.variants.pseudoClass)) {
                    pseudoClassVariant = getVariant(currentClass, userConfig.variants.pseudoClass);
                    if (pseudoClassVariant) {
                        currentClass = currentClass.replace(`${pseudoClassVariant}:`, "");
                    }
                }
                baseUtility = currentClass; // The utility class without variants
                const baseRuleDeclarations = generateRuleFor(baseUtility, userConfig);
                if (!baseRuleDeclarations)
                    return;
                // Construct the final selector for the utility
                let newRuleSelector = `.${cls
                    .replace(/([:[]])/g, "\\$1")
                    .replace(/\]/g, "\\]")}`; // Escaped original class for selector, handling arbitrary values and variants
                if (pseudoClassVariant) {
                    newRuleSelector += `:${pseudoClassVariant}`; // Add pseudo-class directly to the selector
                }
                const finalUtilityRule = postcss_1.default.rule({ selector: newRuleSelector });
                baseRuleDeclarations.nodes.forEach((node) => finalUtilityRule.append(node.clone()));
                if (responsiveVariant) {
                    if (!userConfig.theme.screens[responsiveVariant]) {
                        console.warn(`RelaxCSS: Responsive variant '${responsiveVariant}' used in utility '${cls}' but no screen size defined in config. Skipping.`);
                        return;
                    }
                    const mq = postcss_1.default.atRule({
                        name: "media",
                        params: `(min-width: ${userConfig.theme.screens[responsiveVariant]})`,
                    });
                    mq.append(finalUtilityRule);
                    utilities.push(mq);
                }
                else {
                    utilities.push(finalUtilityRule);
                }
            });
            // Sort utilities to ensure media queries are at the end and in order
            utilities.sort((a, b) => {
                const isAMedia = a.type === "atrule" && a.name === "media";
                const isBMedia = b.type === "atrule" && b.name === "media";
                if (isAMedia && !isBMedia)
                    return 1; // Media queries come after regular rules
                if (!isAMedia && isBMedia)
                    return -1; // Regular rules come before media queries
                if (isAMedia && isBMedia) {
                    // Sort media queries by breakpoint value
                    const getBreakpoint = (node) => {
                        const match = node.params.match(/min-width:\s*(\d+)/);
                        return match ? parseInt(match[1]) : 0;
                    };
                    return (getBreakpoint(a) -
                        getBreakpoint(b));
                }
                // For non-media rules, maintain original order
                return 0;
            });
            utilities.forEach((r) => root.append(r));
            console.log("RelaxCSS plugin finished processing.");
            console.log("Final root nodes count:", root.nodes.length);
        },
    };
}
relaxcss.postcss = true;
// --- generateRuleFor function starts here (MODIFIED) ---
function generateRuleFor(cls, cfg) {
    const rule = postcss_1.default.rule({ selector: `.${cls}` }); // This selector is a placeholder/temp
    // Helper to extract arbitrary value
    const getArbitraryValue = (className, prefix) => {
        // Escaping prefix for regex to handle special characters like '.' in 'max-w-screen-2xl'
        const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`^${escapedPrefix}\\[(.*?)\\]$`);
        const match = className.match(regex);
        return match ? match[1] : null;
    };
    // Helper to get value from theme or arbitrary, with a fallback
    const getValue = (className, prefix, themeLookup, prop // for logging/debugging
    ) => {
        const arbitrary = getArbitraryValue(className, prefix);
        if (arbitrary !== null) {
            return arbitrary;
        }
        const key = className.slice(prefix.length); // e.g., 'red-500' from 'bg-red-500'
        const value = themeLookup[key];
        if (value === undefined) {
            // console.warn(`RelaxCSS: No value found for '${key}' in theme.${prop} for class '${className}'.`);
            return null;
        }
        return value;
    };
    const utilityMap = {
        // Colors
        "bg-": { prop: "background-color", themeKey: "colors" },
        // Merged text- and color-related properties
        "text-": {
            prop: "font-size", // Default prop, but complexHandler will handle color too
            themeKey: "fontSizes",
            complexHandler: (key, cfg) => {
                const declarations = [];
                const color = cfg.theme.colors[key];
                if (color) {
                    declarations.push(postcss_1.default.decl({ prop: "color", value: color }));
                }
                // Fallback to font-size if not a color
                const fontSize = cfg.theme.fontSizes[key];
                if (fontSize) {
                    declarations.push(postcss_1.default.decl({ prop: "font-size", value: fontSize }));
                }
                return declarations;
            },
        },
        // Merged border- and width-related properties
        "border-": {
            prop: "border-color", // Default prop for color based on theme
            themeKey: "colors",
            complexHandler: (key, cfg) => {
                // Handles border-width also
                const declarations = [];
                // Try to get border-color first
                const color = cfg.theme.colors[key];
                if (color) {
                    declarations.push(postcss_1.default.decl({ prop: "border-color", value: color }));
                }
                // Then try to get border-width (e.g., border-2, border-0)
                const value = getArbitraryValue(`border-[${key}]`, "border-") ||
                    cfg.theme.spacing[key];
                if (value !== undefined) {
                    declarations.push(postcss_1.default.decl({ prop: "border-width", value: value }));
                }
                else if (key === "") {
                    // Handles plain 'border' class, default to 1px
                    declarations.push(postcss_1.default.decl({ prop: "border-width", value: "1px" }));
                }
                return declarations;
            },
        },
        "outline-": { prop: "outline-color", themeKey: "colors" },
        // Spacing (Margin & Padding)
        "p-": { prop: "padding", themeKey: "spacing" },
        "m-": { prop: "margin", themeKey: "spacing" },
        "pt-": { prop: "padding-top", themeKey: "spacing" },
        "pb-": { prop: "padding-bottom", themeKey: "spacing" },
        "pl-": { prop: "padding-left", themeKey: "spacing" },
        "pr-": { prop: "padding-right", themeKey: "spacing" },
        "px-": {
            prop: ["padding-left", "padding-right"],
            themeKey: "spacing",
        },
        "py-": {
            prop: ["padding-top", "padding-bottom"],
            themeKey: "spacing",
        },
        "mt-": { prop: "margin-top", themeKey: "spacing" },
        "mb-": { prop: "margin-bottom", themeKey: "spacing" },
        "ml-": { prop: "margin-left", themeKey: "spacing" },
        "mr-": { prop: "margin-right", themeKey: "spacing" },
        "mx-": {
            prop: ["margin-left", "margin-right"],
            themeKey: "spacing",
        },
        "my-": {
            prop: ["margin-top", "margin-bottom"],
            themeKey: "spacing",
        },
        "-m-": {
            // Negative margins
            prop: "margin",
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getValue(`-m-${key}`, "-m-", cfg.theme.spacing, "spacing");
                return value
                    ? [postcss_1.default.decl({ prop: "margin", value: `-${value}` })]
                    : [];
            },
        },
        "-mt-": {
            // Negative margins
            prop: "margin-top",
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getValue(`-mt-${key}`, "-mt-", cfg.theme.spacing, "spacing");
                return value
                    ? [postcss_1.default.decl({ prop: "margin-top", value: `-${value}` })]
                    : [];
            },
        },
        "-mb-": {
            // Negative margins
            prop: "margin-bottom",
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getValue(`-mb-${key}`, "-mb-", cfg.theme.spacing, "spacing");
                return value
                    ? [postcss_1.default.decl({ prop: "margin-bottom", value: `-${value}` })]
                    : [];
            },
        },
        "-ml-": {
            // Negative margins
            prop: "margin-left",
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getValue(`-ml-${key}`, "-ml-", cfg.theme.spacing, "spacing");
                return value
                    ? [postcss_1.default.decl({ prop: "margin-left", value: `-${value}` })]
                    : [];
            },
        },
        "-mr-": {
            // Negative margins
            prop: "margin-right",
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getValue(`-mr-${key}`, "-mr-", cfg.theme.spacing, "spacing");
                return value
                    ? [postcss_1.default.decl({ prop: "margin-right", value: `-${value}` })]
                    : [];
            },
        },
        "-mx-": {
            // Negative margins
            prop: ["margin-left", "margin-right"],
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getValue(`-mx-${key}`, "-mx-", cfg.theme.spacing, "spacing");
                return value
                    ? [
                        postcss_1.default.decl({ prop: "margin-left", value: `-${value}` }),
                        postcss_1.default.decl({ prop: "margin-right", value: `-${value}` }),
                    ]
                    : [];
            },
        },
        "-my-": {
            // Negative margins
            prop: ["margin-top", "margin-bottom"],
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getValue(`-my-${key}`, "-my-", cfg.theme.spacing, "spacing");
                return value
                    ? [
                        postcss_1.default.decl({ prop: "margin-top", value: `-${value}` }),
                        postcss_1.default.decl({ prop: "margin-bottom", value: `-${value}` }),
                    ]
                    : [];
            },
        },
        "inset-": {
            prop: ["top", "right", "bottom", "left"],
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                if (key === "0")
                    return [
                        postcss_1.default.decl({ prop: "top", value: "0" }),
                        postcss_1.default.decl({ prop: "right", value: "0" }),
                        postcss_1.default.decl({ prop: "bottom", value: "0" }),
                        postcss_1.default.decl({ prop: "left", value: "0" }),
                    ];
                const value = getValue(`inset-${key}`, "inset-", cfg.theme.spacing, "spacing");
                return value
                    ? [
                        postcss_1.default.decl({ prop: "top", value }),
                        postcss_1.default.decl({ prop: "right", value }),
                        postcss_1.default.decl({ prop: "bottom", value }),
                        postcss_1.default.decl({ prop: "left", value }),
                    ]
                    : [];
            },
        },
        "top-": { prop: "top", themeKey: "spacing" },
        "bottom-": { prop: "bottom", themeKey: "spacing" },
        "left-": { prop: "left", themeKey: "spacing" },
        "right-": { prop: "right", themeKey: "spacing" },
        // Sizing
        "w-": { prop: "width", themeKey: "spacing" }, // w-1/2, w-full, w-4 etc.
        "h-": { prop: "height", themeKey: "spacing" }, // h-full, h-screen, h-8 etc.
        "max-w-": { prop: "max-width", themeKey: "maxWidth" },
        "min-w-": { prop: "min-width", themeKey: "minWidth" },
        "max-h-": { prop: "max-height", themeKey: "maxHeight" },
        "min-h-": { prop: "min-height", themeKey: "minHeight" },
        // Typography
        "font-": {
            prop: "font-weight",
            themeKey: "fontWeights", // Handles font-bold, font-light etc.
            complexHandler: (key, cfg) => {
                const declarations = [];
                const fontWeight = cfg.theme.fontWeights[key];
                if (fontWeight) {
                    declarations.push(postcss_1.default.decl({ prop: "font-weight", value: fontWeight }));
                }
                // Handle font-style (italic, not-italic) or other font properties
                if (key === "italic")
                    declarations.push(postcss_1.default.decl({ prop: "font-style", value: "italic" }));
                if (key === "not-italic")
                    declarations.push(postcss_1.default.decl({ prop: "font-style", value: "normal" }));
                return declarations;
            },
        },
        "leading-": { prop: "line-height", themeKey: "lineHeights" },
        "tracking-": {
            // Letter spacing
            prop: "letter-spacing",
            valueMap: {
                tight: "-0.025em",
                normal: "0em",
                wide: "0.025em",
                // Add more as needed
            },
        },
        "text-center": { prop: "text-align", valueMap: { center: "center" } },
        "text-left": { prop: "text-align", valueMap: { left: "left" } },
        "text-right": { prop: "text-align", valueMap: { right: "right" } },
        "text-justify": { prop: "text-align", valueMap: { justify: "justify" } },
        uppercase: { prop: "text-transform", valueMap: { uppercase: "uppercase" } },
        lowercase: { prop: "text-transform", valueMap: { lowercase: "lowercase" } },
        capitalize: {
            prop: "text-transform",
            valueMap: { capitalize: "capitalize" },
        },
        "normal-case": {
            prop: "text-transform",
            valueMap: { "normal-case": "none" },
        },
        underline: {
            prop: "text-decoration",
            valueMap: { underline: "underline" },
        },
        "no-underline": {
            prop: "text-decoration",
            valueMap: { "no-underline": "none" },
        },
        "line-through": {
            prop: "text-decoration",
            valueMap: { "line-through": "line-through" },
        },
        // Display
        block: { prop: "display", valueMap: { block: "block" } },
        inline: { prop: "display", valueMap: { inline: "inline" } },
        "inline-block": {
            prop: "display",
            valueMap: { "inline-block": "inline-block" },
        },
        hidden: { prop: "display", valueMap: { hidden: "none" } },
        contents: { prop: "display", valueMap: { contents: "contents" } },
        "list-item": { prop: "display", valueMap: { "list-item": "list-item" } },
        // Flexbox
        flex: { prop: "display", valueMap: { flex: "flex" } },
        "inline-flex": {
            prop: "display",
            valueMap: { "inline-flex": "inline-flex" },
        },
        "flex-row": { prop: "flex-direction", valueMap: { row: "row" } },
        "flex-col": { prop: "flex-direction", valueMap: { col: "column" } },
        "flex-row-reverse": {
            prop: "flex-direction",
            valueMap: { "row-reverse": "row-reverse" },
        },
        "flex-col-reverse": {
            prop: "flex-direction",
            valueMap: { "col-reverse": "column-reverse" },
        },
        "flex-wrap": { prop: "flex-wrap", valueMap: { wrap: "wrap" } },
        "flex-wrap-reverse": {
            prop: "flex-wrap",
            valueMap: { "wrap-reverse": "wrap-reverse" },
        },
        "flex-nowrap": { prop: "flex-wrap", valueMap: { nowrap: "nowrap" } },
        "flex-1": { prop: "flex", valueMap: { "1": "1 1 0%" } },
        "flex-auto": { prop: "flex", valueMap: { auto: "1 1 auto" } },
        "flex-initial": { prop: "flex", valueMap: { initial: "0 1 auto" } },
        "flex-none": { prop: "flex", valueMap: { none: "none" } },
        "items-start": { prop: "align-items", valueMap: { start: "flex-start" } },
        "items-end": { prop: "align-items", valueMap: { end: "flex-end" } },
        "items-center": { prop: "align-items", valueMap: { center: "center" } },
        "items-baseline": {
            prop: "align-items",
            valueMap: { baseline: "baseline" },
        },
        "items-stretch": { prop: "align-items", valueMap: { stretch: "stretch" } },
        "justify-start": {
            prop: "justify-content",
            valueMap: { start: "flex-start" },
        },
        "justify-end": { prop: "justify-content", valueMap: { end: "flex-end" } },
        "justify-center": {
            prop: "justify-content",
            valueMap: { center: "center" },
        },
        "justify-between": {
            prop: "justify-content",
            valueMap: { between: "space-between" },
        },
        "justify-around": {
            prop: "justify-content",
            valueMap: { around: "space-around" },
        },
        "justify-evenly": {
            prop: "justify-content",
            valueMap: { evenly: "space-evenly" },
        },
        "self-auto": { prop: "align-self", valueMap: { auto: "auto" } },
        "self-start": { prop: "align-self", valueMap: { start: "flex-start" } },
        "self-end": { prop: "align-self", valueMap: { end: "flex-end" } },
        "self-center": { prop: "align-self", valueMap: { center: "center" } },
        "self-stretch": { prop: "align-self", valueMap: { stretch: "stretch" } },
        // Gap (for Flex and Grid)
        "gap-": { prop: "gap", themeKey: "spacing" },
        "gap-x-": { prop: "column-gap", themeKey: "spacing" },
        "gap-y-": { prop: "row-gap", themeKey: "spacing" },
        // Grid (basic)
        grid: { prop: "display", valueMap: { grid: "grid" } },
        "grid-cols-": {
            prop: "grid-template-columns",
            complexHandler: (key, cfg) => {
                // Added cfg argument
                if (key === "none")
                    return [
                        postcss_1.default.decl({ prop: "grid-template-columns", value: "none" }),
                    ];
                const num = parseInt(key);
                if (!isNaN(num) && num > 0) {
                    return [
                        postcss_1.default.decl({
                            prop: "grid-template-columns",
                            value: `repeat(${num}, minmax(0, 1fr))`,
                        }),
                    ];
                }
                return [];
            },
        },
        "col-span-": {
            prop: "grid-column",
            complexHandler: (key, cfg) => {
                // Added cfg argument
                const num = parseInt(key);
                if (!isNaN(num) && num > 0) {
                    return [
                        postcss_1.default.decl({
                            prop: "grid-column",
                            value: `span ${num} / span ${num}`,
                        }),
                    ];
                }
                if (key === "full")
                    return [postcss_1.default.decl({ prop: "grid-column", value: "1 / -1" })];
                return [];
            },
        },
        "col-start-": {
            prop: "grid-column-start",
            complexHandler: (key, cfg) => {
                // Added cfg argument
                if (key === "auto")
                    return [postcss_1.default.decl({ prop: "grid-column-start", value: "auto" })];
                const num = parseInt(key);
                if (!isNaN(num) && num > 0) {
                    return [postcss_1.default.decl({ prop: "grid-column-start", value: key })];
                }
                return [];
            },
        },
        "col-end-": {
            prop: "grid-column-end",
            complexHandler: (key, cfg) => {
                // Added cfg argument
                if (key === "auto")
                    return [postcss_1.default.decl({ prop: "grid-column-end", value: "auto" })];
                const num = parseInt(key);
                if (!isNaN(num) && num > 0) {
                    return [postcss_1.default.decl({ prop: "grid-column-end", value: key })];
                }
                return [];
            },
        },
        "grid-rows-": {
            prop: "grid-template-rows",
            complexHandler: (key, cfg) => {
                // Added cfg argument
                if (key === "none")
                    return [postcss_1.default.decl({ prop: "grid-template-rows", value: "none" })];
                const num = parseInt(key);
                if (!isNaN(num) && num > 0) {
                    return [
                        postcss_1.default.decl({
                            prop: "grid-template-rows",
                            value: `repeat(${num}, minmax(0, 1fr))`,
                        }),
                    ];
                }
                return [];
            },
        },
        "row-span-": {
            prop: "grid-row",
            complexHandler: (key, cfg) => {
                // Added cfg argument
                const num = parseInt(key);
                if (!isNaN(num) && num > 0) {
                    return [
                        postcss_1.default.decl({
                            prop: "grid-row",
                            value: `span ${num} / span ${num}`,
                        }),
                    ];
                }
                if (key === "full")
                    return [postcss_1.default.decl({ prop: "grid-row", value: "1 / -1" })];
                return [];
            },
        },
        "row-start-": {
            prop: "grid-row-start",
            complexHandler: (key, cfg) => {
                // Added cfg argument
                if (key === "auto")
                    return [postcss_1.default.decl({ prop: "grid-row-start", value: "auto" })];
                const num = parseInt(key);
                if (!isNaN(num) && num > 0) {
                    return [postcss_1.default.decl({ prop: "grid-row-start", value: key })];
                }
                return [];
            },
        },
        "row-end-": {
            prop: "grid-row-end",
            complexHandler: (key, cfg) => {
                // Added cfg argument
                if (key === "auto")
                    return [postcss_1.default.decl({ prop: "grid-row-end", value: "auto" })];
                const num = parseInt(key);
                if (!isNaN(num) && num > 0) {
                    return [postcss_1.default.decl({ prop: "grid-row-end", value: key })];
                }
                return [];
            },
        },
        "auto-cols-": {
            prop: "grid-auto-columns",
            valueMap: {
                auto: "auto",
                min: "min-content",
                max: "max-content",
                fr: "minmax(0, 1fr)",
            },
        },
        "auto-rows-": {
            prop: "grid-auto-rows",
            valueMap: {
                auto: "auto",
                min: "min-content",
                max: "max-content",
                fr: "minmax(0, 1fr)",
            },
        },
        // Borders & Outline
        "rounded-": { prop: "border-radius", themeKey: "borderRadius" },
        "rounded-t-": {
            prop: ["border-top-left-radius", "border-top-right-radius"],
            themeKey: "borderRadius",
        },
        "rounded-b-": {
            prop: ["border-bottom-left-radius", "border-bottom-right-radius"],
            themeKey: "borderRadius",
        },
        "rounded-l-": {
            prop: ["border-top-left-radius", "border-bottom-left-radius"],
            themeKey: "borderRadius",
        },
        "rounded-r-": {
            prop: ["border-top-right-radius", "border-bottom-right-radius"],
            themeKey: "borderRadius",
        },
        "rounded-tl-": { prop: "border-top-left-radius", themeKey: "borderRadius" },
        "rounded-tr-": {
            prop: "border-top-right-radius",
            themeKey: "borderRadius",
        },
        "rounded-bl-": {
            prop: "border-bottom-left-radius",
            themeKey: "borderRadius",
        },
        "rounded-br-": {
            prop: "border-bottom-right-radius",
            themeKey: "borderRadius",
        },
        "border-solid": { prop: "border-style", valueMap: { solid: "solid" } },
        "border-dashed": { prop: "border-style", valueMap: { dashed: "dashed" } },
        "border-dotted": { prop: "border-style", valueMap: { dotted: "dotted" } },
        "border-none": { prop: "border-style", valueMap: { none: "none" } },
        "border-t-": {
            prop: "border-top-width",
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getArbitraryValue(`border-t-[${key}]`, "border-t-") ||
                    cfg.theme.spacing[key] ||
                    "1px"; // Default to 1px if no theme value for general border
                return [postcss_1.default.decl({ prop: "border-top-width", value: value })];
            },
        },
        "border-b-": {
            prop: "border-bottom-width",
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getArbitraryValue(`border-b-[${key}]`, "border-b-") ||
                    cfg.theme.spacing[key] ||
                    "1px";
                return [postcss_1.default.decl({ prop: "border-bottom-width", value: value })];
            },
        },
        "border-l-": {
            prop: "border-left-width",
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getArbitraryValue(`border-l-[${key}]`, "border-l-") ||
                    cfg.theme.spacing[key] ||
                    "1px";
                return [postcss_1.default.decl({ prop: "border-left-width", value: value })];
            },
        },
        "border-r-": {
            prop: "border-right-width",
            themeKey: "spacing",
            complexHandler: (key, cfg) => {
                const value = getArbitraryValue(`border-r-[${key}]`, "border-r-") ||
                    cfg.theme.spacing[key] ||
                    "1px";
                return [postcss_1.default.decl({ prop: "border-right-width", value: value })];
            },
        },
        // Box Shadow
        "shadow-": { prop: "box-shadow", themeKey: "boxShadow" },
        shadow: {
            prop: "box-shadow",
            complexHandler: (key, cfg) => {
                // For 'shadow' itself (e.g. `class="shadow"`)
                // The key will be an empty string or 'default' if it's explicitly 'shadow-default'
                const shadowValue = cfg.theme.boxShadow[key] || cfg.theme.boxShadow.DEFAULT;
                return shadowValue
                    ? [postcss_1.default.decl({ prop: "box-shadow", value: shadowValue })]
                    : [];
            },
        },
        // Position
        static: { prop: "position", valueMap: { static: "static" } },
        fixed: { prop: "position", valueMap: { fixed: "fixed" } },
        absolute: { prop: "position", valueMap: { absolute: "absolute" } },
        relative: { prop: "position", valueMap: { relative: "relative" } },
        sticky: { prop: "position", valueMap: { sticky: "sticky" } },
        // Z-Index
        "z-": { prop: "z-index", themeKey: "zIndex" },
        // Overflow
        "overflow-auto": { prop: "overflow", valueMap: { auto: "auto" } },
        "overflow-hidden": { prop: "overflow", valueMap: { hidden: "hidden" } },
        "overflow-clip": { prop: "overflow", valueMap: { clip: "clip" } },
        "overflow-visible": { prop: "overflow", valueMap: { visible: "visible" } },
        "overflow-scroll": { prop: "overflow", valueMap: { scroll: "scroll" } },
        "overflow-x-auto": { prop: "overflow-x", valueMap: { auto: "auto" } },
        "overflow-y-auto": { prop: "overflow-y", valueMap: { auto: "auto" } },
        "overflow-x-hidden": { prop: "overflow-x", valueMap: { hidden: "hidden" } },
        "overflow-y-hidden": { prop: "overflow-y", valueMap: { hidden: "hidden" } },
        // Cursor
        "cursor-auto": { prop: "cursor", valueMap: { auto: "auto" } },
        "cursor-default": { prop: "cursor", valueMap: { default: "default" } },
        "cursor-pointer": { prop: "cursor", valueMap: { pointer: "pointer" } },
        "cursor-wait": { prop: "cursor", valueMap: { wait: "wait" } },
        "cursor-text": { prop: "cursor", valueMap: { text: "text" } },
        "cursor-move": { prop: "cursor", valueMap: { move: "move" } },
        "cursor-help": { prop: "cursor", valueMap: { help: "help" } },
        "cursor-not-allowed": {
            prop: "cursor",
            valueMap: { "not-allowed": "not-allowed" },
        },
        "cursor-grab": { prop: "cursor", valueMap: { grab: "grab" } },
        "cursor-grabbing": { prop: "cursor", valueMap: { grabbing: "grabbing" } },
        // Pointer Events
        "pointer-events-none": {
            prop: "pointer-events",
            valueMap: { none: "none" },
        },
        "pointer-events-auto": {
            prop: "pointer-events",
            valueMap: { auto: "auto" },
        },
        // Visibility
        visible: { prop: "visibility", valueMap: { visible: "visible" } },
        invisible: { prop: "visibility", valueMap: { invisible: "hidden" } },
        // Opacity
        "opacity-": {
            prop: "opacity",
            complexHandler: (key, cfg) => {
                // Added cfg argument
                const declarations = [];
                const num = parseFloat(key);
                if (!isNaN(num) && num >= 0 && num <= 100) {
                    // e.g., opacity-50
                    declarations.push(postcss_1.default.decl({ prop: "opacity", value: (num / 100).toString() }));
                }
                // Arbitrary values like opacity-[0.25]
                const arbitrary = getArbitraryValue(`opacity-[${key}]`, "opacity-");
                if (arbitrary) {
                    declarations.push(postcss_1.default.decl({ prop: "opacity", value: arbitrary }));
                }
                return declarations;
            },
        },
        // White Space
        "whitespace-normal": {
            prop: "white-space",
            valueMap: { normal: "normal" },
        },
        "whitespace-nowrap": {
            prop: "white-space",
            valueMap: { nowrap: "nowrap" },
        },
        "whitespace-pre": { prop: "white-space", valueMap: { pre: "pre" } },
        "whitespace-pre-line": {
            prop: "white-space",
            valueMap: { "pre-line": "pre-line" },
        },
        "whitespace-pre-wrap": {
            prop: "white-space",
            valueMap: { "pre-wrap": "pre-wrap" },
        },
        truncate: {
            prop: ["overflow", "text-overflow", "white-space"],
            valueMap: {
                truncate: ["hidden", "ellipsis", "nowrap"],
            },
        },
        // Object Fit
        "object-contain": { prop: "object-fit", valueMap: { contain: "contain" } },
        "object-cover": { prop: "object-fit", valueMap: { cover: "cover" } },
        "object-fill": { prop: "object-fit", valueMap: { fill: "fill" } },
        "object-none": { prop: "object-fit", valueMap: { none: "none" } },
        "object-scale-down": {
            prop: "object-fit",
            valueMap: { "scale-down": "scale-down" },
        },
        // Object Position
        "object-bottom": {
            prop: "object-position",
            valueMap: { bottom: "bottom" },
        },
        "object-center": {
            prop: "object-position",
            valueMap: { center: "center" },
        },
        "object-left": { prop: "object-position", valueMap: { left: "left" } },
        "object-left-bottom": {
            prop: "object-position",
            valueMap: { "left-bottom": "left bottom" },
        },
        "object-left-top": {
            prop: "object-position",
            valueMap: { "left-top": "left top" },
        },
        "object-right": { prop: "object-position", valueMap: { right: "right" } },
        "object-right-bottom": {
            prop: "object-position",
            valueMap: { "right-bottom": "right bottom" },
        },
        "object-right-top": {
            prop: "object-position",
            valueMap: { "right-top": "right top" },
        },
        "object-top": { prop: "object-position", valueMap: { top: "top" } },
    };
    // Iterate through utilityMap to find a match
    for (const prefix in utilityMap) {
        if (cls.startsWith(prefix)) {
            const handler = utilityMap[prefix];
            const declarations = [];
            const key = cls.slice(prefix.length); // e.g., '500' from 'bg-500' or 'red-500' from 'bg-red-500'
            // Arbitrary value check first
            const arbitraryValue = getArbitraryValue(cls, prefix);
            if (arbitraryValue !== null) {
                const props = Array.isArray(handler.prop)
                    ? handler.prop
                    : [handler.prop];
                props.forEach((p) => declarations.push(postcss_1.default.decl({ prop: p, value: arbitraryValue })));
            }
            else if (handler.complexHandler) {
                declarations.push(...handler.complexHandler(key, cfg)); // Ensure cfg is passed here
            }
            else if (handler.valueMap && handler.valueMap[key] !== undefined) {
                // Check for undefined
                const value = handler.valueMap[key];
                const props = Array.isArray(handler.prop)
                    ? handler.prop
                    : [handler.prop];
                if (Array.isArray(value)) {
                    // For truncate and similar multi-property handlers
                    if (props.length === value.length) {
                        value.forEach((val, index) => {
                            declarations.push(postcss_1.default.decl({ prop: props[index], value: val }));
                        });
                    }
                    else {
                        console.warn(`RelaxCSS: Mismatch in prop and value array length for '${cls}'.`);
                    }
                }
                else {
                    props.forEach((p) => declarations.push(postcss_1.default.decl({ prop: p, value: value }))); // Type assertion
                }
            }
            else if (handler.themeKey) {
                const themeCategory = cfg.theme[handler.themeKey];
                if (themeCategory && typeof themeCategory === "object") {
                    // Ensure themeCategory exists and is an object
                    const themeValue = themeCategory[key];
                    if (themeValue !== undefined) {
                        const props = Array.isArray(handler.prop)
                            ? handler.prop
                            : [handler.prop];
                        props.forEach((p) => declarations.push(postcss_1.default.decl({ prop: p, value: themeValue })));
                    }
                }
            }
            declarations.forEach((decl) => rule.append(decl));
            return rule.nodes.length ? rule : null;
        }
    }
    // Handle specific exact matches that don't fit a prefix pattern or are complex
    switch (cls) {
        case "container":
            // This is a more complex utility that often involves max-width and margin: auto
            // For now, let's keep it simple or implement it later.
            // Example:
            // rule.append(postcss.decl({ prop: "width", value: "100%" }));
            // rule.append(postcss.decl({ prop: "margin-right", value: "auto" }));
            // rule.append(postcss.decl({ prop: "margin-left", value: "auto" }));
            // return rule; // Return early if handled
            break;
        case "antialiased":
            rule.append(postcss_1.default.decl({ prop: "-webkit-font-smoothing", value: "antialiased" }));
            rule.append(postcss_1.default.decl({ prop: "-moz-osx-font-smoothing", value: "grayscale" }));
            return rule;
        case "subpixel-antialiased":
            rule.append(postcss_1.default.decl({ prop: "-webkit-font-smoothing", value: "auto" }));
            rule.append(postcss_1.default.decl({ prop: "-moz-osx-font-smoothing", value: "auto" }));
            return rule;
        case "table":
            rule.append(postcss_1.default.decl({ prop: "display", value: "table" }));
            return rule;
        case "table-row":
            rule.append(postcss_1.default.decl({ prop: "display", value: "table-row" }));
            return rule;
        case "table-cell":
            rule.append(postcss_1.default.decl({ prop: "display", value: "table-cell" }));
            return rule;
        // Add other exact matches here
    }
    return rule.nodes.length ? rule : null;
}
module.exports = relaxcss;
exports.default = relaxcss;
