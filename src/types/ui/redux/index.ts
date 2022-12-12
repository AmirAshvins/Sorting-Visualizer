import ReduxStore from "../../../ui/redux";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {SortingAlgorithms} from "../../../core/models/constants";
import {ThunkDispatch} from "redux-thunk/src/types";

export type RootReduxState = ReturnType<typeof ReduxStore.getState>;

export type AppDispatch = typeof ReduxStore.dispatch;

export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootReduxState, unknown, AnyAction>
export type AppThunkDispatch<> = ThunkDispatch<RootReduxState, unknown, AnyAction>
export type AppThunkGetState = () => RootReduxState;


export type ISorterArrayValue = {
    value: number,
    id: string
};

export type ISorterReduxSliceState = {
    arrayLength: number,
    sortingSpeed: number,
    algorithm?: SortingAlgorithms,
    sorting: boolean,
    maxArrayValue: number,
    array: Array<ISorterArrayValue>,
    selectedIndices: Array<number>,
    swappingIndices: [number, number],
    sortedIndices: Array<number>,
    pivotalIndices: Array<number>,
}
