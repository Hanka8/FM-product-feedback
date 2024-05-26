import '../styles/filteringPanel.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FilteringPanelProps } from '../types';

function FilteringPanel({all, setAll, ui, setUi, ux, setUx, enhancement, setEnhancement, bug, setBug, feature, setFeature} : FilteringPanelProps): JSX.Element {

    useEffect(() => {
        if (!ui && !ux && !enhancement && !bug && !feature) {
            setAll(true);
        }
    }, [ui, ux, enhancement, bug, feature, setAll]);

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
                <div className='roadmap-header roadmap-flex'>
                    <h2>Roadmap</h2>
                    <Link className='link' to='/roadmap'>View</Link>
                </div>
                <div className='roadmap-row roadmap-flex'>
                    <p><span className='circle orange'></span>Planned</p>
                    <p className='bold'>2</p>
                </div>
                <div className='roadmap-row roadmap-flex'>
                    <p><span className='circle violet'></span>In-progress</p>
                    <p className='bold'>3</p>
                </div>
                <div className='roadmap-row roadmap-flex'>
                    <p><span className='circle blue'></span>Live</p>
                    <p className='bold'>4</p>
                </div>
            </div>
        </section>
    )
}

export default FilteringPanel;