import joyTheme from "./joy";
import {deepmerge} from "@mui/utils";
import muiTheme from "./mui";

/**
 * The default theme of the application.
 */
const theme = deepmerge(muiTheme, joyTheme);

export default theme;

