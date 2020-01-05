export const convertToSkillMap = (sections) => {
    var skills = [];
    sections.forEach(s => {
        s.contents.forEach(a => {
            a.skills.forEach(s => {
                skills.push(s);
            })
        })
    })

    var skillMap = [];
    skills.forEach(s => {
        if (!validLevel(s.level)) return;

        var targetIdx = -1;
        for (var i = 0; i < skillMap.length; i++) {
            if (s.id === skillMap[i].id) {
                targetIdx = i;
            }
        }

        if (targetIdx >= 0) {
            if (s.level === 1) {
                skillMap[targetIdx] = { ...skillMap[targetIdx], easy: skillMap[targetIdx].easy + 1 };
            } else if (s.level === 2) {
                skillMap[targetIdx] = { ...skillMap[targetIdx], middle: skillMap[targetIdx].middle + 1 };
            } else if (s.level === 3) {
                skillMap[targetIdx] = { ...skillMap[targetIdx], hard: skillMap[targetIdx].hard + 1 };
            }
        } else {
            if (s.level === 1) {
                skillMap.push({ id: s.id, name: s.name, easy: 1, middle: 0, hard: 0 });
            } else if (s.level === 2) {
                skillMap.push({ id: s.id, name: s.name, easy: 0, middle: 1, hard: 0 });
            } else if (s.level === 3) {
                skillMap.push({ id: s.id, name: s.name, easy: 0, middle: 0, hard: 1 });
            }
        }
    })
    return skillMap;
}

export const convertToSkillLevelMap = (sections) => {
    var skillLevels = [
        { name: 'easy', value: 0 },
        { name: 'medium', value: 0 },
        { name: 'hard', value: 0 },
    ]

    var skills = [];
    sections.forEach(s => {
        s.contents.forEach(a => {
            a.skills.forEach(s => {
                skills.push(s);
            })
        })
    })

    skills.forEach(s => {
        if (s.level === 1) {
            skillLevels[0].value++;
        } else if (s.level === 2) {
            skillLevels[1].value++;
        } else if (s.level === 3) {
            skillLevels[2].value++;
        }
    })
    return skillLevels;
}

const validLevel = (level) => {
    return (level > 0 && level < 4);
}