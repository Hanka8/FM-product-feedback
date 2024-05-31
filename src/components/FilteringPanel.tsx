import '../styles/filteringPanel.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilteringPanelProps } from '../types';
import useFeedbacks from '../hooks/useFeedbacks';

function FilteringPanel( { filter, handleFilterChange} : FilteringPanelProps ): JSX.Element {

    const {feedbacks, error} = useFeedbacks();
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [screenSize, setScreenSize] = useState(window.innerWidth < 730);

    useEffect(() => {
        function handleResize() {
            setScreenSize(window.innerWidth < 730);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const planned = feedbacks.filter(feedback => feedback.status === 'planned');
    const inProgress = feedbacks.filter(feedback => feedback.status === 'in-progress');
    const live = feedbacks.filter(feedback => feedback.status === 'live');

    return (
        <section className='panel'>
            <div className='panel-header'>
                <h1>Frontend Mentor</h1>
                <h2>Feedback Board</h2>
                <button 
                    className={`hamburger-btn ${isMenuOpened && "opened"}`}
                    aria-label='menu' 
                    onClick={() => setIsMenuOpened(!isMenuOpened)}>
                </button>
            </div>
            {screenSize && <div className={`panel-overlay ${isMenuOpened && "opened"}`} onClick={() => setIsMenuOpened(!isMenuOpened)}></div>}
            {screenSize && <div className={`panel-box ${isMenuOpened && "opened"}`}></div>}
            <div className={`panel-filtering ${isMenuOpened && "opened"}`}>
              {filter.map(val=> (
                <button key={val.label} className={`filter-button ${val.isActive ? "active" : ""}`} onClick={()=>handleFilterChange(val.label)}>{val.label}</button>
              ))}
                
            </div>
            <div className={`panel-roadmap ${isMenuOpened && "opened"}`}>
                <div className='panel-roadmap-header roadmap-flex'>
                    <h2>Roadmap</h2>
                    <Link className='link' to='/roadmap'>View</Link>
                </div>
                {error ? <p>{error}</p> :
                <>
                    <div className='roadmap-row roadmap-flex'>
                        <p><span className='circle planned'></span>Planned</p>
                        <p className='bold'>{planned.length}</p>
                    </div>
                    <div className='roadmap-row roadmap-flex'>
                        <p><span className='circle inProgress'></span>In-progress</p>
                        <p className='bold'>{inProgress.length}</p>
                    </div>
                    <div className='roadmap-row roadmap-flex'>
                        <p><span className='circle live'></span>Live</p>
                        <p className='bold'>{live.length}</p>
                    </div>
                </>
                }
            </div>
        
        </section>
    )
}

export default FilteringPanel;