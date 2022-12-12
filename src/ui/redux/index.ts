import {combineReducers, configureStore as toolkitConfigureStore} from '@reduxjs/toolkit'
import EnvService from "../../core/services/env-service";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootReduxState} from "../../types/ui/redux";
import {SorterReduxSlice, SorterReduxSliceActions} from "./slices/sorter";


/**
 * The Actions of the Redux Store state.
 */
export const ReduxActions = {
    [SorterReduxSlice.name]: SorterReduxSliceActions,
}

/**
 * The Root Reducer of the Redux Store state.
 */
const ReduxRootReducer = combineReducers({
    [SorterReduxSlice.name]: SorterReduxSlice.reducer,
});

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
        module.hot?.accept('./index.ts', () => store.replaceReducer(ReduxRootReducer))
    }
    return store;
}


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootReduxState> = useSelector;

const ReduxStore = configureStore();
export default ReduxStore;
