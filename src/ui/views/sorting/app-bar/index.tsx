import {Button, Divider, Option, Select, Slider, Typography} from "@mui/joy";
import {ReactComponent as Logo} from "../../../../assets/svgs/logo.svg";
import ColorThemeButton from "../../../components/color-theme-button";
import {useCallback, useMemo} from "react";
import {MaxArrayLength, MaxSortingSpeed, MinArrayLength, MinSortingSpeed, SortingAlgorithms} from "../../../../core/models/constants";
import {useAppDispatch, useAppSelector} from "../../../../core/types/redux";
import {Fade} from "@mui/material";

const SortingViewAppbar = () => {
    const dispatch = useAppDispatch();
    const algorithm = useAppSelector(state => null);
    const sorting = useAppSelector(state => false);
    const arrayLength = useAppSelector(state => MinArrayLength);
    const sortingSpeed = useAppSelector(state => MinSortingSpeed);

    const canStart = useMemo(() => !sorting && !!algorithm, [])

    const setArrayLength = useCallback((e: Event, values: number | number[]) => {

    }, [])

    const setSortingSpeed = useCallback((e: Event, values: number | number[]) => {

    }, [])

    const setSortingAlgorithm = useCallback((e: any, value: string | null) => {

    }, [])

    const generateArray = useCallback(() => {

    }, [])

    const sort = useCallback(() => {

    }, [])

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
                ))
        , [])


    return (
        <>
            <div className={'sorting-view-app-bar'}>
                <Logo className={'sorting-view-app-bar-logo'}/>
                <ColorThemeButton className={'sorting-view-app-bar-theme-button'}/>
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
                        onChange={setArrayLength}
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
                        onChange={setSortingSpeed}
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
                <Fade in={!sorting}>
                    <Button
                        disabled={sorting}
                        className={'sorting-view-app-bar-new-array'}
                        variant={'outlined'}
                        onClick={generateArray}
                    >
                        Regenerate Array
                    </Button>
                </Fade>
                <Divider className={'sorting-view-app-bar-divider'}/>
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
