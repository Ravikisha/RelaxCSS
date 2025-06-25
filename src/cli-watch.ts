import chokidar from "chokidar";
import postcss, { Declaration } from "postcss";
import fs from "fs";
import path from "path";
import relaxcss from "./index";
import * as glob from "glob";

// --- Read file extensions from RelaxCSS config ---
interface RelaxPlugin {
  (api: {
    addUtilities: (
      utils: Record<string, (config: RelaxConfig) => Declaration[]>
    ) => void;
    config: RelaxConfig;
  }): void;
}

interface RelaxConfig {
  theme: {
    screens: { [key: string]: string };
    spacing: { [key: string]: string };
    colors: { [key: string]: string | { [key: string]: string } };
    fontSize: { [key: string]: [string, { lineHeight: string }] };
    fontWeight: { [key: string]: string };
    lineHeight: { [key: string]: string };
    boxShadow: { [key: string]: string };
    zIndex: { [key: string]: string };
    opacity: { [key: string]: string };
    borderRadius: { [key: string]: string };
    borderWidth: { [key: string]: string };
    gridTemplateColumns: { [key: string]: string };
    gridTemplateRows: { [key: string]: string };
    flex: { [key: string]: string };
    transitionProperty: { [key: string]: string };
    transitionDuration: { [key: string]: string };
    transitionTimingFunction: { [key: string]: string };
    // NEW: Add maxWidth and maxHeight scales to theme
    maxWidth: { [key: string]: string };
    maxHeight: { [key: string]: string };
  };
  variants: {
    responsive: string[];
    pseudoClasses: string[];
  };
  plugins?: RelaxPlugin[];
  preflight?: {
    enabled?: boolean;
    overrides?: string; // User can provide custom CSS string to override the reset
    disableSections?: string[]; // List of section keys to disable (e.g., ['box-sizing', 'margin-padding'])
  };
  darkMode?: 'class' | 'media' | 'both';
  rtl?: boolean; // NEW: enable RTL logical property support
  fileExtensions?: string[]; // NEW: allow user to specify file extensions to watch
}

export const defaultConfig: RelaxConfig = {
  fileExtensions: ["css", "html", "js", "jsx", "ts", "tsx", "vue", "svelte"],
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
      DEFAULT:
        "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      colors:
        "color, background-color, border-color, text-decoration-color, fill, stroke",
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

// Helper: Get file extensions from config or fallback
function getFileExtensionsFromConfig(): string[] {
  // Try to get from config, fallback to common web extensions
  // You can extend this to read from a config file if needed
  const configExts = (defaultConfig?.fileExtensions as string[]) || [
    "css",
    "html",
    "js",
    "jsx",
    "ts",
    "tsx",
  ];
  return configExts;
}

// Usage: node cli-watch.js --out dist/output.css
const args = process.argv.slice(2);
const outFile = args[args.indexOf("--out") + 1] || "dist/output.css";

// Build glob pattern from config
const fileExtensions = getFileExtensionsFromConfig();
const srcGlob = `src/**/*.${
  fileExtensions.length > 1
    ? `{${fileExtensions.join(",")}}`
    : fileExtensions[0]
}`;

// Utility: Extract class names from non-CSS files (html/jsx/tsx/etc)
function extractClassNames(content: string): string[] {
  // Match class="...", className="...", :class="...", etc.
  const classRegex =
    /(?:class|className|:class)\s*=\s*["'`{[]([^"'`}]+)["'`}]/g;
  const matches = [];
  let match;
  while ((match = classRegex.exec(content))) {
    matches.push(...match[1].split(/\s+/).filter(Boolean));
  }
  return matches.filter((cls) => !cls.startsWith("...")); // Exclude RelaxCSS classes
}

// Utility: Extract @apply classes from CSS
function extractApplyClasses(content: string): string[] {
  const applyRegex = /@apply\s+([^;]+);/g;
  const matches = [];
  let match;
  while ((match = applyRegex.exec(content))) {
    matches.push(...match[1].split(/\s+/).filter(Boolean));
  }
  return matches;
}

function processFiles() {
  const files = glob.sync(srcGlob);

  let combinedCss = "";
  let foundClasses = new Set<string>();
  let classNameFoundClasses = new Set<string>();


  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase().replace(/^\./, "");
    const content = fs.readFileSync(file, "utf8");

    if (ext === "css") {
      combinedCss += content + "\n";
      extractApplyClasses(content).forEach((cls) => {
        foundClasses.add(cls);
      });
    } else if (fileExtensions.includes(ext)) {
      extractClassNames(content).forEach((cls) => {
        foundClasses.add(cls);
        classNameFoundClasses.add(cls);
      });
    }
  });

  // compile the found classes
  const foundClassesCss =
    "" +
    Array.from(classNameFoundClasses)
      .map((cls) => {
        /* 
hover:bg-blue-700  => 
          .hover\:bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(29, 78, 216, var(--tw-bg-opacity));
}
          */
        // manage the pseudo-classes, get the theme screen for all pseudo-classes available
        const variantRule = generateTailwindVariantRule(cls, defaultConfig);
        if (variantRule) {
          return variantRule;
        }
        return `.${cls} { @apply ${cls}; }`;
      })
      .join("\n");

  // combinedCss += foundClassesCss;

  // Do NOT generate a "JIT" CSS file for found classes (handled by plugin)
  // Only pass the combinedCss (with @apply) to PostCSS
  const finalCss = combinedCss + "\n" + foundClassesCss;

  postcss([relaxcss()])
    .process(finalCss, { from: undefined })
    .then((result) => {
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, result.css, "utf8");
      console.log(
        `[RelaxCSS] Rebuilt: ${outFile} (${new Date().toLocaleTimeString()})`
      );
    })
    .catch((err) => {
      console.error("[RelaxCSS] Build error:", err);
    });
}

// Initial build
processFiles();

// Watch for changes
const watcher = chokidar.watch(srcGlob, { ignoreInitial: true });
watcher.on("all", (event, filePath) => {
  console.log(`[RelaxCSS] Detected ${event} in ${filePath}. Rebuilding...`);
  processFiles();
});

function generateTailwindVariantRule(
  cls: string,
  defaultConfig: any
): string | null {
  // Handle combined responsive + pseudo (e.g., md:hover:bg-blue-500)
  for (const screen of defaultConfig.variants.responsive) {
    if (cls.startsWith(`${screen}:`)) {
      const remaining = cls.slice(screen.length + 1); // remove screen:
      for (const pseudo of defaultConfig.variants.pseudoClasses) {
        if (remaining.startsWith(`${pseudo}:`)) {
          const utility = remaining.slice(pseudo.length + 1); // remove pseudo:
          return `@media (min-width: ${defaultConfig.theme.screens[screen]}) {
  .${screen}\\:${pseudo}\\:${utility}:${pseudo} {
    @apply ${utility};
  }
}`;
        }
      }
      // Only responsive
      return `@media (min-width: ${defaultConfig.theme.screens[screen]}) {
  .${screen}\\:${remaining} {
    @apply ${remaining};
  }
}`;
    }
  }

  // Only pseudo
  for (const pseudo of defaultConfig.variants.pseudoClasses) {
    if (cls.startsWith(`${pseudo}:`)) {
      const utility = cls.slice(pseudo.length + 1); // remove pseudo:
      return `.${pseudo}\\:${utility}:${pseudo} {
  @apply ${utility};
}`;
    }
  }

  return null;
}
