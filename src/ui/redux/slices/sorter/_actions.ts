import SorterReduxSlice from "./_slice";
import {AppThunkAction} from "../../../../types/ui/redux";
import SortingService from "../../../../core/services/sorting-service";
import {SortingAlgorithms} from "../../../../core/models/constants";

/**
 * Changes the length of the array for the sorter slice and then regenerates the array of that slice with the new array length.
 * @param arrayLength
 */
const changeArrayLength = (arrayLength: number): AppThunkAction => async (dispatch) => {
    await dispatch(SorterReduxSlice.actions.setArrayLength(arrayLength));
    await dispatch(SorterReduxSlice.actions.generateArray());
}

/**
 * Sorts the array of the sorter slice.
 * @param isMounted a callback for determining if the ui that dispatched this action is still mounted.
 */
const sort = (isMounted: () => boolean): AppThunkAction => async (dispatch, getState) => {
    await dispatch(SorterReduxSlice.actions.setSorting(true));
    const sorterState = getState().sorter;
    const sortingSteps = SortingService.getSortingSteps(
        sorterState.algorithm as SortingAlgorithms,
        sorterState.array,
        SortingService.numComparator
    );
    await SortingService.sort(
        dispatch,
        isMounted,
        sortingSteps,
        sorterState.sortingSpeed,
    );
}

/**
 * The actions available for the SorterSlice of the redux state.
 */
const SorterReduxSliceActions = {
    generateArray: SorterReduxSlice.actions.generateArray,
    setSortingAlgorithm: SorterReduxSlice.actions.setSortingAlgorithm,
    changeSortingSpeed: SorterReduxSlice.actions.setSortingSpeed,
    changeArrayLength,
    sort,
}

export default SorterReduxSliceActions;
