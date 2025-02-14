import { createSelector } from "@reduxjs/toolkit";

interface RootState {
    theme: ThemeState;
}

interface ThemeState {
    theme: string;
}

export const selectTheme = (state: RootState): ThemeState => state.theme;

export const selectThemeMode = createSelector(selectTheme, (theme) => theme.theme);