import * as Device from "expo-device";

const SPACE_SCALE = 1.33;
const FONT_SCALE = 1.2;

const isIpad = Device.osName === "iPadOS";

export const spaceScale = (value: number) =>
    isIpad ? Math.round(value * SPACE_SCALE) : value;

const fontScale = (size: number) =>
    isIpad ? Math.round(size * FONT_SCALE) : size;

/* =======================
   SHARED TOKENS
   ======================= */

const base = {
    space2: spaceScale(2),
    space4: spaceScale(4),
    space8: spaceScale(8),
    space12: spaceScale(12),
    space16: spaceScale(16),
    space20: spaceScale(20),
    space24: spaceScale(24),
    space32: spaceScale(32),

    fontSize10: fontScale(10),
    fontSize12: fontScale(12),
    fontSize14: fontScale(14),
    fontSize16: fontScale(16),
    fontSize18: fontScale(18),
    fontSize20: fontScale(20),
    fontSize24: fontScale(24),
    fontSize28: fontScale(28),
    fontSize32: fontScale(32),
    fontSize36: fontScale(36),
    fontSize42: fontScale(42),

    fontFamilyLight: "Montserrat-Light",
    fontFamilyLightItalic: "Montserrat-LightItalic",

    fontFamily: "Montserrat-Medium",
    fontFamilyItalic: "Montserrat-MediumItalic",

    fontFamilySemiBold: "Montserrat-SemiBold",
    fontFamilySemiBoldItalic: "Montserrat-SemiBoldItalic",

    fontFamilyBold: "Montserrat-Bold",
    fontFamilyBoldItalic: "Montserrat-BoldItalic",

    borderRadius4: 4,
    borderRadius6: 6,
    borderRadius8: 8,
    borderRadius10: 10,
    borderRadius12: 12,
    borderRadius16: 16,
    borderRadius20: 20,
    borderRadius24: 24,
    borderRadius32: 32,
    borderRadius40: 40,

    dropShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.08)",
        medium: "0 4px 12px rgba(0,0,0,0.12)",
    },
};

/* =======================
   LIGHT THEME
   ======================= */

export const lightTheme = {
    ...base,

    colorRed: "#ED4956",
    colorWhite: "#FFFFFF",
    colorBlack: "#000000",
    colorGrey: "#8E8E8E",

    lightActiveContent: "rgba(0,0,0,0.06)",

    color: {
        brand: "#0064e0",

        text: "#000000",
        textSecondary: "#737373",
        textTertiary: "rgba(0,0,0,0.55)",

        background: "#FFFFFF",
        backgroundSecondary: "#FFFFFF",
        backgroundElevated: "#FFFFFF",
        backgroundInteractive: "rgba(0,0,0,0.04)",

        border: "#DBDBDB",
        divider: "rgba(0,0,0,0.08)",

        danger: "#ED4956",
        transparent: "rgba(255,255,255,0)",
    },
};

/* =======================
   DARK THEME
   ======================= */

export const darkTheme = {
    ...base,

    colorRed: "#F28B82",
    colorWhite: "#FFFFFF",
    colorBlack: "#000000",
    colorGrey: "#8E8E8E",

    darkActiveContent: "rgba(255,255,255,0.22)",

    color: {
        brand: "#0064e0",

        text: "#FFFFFF",
        textSecondary: "#A8A8A8",
        textTertiary: "rgba(255,255,255,0.55)",

        background: "#0c151b",
        backgroundSecondary: "#121F26",
        backgroundElevated: "#16242C",
        backgroundInteractive: "rgba(255,255,255,0.06)",

        border: "#333333",
        divider: "rgba(255,255,255,0.08)",

        danger: "#F28B82",
        transparent: "rgba(0,0,0,0)",
    },
};
