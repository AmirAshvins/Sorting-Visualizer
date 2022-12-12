import {useMemo} from "react";
import {Typography} from "@mui/joy";
import classnames from "classnames";
import {useAppSelector} from "../../../redux";
import {ISorterArrayValue} from "../../../../types/ui/redux";

const SortingViewContent = () => {
    const array = useAppSelector(state => state.sorter.array);
    const showRectValue = useMemo(() => array.length <= 20, [array.length])

    return (
        <>
            <div className={'sorting-view-content'}>
                <div
                    className={'sorting-view-content-container'}
                    style={{'--rects-num': array.length}}
                >
                    {
                        array.map((value, index) => (
                            <SortingViewContentRect
                                key={`${value.value}-${index}`}
                                showValue={showRectValue}
                                value={value}
                                index={index}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
}


interface ISortingViewContentRectProps {
    showValue: boolean,
    value: ISorterArrayValue,
    index: number,
}

const SortingViewContentRect = ({
                                    showValue,
                                    value,
                                    index,
                                }: ISortingViewContentRectProps) => {
    const pivot = useAppSelector(state => state.sorter.pivotalIndices.includes(index));
    const selected = useAppSelector(state => state.sorter.selectedIndices.includes(index));
    const swapped = useAppSelector(state => state.sorter.swappingIndices.includes(index));
    const sorted = useAppSelector(state => state.sorter.sortedIndices.includes(index));
    const maxValue = useAppSelector(state => state.sorter.maxArrayValue);

    // range should be between 10 and 100, so we get value between 0 and 90 then add 10
    const valuePercentage = useMemo(() => (value.value / maxValue) * 90 + 10, [maxValue, value.value]);

    const rectClassName = useMemo(() => {
        if (sorted)
            return 'sorted';
        if (swapped)
            return 'swapped';
        if (pivot)
            return 'pivot';
        if (selected)
            return 'selected';
        return '';
    }, [sorted, swapped, pivot, selected])

    return useMemo(() =>
            <>
                <div
                    style={{
                        '--rect-value': valuePercentage,
                    }}
                    className={'sorting-view-content-rect-container'}>
                    <div className={classnames('sorting-view-content-rect', rectClassName)}>
                        <Typography
                            className={classnames(
                                'sorting-view-content-rect-value',
                                {'show': showValue}
                            )}>
                            {value.value}
                        </Typography>
                    </div>
                </div>
            </>,
        [showValue, value.value, value.id, valuePercentage, rectClassName]);
}


export default SortingViewContent;
