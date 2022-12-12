import Sorter from "../index";
import {SorterComparator, SorterSortingStep} from "../../../../../types/models/sorter";

/**
 * Houses the sorting logic for the Merge sorter.
 */
class MergeSorter<T> implements Sorter<T> {

    /**
     * Outputs the steps required to perform the Merge sort.
     *
     * The following steps are the core logic of Merge sort algorithm:
     * --------
     * 1. Find the middle point to divide the array into two halves:
     * 2. Call mergeSort for first half:
     * 3. Call mergeSort for second half:
     * 4. Merge the two halves sorted in steps 2 and 3:
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
        this.mergeSort(array, 0, array.length - 1, steps, comparator);
        steps.push({sortedIndices: Array(array.length).fill(0).map((_, i) => i)});
        return steps;
    }

    /**
     * Merge sorts the provided array with the given slice indices of that array.
     *
     * @param array         the array to be sorted.
     * @param left          the beginning of the array (starting index)
     * @param right         the end of the array (ending index)
     * @param steps         the steps array that needs to be filled as the [array] is being sorted.
     * @param comparator    The comparator to be used to compare the entities of the provided array against each other.
     */
    private mergeSort(
        array: Array<T>,
        left: number,
        right: number,
        steps: Array<SorterSortingStep<T>>,
        comparator: SorterComparator<T>,
    ) {
        if (left >= right) {
            return;
        }
        const mid = left + Number.parseInt(`${(right - left) / 2}`);
        this.mergeSort(array, left, mid, steps, comparator);
        this.mergeSort(array, mid + 1, right, steps, comparator);
        this.merge(array, left, mid, right, steps, comparator);
    }


    /**
     * Merges the provided array with the identifiers (indices) of the two subareas that need to be merged within the array.
     *
     * @param array         the array to be sorted.
     * @param left          the beginning of the array (starting index)
     * @param middle        the midpoint of the array (mid-index)
     * @param right         the end of the array (ending index)
     * @param steps         the steps array that needs to be filled as the [array] is being sorted.
     * @param comparator    The comparator to be used to compare the entities of the provided array against each other.
     */
    private merge(
        array: Array<T>,
        left: number,
        middle: number,
        right: number,
        steps: Array<SorterSortingStep<T>>,
        comparator: SorterComparator<T>,
    ) {
        const leftSubarrayLength = middle - left + 1;
        const rightSubarrayLength = right - middle;
        const leftSubarray = new Array(leftSubarrayLength);
        const rightSubarray = new Array(rightSubarrayLength);

        for (let i = 0; i < leftSubarrayLength; i++)
            leftSubarray[i] = array[left + i];
        for (let j = 0; j < rightSubarrayLength; j++)
            rightSubarray[j] = array[middle + 1 + j];

        let leftSubarrayIndex = 0;
        let rightSubarrayIndex = 0;
        let mergedSubarrayIndex = left;

        while (leftSubarrayIndex < leftSubarrayLength && rightSubarrayIndex < rightSubarrayLength) {
            steps.push({selectedIndices: [left + leftSubarrayIndex, middle + 1 + rightSubarrayIndex]});
            if (comparator(leftSubarray[leftSubarrayIndex], rightSubarray[rightSubarrayIndex]) <= 0) {
                steps.push({setValueInIndex: [mergedSubarrayIndex, leftSubarray[leftSubarrayIndex]]});
                array[mergedSubarrayIndex] = leftSubarray[leftSubarrayIndex];
                leftSubarrayIndex++;
            } else {
                steps.push({setValueInIndex: [mergedSubarrayIndex, rightSubarray[rightSubarrayIndex]]});
                array[mergedSubarrayIndex] = rightSubarray[rightSubarrayIndex];
                rightSubarrayIndex++;
            }
            mergedSubarrayIndex++;
        }

        while (leftSubarrayIndex < leftSubarrayLength) {
            steps.push({
                selectedIndices: [left + leftSubarrayIndex, middle + 1 + rightSubarrayIndex],
                setValueInIndex: [mergedSubarrayIndex, leftSubarray[leftSubarrayIndex]]
            });
            array[mergedSubarrayIndex] = leftSubarray[leftSubarrayIndex];
            leftSubarrayIndex++;
            mergedSubarrayIndex++;
        }

        while (rightSubarrayIndex < rightSubarrayLength) {
            steps.push({
                selectedIndices: [left + leftSubarrayIndex, middle + 1 + rightSubarrayIndex],
                setValueInIndex: [mergedSubarrayIndex, rightSubarray[rightSubarrayIndex]]
            });
            array[mergedSubarrayIndex] = rightSubarray[rightSubarrayIndex];
            rightSubarrayIndex++;
            mergedSubarrayIndex++;
        }
    }
}

export default MergeSorter;
