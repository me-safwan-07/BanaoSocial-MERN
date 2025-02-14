import { createSelector } from "@reduxjs/toolkit";

export const selectTheme = (state) => state.theme;

export const selectThemeMode = createSelector(selectTheme, (theme) => theme.theme);