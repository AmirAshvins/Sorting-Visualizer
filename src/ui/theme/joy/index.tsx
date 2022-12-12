import {extendTheme as extendJoyTheme} from "@mui/joy/styles";
import {AppFontFamilyTheme, DarkAppSpecificPaletteTheme, LightAppSpecificPaletteTheme, ThemePrefix, withThemePrefix} from "../shared";
import {optionClasses, selectClasses} from "@mui/joy";
import {KeyboardArrowDown} from "@mui/icons-material";


const joyTheme = extendJoyTheme({
    cssVarPrefix: ThemePrefix,
    colorSchemes: {
        light: {
            palette: {
                'app-specific': LightAppSpecificPaletteTheme,
            },
        },
        dark: {
            palette: {
                'app-specific': DarkAppSpecificPaletteTheme,
            },
        },
    },
    fontFamily: AppFontFamilyTheme,
    radius: {
        sm: '3px',
        md: '5px',
    },
    components: {
        JoyButton: {
            defaultProps: {
                color: 'primary',
                size: 'sm',
            },
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...(ownerState.size === 'sm' && {})
                }),
            },
        },
        JoyIconButton: {
            defaultProps: {
                color: 'primary',
                variant: 'outlined',
                size: 'sm',
            },
        },
        JoyTypography: {
            defaultProps: {
                level: "body3",
            },
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...(ownerState.level === 'body3' && {
                        color: theme.typography.body2.color,
                        fontWeight: theme.fontWeight.lg,
                        fontSize: theme.fontSize.xs,
                    })
                }),
            },
        },
        JoySelect: {
            defaultProps: {
                size: 'sm',
                variant: 'outlined',
                color: 'primary',
                indicator: <KeyboardArrowDown/>,
            },
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                        },
                    },
                    ...(ownerState.variant === 'outlined' && {
                        backgroundColor: 'transparent',
                        [`& .${selectClasses.button}`]: {
                            fontSize: theme.fontSize.xs,
                            fontWeight: theme.fontWeight.lg,
                        },

                        [`&:hover`]: {
                            boxShadow: `inset 0 0 0 1px ${theme.vars.palette.divider}`,
                            [`& .${selectClasses.startDecorator}`]: {
                                color: theme.vars.palette.text.primary,
                            },
                        },
                        [`&.${selectClasses.expanded}`]: {
                            boxShadow: `inset 0 0 0 2px ${theme.vars.palette.primary['400']}`,
                        },
                        [`&:hover, &.${selectClasses.expanded}`]: {
                            [`${withThemePrefix}palette-${ownerState.color}-${ownerState.variant}HoverBg`]: 'transparent',
                        },
                        [`&.${selectClasses.disabled}`]: {
                            color: `var(${withThemePrefix}palette-${ownerState.color}-${ownerState.variant}Color)`,
                            backgroundColor: 'transparent',
                            [`& .${selectClasses.indicator}`]: {
                                visibility: 'hidden',
                            },
                        },
                    })
                }),
                listbox: ({ownerState, theme}) => ({
                    [`& .${optionClasses.root}`]: {
                        fontSize: theme.fontSize.xs,
                        fontWeight: theme.fontWeight.lg,
                        marginInline: theme.spacing(1),
                        [`${withThemePrefix}List-item-radius`]: theme.radius.sm,
                        [`&.${optionClasses.highlighted}, &.${optionClasses.selected}`]: {
                            backgroundColor: 'transparent !important',
                        },
                    },
                }),
            },
        },
        JoySlider: {
            defaultProps: {
                variant: 'solid',
                orientation: 'horizontal',
            },
        },
        JoyDivider: {
            defaultProps: {
                orientation: 'vertical',
            },
        },
    },
})

export default joyTheme;
