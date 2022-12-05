import SortingViewAppbar from "./app-bar";
import SortingViewContent from "./content";

const SortingView = () => {

    return (
        <>
            <div className={'sorting-view'}>
                <SortingViewAppbar/>
                <SortingViewContent/>
            </div>
        </>
    );
}

export default SortingView;
