import Sorter from "../index";
import {SorterComparator, SorterSortingStep} from "../../../../../types/models/sorter";

/**
 * Houses the sorting logic for the Selection sorter.
 */
class SelectionSorter<T> implements Sorter<T> {

    /**
     * Outputs the steps required to perform the Selection sort.
     *
     * The following steps are the core logic of Selection sort algorithm:
     * --------
     * 1. initialize minimum value (minimum-index) to location 0.
     * 2. traverse the array to find the minimum element in the array.
     * 3. while traversing if any element smaller than minimum-index is found then mark that value as the nw minimum value.
     * 4. then, increment minimum-index to point to the next element.
     * 5. repeat until the array is sorted.
     *
     * @param _array        the array to be sorted.
     * @param comparator    The comparator to be used to compare the entities of the provided array against each other.
     */
    sort(_array: Array<T>, comparator: SorterComparator<T>): Array<SorterSortingStep<T>> {
        const steps: Array<SorterSortingStep<T>> = [];
        const array = Array.from(_array);
        // array does not need sorting
        if (array.length < 2) {
            return steps;
        }
        for (let i = 0; i < array.length; i++) {
            let minIndex = i;
            steps.push({pivotIndices: [minIndex, i]});
            for (let j = i; j < array.length; j++) {
                steps.push({selectedIndices: [j]});
                if (comparator(array[minIndex], array[j]) === 1) {
                    minIndex = j;
                    steps.push({pivotIndices: [minIndex, i]});
                }
            }
            if (minIndex !== i) {
                // swaps needs to happen as the min index has changed.
                [array[minIndex], array[i]] = [array[i], array[minIndex]];
                steps.push({swappingIndices: [i, minIndex]});
            }
            steps.push({sortedIndices: [i]});
        }
        return steps;
    }

}

export default SelectionSorter;
