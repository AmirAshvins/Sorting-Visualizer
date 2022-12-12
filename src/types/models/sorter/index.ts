export type SorterComparator<T> = (a: T, b: T) => 1 | -1 | 0;


export interface SorterSortingStep<T> {
    selectedIndices?: Array<number>,
    setValueInIndex?: [number, T],
    swappingIndices?: [number, number],
    sortedIndices?: Array<number>,
    pivotIndices?: Array<number>,
}
