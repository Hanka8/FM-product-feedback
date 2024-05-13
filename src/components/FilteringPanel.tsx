import '../styles/filteringPanel.css';

function FilteringPanel(): JSX.Element {
    return (
        <section className='panel'>
            <div className='panel-header'>
                <h1>Frontend Mentor</h1>
                <h2>Feedback Board</h2>
            </div>
            <div className='panel-filtering'>
                <button className='filter-button'>All</button>
                <button className='filter-button'>UI</button>
                <button className='filter-button'>UX</button>
                <button className='filter-button'>Enhancement</button>
                <button className='filter-button'>Bug</button>
                <button className='filter-button'>Feature</button>
            </div>
            <div className='panel-roadmap'>
                
            </div>
        </section>
    )
}

export default FilteringPanel;