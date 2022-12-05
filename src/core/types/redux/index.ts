import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import ReduxStore from "../../../ui/redux";

export type RootReduxState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootReduxState> = useSelector;
