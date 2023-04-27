import { alpha } from "@mui/material/styles";
import { error, indigo, info, neutral, success, warning } from "./colors";

export function createPalette({ mode = "dark" }) {
  return mode === "dark"
    ? {
        action: {
          active: neutral[400],
          disabled: alpha(neutral[50], 0.38),
          disabledBackground: alpha(neutral[50], 0.12),
          focus: alpha(neutral[50], 0.16),
          hover: alpha(neutral[50], 0.04),
          selected: alpha(neutral[50], 0.12),
        },
        background: {
          default: "#0B0F19",
          paper: "#121927",
          common: "#1C2536",
        },
        divider: "#2D3748",
        error,
        info,
        mode: "dark",
        neutral,
        primary: indigo,
        success,
        text: {
          primary: neutral[100],
          secondary: neutral[200],
          menu: neutral[300],
          card: neutral[300],
          disabled: alpha(neutral[50], 0.38),
        },
        warning,
      }
    : {
        action: {
          active: neutral[500],
          disabled: alpha(neutral[900], 0.38),
          disabledBackground: alpha(neutral[900], 0.12),
          focus: alpha(neutral[900], 0.16),
          hover: alpha(neutral[900], 0.04),
          selected: alpha(neutral[900], 0.12),
        },
        background: {
          default: "#F8F9FA",
          paper: "#F8F9FA",
          common: "#FFFFFF",
          shadow: alpha(neutral[900], 0.8),
        },
        divider: neutral[200],
        error,
        info,
        mode: "light",
        neutral,
        primary: indigo,
        success,
        text: {
          primary: neutral[900],
          secondary: neutral[700],
          menu: neutral[500],
          card: neutral[400],
          disabled: alpha(neutral[900], 0.38),
        },
        warning,
      };
}
