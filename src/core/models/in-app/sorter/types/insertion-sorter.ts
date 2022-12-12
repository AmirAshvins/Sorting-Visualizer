import Sorter from "../index";
import {SorterComparator, SorterSortingStep} from "../../../../../types/models/sorter";

/**
 * Houses the sorting logic for the Insertion sorter.
 */
class InsertionSorter<T> implements Sorter<T> {

    /**
     * Outputs the steps required to perform the Insertion sort.
     *
     * The following steps are the core logic of Insertion sort algorithm:
     * --------
     * 1. iterate from array[1] to array[N] over the array.
     * 2. compare the current element (key) to its predecessor.
     * 3. if the key element is smaller than its predecessor, compare it to the elements before. Move the greater elements one position up
     *      to make space for the swapped element.
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

        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let j = i - 1;
            steps.push({selectedIndices: [i, j]});
            while (j >= 0 && comparator(array[j], key) === 1) {
                steps.push({
                    selectedIndices: [j, j + 1],
                    setValueInIndex: [j + 1, array[j]],
                });
                array[j + 1] = array[j];
                j--;
            }
            steps.push({setValueInIndex: [j + 1, key]});
            array[j + 1] = key;
        }
        steps.push({sortedIndices: Array(array.length).fill(0).map((_, i) => i)});
        return steps;
    }

}

export default InsertionSorter;
