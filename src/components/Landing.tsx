import '../styles/landing.css';
import FilteringPanel from './FilteringPanel';
import FeedbackBoard from './FeedbackBoard';
import { useState } from 'react';
import { motion } from 'framer-motion';

function Landing(): JSX.Element {

    const [all, setAll] = useState<boolean>(true);
    const [ui, setUi] = useState<boolean>(false);
    const [ux, setUx] = useState<boolean>(false);
    const [enhancement, setEnhancement] = useState<boolean>(false);
    const [bug, setBug] = useState<boolean>(false);
    const [feature, setFeature] = useState<boolean>(false);

    return (
        <motion.div
            initial={{opacity: 0}} 
            animate={{opacity: 1, transition: {duration: 0.15}}}>
        <div className='landing'>
            <FilteringPanel
                all={all}
                setAll={setAll}
                ui={ui}
                setUi={setUi}
                ux={ux}
                setUx={setUx}
                enhancement={enhancement}
                setEnhancement={setEnhancement}
                bug={bug}
                setBug={setBug}
                feature={feature}
                setFeature={setFeature}
            />
            <FeedbackBoard 
                all={all}
                ui={ui}
                ux={ux}
                enhancement={enhancement}
                bug={bug}
                feature={feature}
            />
        </div>
        </motion.div>
    )
}

export default Landing;