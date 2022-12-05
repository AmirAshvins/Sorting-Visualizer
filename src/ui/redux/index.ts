import {configureStore as toolkitConfigureStore} from '@reduxjs/toolkit'
import EnvService from "../../core/services/env-service";
import ReduxRootReducer from "./root-reducer";

/**
 * Configures the Redux store of the application and returns the configured store.
 * * enables hot module reloading (HMR) for the redux reducers as well.
 */
const configureStore = () => {
    const store = toolkitConfigureStore({
        reducer: ReduxRootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [],
                ignoredPaths: [],
            }
        }),
    })

    if (EnvService.isDevelopment) {
        module.hot?.accept('./root-reducer', () => store.replaceReducer(ReduxRootReducer))
    }
    return store;
}

const ReduxStore = configureStore();

export {default as ReduxActions} from './actions';
export default ReduxStore;
