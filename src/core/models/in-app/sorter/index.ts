import {SorterComparator, SorterSortingStep} from "../../../../types/models/sorter";

/**
 * Houses the logic for the sorters of the application.
 */
interface Sorter<T> {

    /**
     * Outputs the steps required to perform the sorting through a sorter.
     * @param array         the array to be sorted.
     * @param comparator    The comparator to be used to compare the entities of the provided array against each other.
     */
    sort(array: Array<T>, comparator: SorterComparator<T>): Array<SorterSortingStep<T>>;
}

export default Sorter;
