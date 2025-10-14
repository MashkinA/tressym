import {useEffect, useState} from 'react';
import cl from "./SelectSkills.module.css";
import type { Skills } from "../types.ts";

const frame = "/assets/icons/horizontalFrame.webp";

type SelectSkillsProps = {
    skills: Skills;
    onTrackSkills: (value: string[]) => void;
}

const SelectSkills = ({ skills, onTrackSkills }:SelectSkillsProps) => {

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const blocks = Array.from({ length: skills.amount }, (_, i) => i);

    const addSkill =  (skillName: string) => {
        setSelectedSkills(prev => {
            if (prev.includes(skillName)) {
                return prev.filter(s => s !== skillName);
            }

            if (prev.length >= skills.amount) {
                return prev;
            }

            return [...prev, skillName];
        });
    }

    useEffect(() => {
        onTrackSkills(selectedSkills);
    }, [selectedSkills, onTrackSkills]);

    return (
        <main className={cl.selectSkills}>
            <div className={cl.skillsWrapper}>
                <h3 className={cl.header}>Навыки на выбор: {selectedSkills.length} / {skills.amount}</h3>
                <div className={cl.skillsDots}>
                    {blocks.map((i) => (
                        <div
                            key={i}
                            className={i < selectedSkills.length ? cl.activeDot : cl.inactiveDot}
                        />
                    ))}
                </div>
                <div className={cl.skillsList}>
                    {skills.skills.map((skill, index) => (
                        <div key={index} className={cl.skillTab} onClick={ () => addSkill(skill) }>
                            <h4 className={selectedSkills.includes(skill) ? cl.skillName : cl.skillNameInactive}>{skill}</h4>
                            <div className={selectedSkills.includes(skill) ? cl.activeDot : cl.inactiveDot}></div>
                            <img className={selectedSkills.includes(skill) ? cl.horizontalFrame : cl.horizontalFrameInactive} src={ frame } alt=""/>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cl.skillsImg}></div>
        </main>
    );
};

export default SelectSkills;