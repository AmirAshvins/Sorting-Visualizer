export interface IAppSpecificPalette {
    scrollbar: {
        'track-color': string,
        'thumb-color': string,
    },
}

export interface IAppSpecificThemeScales {
}


declare module '@mui/joy/styles' {
    interface Palette {
        'app-specific': IAppSpecificPalette,
    }

    interface PaletteOptions {
        'app-specific'?: IAppSpecificPalette,
    }
}
