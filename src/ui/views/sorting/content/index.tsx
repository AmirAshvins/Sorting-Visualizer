import {useMemo} from "react";
import {Typography} from "@mui/joy";
import classnames from "classnames";

// 10 - 210
const SortingViewContent = () => {

    const array = useMemo(() => {
        return Array(5).fill(null).map((_, e) => (
            Math.floor(Math.random() * (100 - 10 + 1)) + 10
        ));
    }, [])

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
                            <div
                                key={index}
                                style={{
                                    '--rect-value': value,
                                }}
                                className={'sorting-view-content-rect-container'}>
                                <div className={'sorting-view-content-rect'}>
                                    <Typography
                                        className={classnames('sorting-view-content-rect-value', {
                                            'show': showRectValue,
                                        })}>
                                        {value}
                                    </Typography>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default SortingViewContent;
