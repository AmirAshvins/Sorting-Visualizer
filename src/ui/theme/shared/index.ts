import {IAppSpecificPalette, IAppSpecificThemeScales} from "../../../types/ui/mui-joy";

/**
 * The prefix of the theme options.
 */
export const ThemePrefix = ''

/**
 * The prefix of the theme options with the --. Specific for the variable names.
 */
export const withThemePrefix = '--'.concat(!ThemePrefix.length ? '' : ThemePrefix.concat('-'));


export const LightAppSpecificPaletteTheme: IAppSpecificPalette = {
    scrollbar: {
        'track-color': 'transparent',
        'thumb-color': `var(${withThemePrefix}palette-neutral-400)`,
    },
}

export const DarkAppSpecificPaletteTheme: IAppSpecificPalette = {
    scrollbar: {
        'track-color': 'transparent',
        'thumb-color': `var(${withThemePrefix}palette-neutral-400)`,
    },
}

export const AppFontFamilyTheme = {
    body: `Montserrat, var(${withThemePrefix}fontFamily-fallback)`,
    display: `Montserrat, var(${withThemePrefix}fontFamily-fallback)`,
    code: `Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace`,
    fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
}

export const AppSpecificThemeScalesTheme: IAppSpecificThemeScales = {}
