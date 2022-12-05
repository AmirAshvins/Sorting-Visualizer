import {DarkModeOutlined, LightMode} from "@mui/icons-material";
import {IconButton, IconButtonProps, useColorScheme} from "@mui/joy";
import {useCallback, useMemo} from "react";


const ColorThemeButton = (props: Omit<IconButtonProps, 'onClick' | 'children'>) => {
    const {mode, setMode, systemMode} = useColorScheme();

    /**
     * Switches the current mode of the color theme.
     */
    const switchMode = useCallback(() => {
        switch (mode) {
            case 'light':
                return setMode('dark')
            case 'dark':
                return setMode('light')
            case 'system':
            default:
                break;
        }
    }, [mode, setMode])

    /**
     * The Icon associated with the current mode of the color theme.
     */
    const modeIcon = useMemo(() => {
        switch (mode) {
            case 'light':
                return <LightMode/>
            case 'dark':
                return <DarkModeOutlined/>
            case 'system':
                switch (systemMode) {
                    case 'light':
                        return <LightMode/>
                    case 'dark':
                        return <DarkModeOutlined/>
                    default:
                        return null;
                }
            default:
                return null;
        }
    }, [mode, systemMode])

    // in case the icon returns null, that means the mode or systemMode are undefined.
    if (modeIcon === null) {
        return null;
    }
    return (
        <>
            <IconButton
                onClick={switchMode}
                {...props}
            >
                {modeIcon}
            </IconButton>
        </>
    );
}


export default ColorThemeButton;
