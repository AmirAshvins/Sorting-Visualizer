import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    DefaultArrayLength,
    DefaultSortingSpeed,
    MaxArrayLength,
    MaxArrayValue,
    MaxSortingSpeed,
    MinArrayLength,
    MinArrayValue,
    MinSortingSpeed
} from "../../../../core/models/constants";
import SortingService from "../../../../core/services/sorting-service";
import {ISorterReduxSliceState} from "../../../../types/ui/redux";
import {SorterSortingStep} from "../../../../types/models/sorter";

/**
 * The initial state of the sorter slice.
 */
const initialState: ISorterReduxSliceState = {
    arrayLength: DefaultArrayLength,
    sortingSpeed: DefaultSortingSpeed,
    maxArrayValue: MaxArrayValue,
    algorithm: undefined,
    sorting: false,
    array: [],
    selectedIndices: [],
    swappingIndices: [-1, -1],
    sortedIndices: [],
    pivotalIndices: [],
};

/**
 * The Redux state, action creators, types and reducers of the sorter slice.
 */
const SorterReduxSlice = createSlice({
    name: 'sorter',
    initialState,
    reducers: {
        /**
         * Generates a random array of numbers and sets it as the array of the state.
         * @param state
         */
        generateArray: (state) => {
            state.array = SortingService.generateArrayOfNumbers(state.arrayLength, MinArrayValue, MaxArrayValue);
            state.maxArrayValue = Math.max(...state.array);
            state.sortedIndices = initialState.sortedIndices;
            return state;
        },
        /**
         * Sets the length of the array in the state.
         *
         * If the given length is not within the ArrayLength range, then changes the length to fit into the range by replacing it with
         * the closest bound.
         * @param state
         * @param action
         */
        setArrayLength: (state, action: PayloadAction<ISorterReduxSliceState['arrayLength']>) => {
            if (action.payload > MaxArrayLength)
                action.payload = MaxArrayLength;
            else if (action.payload < MinArrayLength)
                action.payload = MinArrayLength;
            state.arrayLength = action.payload;
            return state;
        },
        /**
         * Sets the sorting speed in the state.
         *
         * If the given speed is not within the SortingSpeed range, then changes the speed to fit into the range by replacing it
         * with the closest bound.
         * @param state
         * @param action
         */
        setSortingSpeed: (state, action: PayloadAction<ISorterReduxSliceState['sortingSpeed']>) => {
            if (action.payload > MaxSortingSpeed)
                action.payload = MaxSortingSpeed;
            else if (action.payload < MinSortingSpeed)
                action.payload = MinSortingSpeed;
            state.sortingSpeed = action.payload;
            return state;
        },
        /**
         * Sets the algorithm used for sorting of the array in the state.
         *
         * @param state
         * @param action
         */
        setSortingAlgorithm: (state, action: PayloadAction<ISorterReduxSliceState['algorithm']>) => {
            state.algorithm = action.payload;
            return state;
        },
        /**
         * Sets the sorting flag of the state.
         *
         * @param state
         * @param action
         */
        setSorting: (state, action: PayloadAction<ISorterReduxSliceState['sorting']>) => {
            state.selectedIndices = initialState.selectedIndices;
            state.swappingIndices = initialState.swappingIndices;
            state.pivotalIndices = initialState.pivotalIndices;
            if (action.payload) {
                // only reset the sorted indices when starting, so when we finish, everything is in sorted state.
                state.sortedIndices = initialState.sortedIndices;
            }
            state.sorting = action.payload;
            return state;
        },
        /**
         * Sets the selected indices of the state.
         *
         * @param state
         * @param action
         */
        selectIndices: (state, action: PayloadAction<ISorterReduxSliceState['selectedIndices']>) => {
            state.selectedIndices = action.payload;
            state.swappingIndices = initialState.swappingIndices;
            return state;
        },
        /**
         * Swaps the given indices of the array in the state.
         *
         * @param state
         * @param action
         */
        swapIndices: (state, action: PayloadAction<ISorterReduxSliceState['swappingIndices']>) => {
            state.swappingIndices = action.payload;
            [state.array[action.payload[0]], state.array[action.payload[1]]] = [state.array[action.payload[1]], state.array[action.payload[0]]];
            return state;
        },
        /**
         * Adds the following indices to the sorted indices of the array in the state.
         *
         * @param state
         * @param action
         */
        addSortedIndices: (state, action: PayloadAction<ISorterReduxSliceState['sortedIndices']>) => {
            state.sortedIndices = Array.from(new Set([...state.sortedIndices, ...action.payload]));
            return state;
        },
        /**
         * Sets the pivotal indecision of the state.
         *
         * @param state
         * @param action
         */
        setPivotalIndices: (state, action: PayloadAction<ISorterReduxSliceState['pivotalIndices']>) => {
            state.pivotalIndices = action.payload;
            return state;
        },
        /**
         * Places the value of the target index (payload[1]) in the source index (payload[0]) in the array.
         *
         * @param state
         * @param action
         */
        replaceIndices: (state, action: PayloadAction<SorterSortingStep<number>['setValueInIndex']>) => {
            state.swappingIndices = [
                action.payload![0],
                state.array.findIndex(e => e === action.payload![1])
            ];
            if (state.swappingIndices[0] === state.swappingIndices[1]) {
                state.swappingIndices = initialState.swappingIndices;
            }
            state.array[action.payload![0]] = action.payload![1];
            return state;
        }
    },
})


export default SorterReduxSlice;
