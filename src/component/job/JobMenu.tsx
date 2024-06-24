import styles from "../../css/job/JobMenu.module.css";
import React, { useState } from "react";
import { regionData, jobData } from "../../data/jobData";

interface JobMenuProps {
    onSearch: (stypeValue: string, rtypeValue: string) => void;
}

const JobMenu: React.FC<JobMenuProps> = ({ onSearch }) => {
    const [stypeValue, setStypeValue] = useState<string[]>([]);
    const [rtypeValue, setRtypeValue] = useState<string[]>([]);

    const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setRtypeValue(prev =>
            checked ? [...prev, value] : prev.filter(v => v !== value)
        );
    };

    const handleJobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setStypeValue(prev =>
            checked ? [...prev, value] : prev.filter(v => v !== value)
        );
    };

    const handleSearch = () => {
        const rtypeString = rtypeValue.join(', ');
        const stypeString = stypeValue.join(', ');
        onSearch(stypeString, rtypeString);
    };

    return (
        <div className={styles.jobMain}>
            <div className={styles.jobMenu}>
                <div className={styles.div1}>
                    <div className={styles.header}>지역</div>
                    <div>
                        {regionData.map(region => (
                            <div key={region.value}>
                                <input
                                    type="checkbox"
                                    id={`region-${region.value}`}
                                    value={region.label}
                                    onChange={handleRegionChange}
                                />
                                <label htmlFor={`region-${region.value}`}>{region.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.div2}>
                    <div className={styles.header}>직종</div>
                    <div>
                        {jobData.map(job => (
                            <div key={job.value}>
                                <input
                                    type="checkbox"
                                    id={`job-${job.value}`}
                                    value={job.label}
                                    onChange={handleJobChange}
                                />
                                <label htmlFor={`job-${job.value}`}>{job.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button className={styles.click} onClick={handleSearch}>검색</button>
        </div>
    );
}

export default JobMenu;