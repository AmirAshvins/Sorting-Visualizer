import Sorter from "../index";
import {SorterComparator, SorterSortingStep} from "../../../../../types/models/sorter";

/**
 * Houses the sorting logic for the Bubble sorter.
 */
class BubbleSorter<T> implements Sorter<T> {

    /**
     * Outputs the steps required to perform the bubble sort.
     *
     * The following steps are the core logic of bubble sort algorithm:
     * ----
     * 1. run a nested for loop to traverse the input array using two variables i and j, such that 0 ≤ i < n-1 and 0 ≤ j < n-i-1.
     * 2. if arr[j] is greater than arr[j+1] then swap these adjacent elements, else move on.
     * 3. if no swaps happened for the j loop, the array is already sorted.
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
            let swaps = 0;
            for (let j = 0; j < array.length - i - 1; j++) {
                steps.push({selectedIndices: [j, j + 1]});
                if (comparator(array[j], array[j + 1]) === 1) {
                    [array[j + 1], array[j]] = [array[j], array[j + 1]];
                    steps.push({swappingIndices: [j, j + 1]});
                    swaps++;
                }
            }
            if (swaps === 0) {
                // the array is already sorted, no need to loop again.
                steps.push({sortedIndices: Array(array.length).fill(0).map((_, i) => i)});
                break;
            }
            steps.push({sortedIndices: [array.length - 1 - i]});
        }
        return steps;
    }

}

export default BubbleSorter;
