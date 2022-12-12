import {SorterComparator, SorterSortingStep} from "../../types/models/sorter";
import {SortingAlgorithms, SortingSpeedPivot} from "../models/constants";
import BubbleSorter from "../models/in-app/sorter/types/bubble-sorter";
import {AppThunkDispatch, ISorterArrayValue} from "../../types/ui/redux";
import SorterReduxSlice from "../../ui/redux/slices/sorter/_slice";
import SelectionSorter from "../models/in-app/sorter/types/selection-sorter";
import InsertionSorter from "../models/in-app/sorter/types/insertion-sorter";
import MergeSorter from "../models/in-app/sorter/types/merge-sorter";
import {v4 as UUIDv4} from 'uuid';


/**
 * This service contains the logic for the sorters of the application and their utility methods.
 */
class SortingService {

    /**
     * Generates a random array of numbers with the provided length.
     *
     * @param length        the length of the generated array.
     * @param minVal        the minimum value of the array entries
     * @param maxVal        the maximum value of the array entries.
     */
    public static generateArrayOfNumbers(
        length: number,
        minVal: number,
        maxVal: number,
    ): Array<number> {
        if (minVal > maxVal) {
            let temp = minVal;
            minVal = maxVal
            maxVal = temp;
        }
        return this.generateRandomArray(
            length,
            () => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
        );
    }

    /**
     * Generates a random array of ISorterArrayValue objects with the provided length.
     *
     * @param length        the length of the generated array.
     * @param minVal        the minimum value of the array entries
     * @param maxVal        the maximum value of the array entries.
     */
    public static generateArrayOfSorterArrayValue(
        length: number,
        minVal: number,
        maxVal: number,
    ): Array<ISorterArrayValue> {
        if (minVal > maxVal) {
            let temp = minVal;
            minVal = maxVal
            maxVal = temp;
        }
        return this.generateRandomArray(
            length,
            () => ({
                value: Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal,
                id: `ID-${UUIDv4()}`,
            })
        );
    }

    /**
     * Generates a random array with the provided length.
     *
     * @param length                    the length of the generated array.
     * @param randomEntityGenerator     the method for creating an entity.
     * @private
     */
    private static generateRandomArray<T = number>(
        length: number,
        randomEntityGenerator: (index: number) => T,
    ): Array<T> {
        return Array(length)
            .fill(null)
            .map((_, index) => randomEntityGenerator(index));
    }


    /**
     * Compares two numbers to output a flag number determining if [a] is greater, smaller, or equal to [b].
     *
     * @param a the first number
     * @param b the second number
     */
    public static numComparator(a: number, b: number): -1 | 1 | 0 {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    }

    /**
     * Compares two numbers to output a flag number determining if [a] is greater, smaller, or equal to [b].
     *
     * @param a the first number
     * @param b the second number
     */
    public static sorterArrayValueComparator(a: ISorterArrayValue, b: ISorterArrayValue): -1 | 1 | 0 {
        if (a.value > b.value)
            return 1;
        if (a.value < b.value)
            return -1;
        return 0;
    }

    /**
     * Fetches the steps needed to sort an array for the provided algorithm and array.
     *
     * @param algorithm     the sorting algorithm to be used for the sorting
     * @param array         the array to be sorted
     * @param comparator    the comparator of the array entries.
     */
    public static getSortingSteps<T>(
        algorithm: SortingAlgorithms,
        array: Array<T>,
        comparator: SorterComparator<T>
    ): Array<SorterSortingStep<T>> {
        switch (algorithm) {
            case SortingAlgorithms.selectionSort:
                return new SelectionSorter<T>().sort(array, comparator);
            case SortingAlgorithms.bubbleSort:
                return new BubbleSorter<T>().sort(array, comparator);
            case SortingAlgorithms.insertionSort:
                return new InsertionSorter<T>().sort(array, comparator);
            case SortingAlgorithms.mergeSort:
                return new MergeSorter<T>().sort(array, comparator);
        }
    }

    /**
     *
     * @param dispatch
     * @param isMounted
     * @param steps
     * @param sortingSpeed
     */
    public static async sort<T>(
        dispatch: AppThunkDispatch,
        isMounted: () => boolean,
        steps: Array<SorterSortingStep<T>>,
        sortingSpeed: number,
    ): Promise<void> {
        const step = steps.shift();
        if (!step) {
            await dispatch(SorterReduxSlice.actions.setSorting(false));
            return;
        }
        if (step.selectedIndices)
            await dispatch(SorterReduxSlice.actions.selectIndices(step.selectedIndices));
        if (step.swappingIndices)
            await dispatch(SorterReduxSlice.actions.swapIndices(step.swappingIndices));
        if (step.sortedIndices)
            await dispatch(SorterReduxSlice.actions.addSortedIndices(step.sortedIndices));
        if (step.pivotIndices)
            await dispatch(SorterReduxSlice.actions.setPivotalIndices(step.pivotIndices));
        if (step.setValueInIndex)
            await dispatch(SorterReduxSlice.actions.replaceIndices(step.setValueInIndex as SorterSortingStep<ISorterArrayValue>['setValueInIndex']));
        setTimeout(
            () => isMounted() && this.sort(dispatch, isMounted, steps, sortingSpeed),
            SortingSpeedPivot / Math.max(sortingSpeed, 1)
        )
    }

}

export default SortingService;
