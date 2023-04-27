import { createTheme } from "@/theme";
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

const setCKColor = (mode) => {
  const isDark = mode === "dark";
  let root = document.querySelector(":root");
  if (isDark) {
    root.style.setProperty("--ck-color-base-background", "#2d3748");
    root.style.setProperty("--ck-color-button-default-hover-background", "#2d3748");
    root.style.setProperty("--ck-focus-outer-shadow", "#2d3748");
    root.style.setProperty("--ck-color-base-active", "#605BFF");
    root.style.setProperty("--ck-color-button-default-active-background", "#605BFF");
    root.style.setProperty("--ck-color-button-on-hover-background", "#605BFF");
    root.style.setProperty("--ck-color-button-on-background", "#605BFF");
    root.style.setProperty("--ck-color-list-button-on-background", "#605BFF");
    root.style.setProperty("--ck-color-list-button-on-background-focus", "#605BFF");
    root.style.setProperty("--ck-focus-ring", "1px" + " solid " + "#605BFF");
    root.style.setProperty("--ck-color-list-button-on-text", "#F8F9FA");
    root.style.setProperty("--ck-color-button-on-color", "#F8F9FA");
    root.style.setProperty("--ck-color-image-caption-background", "#F8F9FA");
    root.style.setProperty("--ck-color-image-caption-text", "#F8F9FA");
    root.style.setProperty("--ck-color-text", "#F8F9FA");
    root.style.setProperty("--ck-color-engine-placeholder-text", "#F8F9FA");
    root.style.setProperty("--ck-color-tooltip-background", "#F8F9FA");
    root.style.setProperty("--ck-color-button-on-active-background", "transparent");
    root.style.setProperty("--ck-color-dropdown-panel-border", "transparent");
  } else {
    root.style.removeProperty("--ck-color-base-background");
    root.style.removeProperty("--ck-color-button-default-active-background");
    root.style.removeProperty("--ck-color-button-on-hover-background");
    root.style.removeProperty("--ck-color-button-default-hover-background");
    root.style.removeProperty("--ck-color-button-on-color");
    root.style.removeProperty("--ck-color-button-on-background");
    root.style.removeProperty("--ck-color-list-button-on-background");
    root.style.removeProperty("--ck-color-list-button-on-background-focus");
    root.style.removeProperty("--ck-color-list-button-on-text");
    root.style.removeProperty("--ck-color-tooltip-background");
    root.style.removeProperty("--ck-color-image-caption-background");
    root.style.removeProperty("--ck-color-image-caption-text");
    root.style.removeProperty("--ck-color-text");
    root.style.removeProperty("--ck-color-button-on-active-background");
    root.style.removeProperty("--ck-color-dropdown-panel-border");
  }
};

function themeReducer(state, action) {
  switch (action.type) {
    case "SET_MODE": {
      setCKColor(action.mode);
      return { mode: action.mode };
    }
    case "TOGGLE_MODE": {
      const nextMode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("mode", nextMode);
      setCKColor(nextMode);
      return { mode: nextMode };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, { mode: "dark" });
  const value = { state, dispatch };

  const theme = useMemo(() => createTheme({ mode: state.mode }), [state.mode]);

  useEffect(() => {
    const mode = localStorage.getItem("mode") || "dark";
    dispatch({ type: "SET_MODE", mode });
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };
