import {Button, Divider, Option, Select, Slider, Typography} from "@mui/joy";
import {ReactComponent as Logo} from "../../../../assets/svgs/logo.svg";
import ColorThemeButton from "../../../components/color-theme-button";
import {useCallback, useLayoutEffect, useMemo} from "react";
import {MaxArrayLength, MaxSortingSpeed, MinArrayLength, MinSortingSpeed, SortingAlgorithms} from "../../../../core/models/constants";
import {Fade} from "@mui/material";
import {ReduxActions, useAppDispatch, useAppSelector} from "../../../redux";
import useIsMounted from "../../../hooks/use-is-mounted";

const SortingViewAppbar = () => {
    const algorithm = useAppSelector(state => state.sorter.algorithm ?? null);
    const sorting = useAppSelector(state => state.sorter.sorting);
    const arrayLength = useAppSelector(state => state.sorter.arrayLength);
    const sortingSpeed = useAppSelector(state => state.sorter.sortingSpeed);
    const dispatch = useAppDispatch();
    const isMounted = useIsMounted();


    const canStart = useMemo(() => !sorting && !!algorithm, [algorithm, sorting])

    /**
     * As soon as the component mounts:
     * - generates an array as the default array of the state..
     */
    useLayoutEffect(() => {
        dispatch(ReduxActions.sorter.generateArray());
    }, [dispatch])

    /**
     * Changes the length of the array with the given value.
     */
    const changeArrayLength = useCallback((e: Event, values: number | number[]) => {
        const length = typeof values === 'number' ? values : values[0];
        dispatch(ReduxActions.sorter.changeArrayLength(length));
    }, [dispatch])

    /**
     * Changes the sorting speed with the given value.
     */
    const changeSortingSpeed = useCallback((e: Event, values: number | number[]) => {
        const speed = typeof values === 'number' ? values : values[0];
        dispatch(ReduxActions.sorter.changeSortingSpeed(speed));
    }, [dispatch])

    /**
     * sets the sorting algorithm of the sorter with the given value.
     */
    const setSortingAlgorithm = useCallback((e: any, value: string | null) => {
        dispatch(ReduxActions.sorter.setSortingAlgorithm(value as SortingAlgorithms));
    }, [dispatch])

    /**
     * Generates a new array for the sorter.
     */
    const generateArray = useCallback(() => {
        dispatch(ReduxActions.sorter.generateArray());
    }, [dispatch])


    /**
     * Starts the sorting process of this view.
     */
    const sort = useCallback(() => {
        dispatch(ReduxActions.sorter.sort(isMounted));
    }, [dispatch, isMounted])

    const sortingAlgorithmOptions = useMemo(() =>
        Object
            .values(SortingAlgorithms)
            .map(e => ({
                value: e,
                title: e[0].toUpperCase() + e.slice(1).replaceAll(/[A-Z]/g, (char) => ' '.concat(char)),
            }))
            .map(e => (
                <Option key={e.value} value={e.value}>
                    {e.title}
                </Option>
            )), [])


    return (
        <>
            <div className={'sorting-view-app-bar'}>
                <Logo className={'sorting-view-app-bar-logo'}/>
                <ColorThemeButton className={'sorting-view-app-bar-theme-button'}/>
                <Fade in={!sorting}>
                    <div className={'sorting-view-app-bar-controls'}>
                        <Divider className={'sorting-view-app-bar-divider'}/>
                        <div className={'sorting-view-app-bar-slider-container'}>
                            <Typography className={'sorting-view-app-bar-slider-label'}>
                                Array Length:
                            </Typography>
                            <Slider
                                disabled={sorting}
                                min={MinArrayLength}
                                max={MaxArrayLength}
                                value={arrayLength}
                                onChange={changeArrayLength}
                            />
                        </div>
                        <Divider className={'sorting-view-app-bar-divider'}/>
                        <div className={'sorting-view-app-bar-slider-container'}>
                            <Typography className={'sorting-view-app-bar-slider-label'}>
                                Sorting Speed:
                            </Typography>
                            <Slider
                                disabled={sorting}
                                value={sortingSpeed}
                                min={MinSortingSpeed}
                                max={MaxSortingSpeed}
                                onChange={changeSortingSpeed}
                            />
                        </div>
                        <Divider className={'sorting-view-app-bar-divider'}/>
                        <Select
                            disabled={sorting}
                            placeholder={'Algorithm'}
                            className={'sorting-view-app-bar-algo-select'}
                            value={algorithm}
                            onChange={setSortingAlgorithm}
                        >
                            {sortingAlgorithmOptions}
                        </Select>
                        <Divider className={'sorting-view-app-bar-divider'}/>
                        <Button
                            disabled={sorting}
                            className={'sorting-view-app-bar-new-array'}
                            variant={'outlined'}
                            onClick={generateArray}
                        >
                            Regenerate Array
                        </Button>
                        <Divider className={'sorting-view-app-bar-divider'}/>
                    </div>
                </Fade>
                <Fade in={canStart}>
                    <Button
                        disabled={!canStart}
                        className={'sorting-view-app-bar-start'}
                        variant={'solid'}
                        onClick={sort}
                    >
                        Start
                    </Button>
                </Fade>
            </div>
        </>
    );
}

export default SortingViewAppbar;
