import '../styles/filteringPanel.css';
import { FilteringPanelProps } from '../types';

function FilteringPanel({all, setAll, ui, setUi, ux, setUx, enhancement, setEnhancement, bug, setBug, feature, setFeature} : FilteringPanelProps): JSX.Element {

    return (
        <section className='panel'>
            <div className='panel-header'>
                <h1>Frontend Mentor</h1>
                <h2>Feedback Board</h2>
            </div>
            <div className='panel-filtering'>
                <button 
                    className={`filter-button ${all ? "active" : ""}`}
                    onClick={() => {
                        setAll(true);
                        setUi(false);
                        setUx(false);
                        setEnhancement(false);
                        setBug(false);
                        setFeature(false);
                    }}>
                        All
                </button>
                <button 
                    className={`filter-button ${ui ? "active" : ""}`}
                    onClick={() => {setAll(false); setUi(!ui)}}
                    >
                        UI
                </button>
                <button 
                    className={`filter-button ${ux ? "active" : ""}`}
                    onClick={() => {setAll(false); setUx(!ux)}}
                    >
                        UX
                </button>
                <button 
                    className={`filter-button ${enhancement ? "active" : ""}`}
                    onClick={() => {setAll(false); setEnhancement(!enhancement)}}
                    >
                        Enhancement
                </button>
                <button 
                    className={`filter-button ${bug ? "active" : ""}`}
                    onClick={() => {setAll(false); setBug(!bug)}}   
                    >
                        Bug
                </button>
                <button 
                    className={`filter-button ${feature ? "active" : ""}`}
                    onClick={() => {setAll(false); setFeature(!feature)}}
                    >
                        Feature
                </button>
            </div>
            <div className='panel-roadmap'>
                
            </div>
        </section>
    )
}

export default FilteringPanel;