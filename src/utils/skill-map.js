const rateDescription = ['初級', '中級', '上級'];

export const convertToSkillMap = (sections) => {
    var skills = [];
    sections.forEach(s => {
        s.articles.forEach(a => {
            a.skills.forEach(s => {
                skills.push(s);
            })
        })
    })
    var skillMap = [];
    skills.forEach(s => {
        if (!validLevel) return;

        var skillExistis = false;
        var targetIdx = -1;
        for (var i = 0; i < skillMap.length; i++) {
            if (s.id === skillMap[i].id) {
                skillExistis = true
                if (s.level === skillMap[i].level) {
                    targetIdx = i;
                    break;
                }
            }
        }

        // チャートをきれいにするためにすべてのレベルを初期化しておく
        if (!skillExistis) {
            for (var i = 1; i < 4; ++i) {
                if (i === s.level) {
                    skillMap.push({ id: s.id, level: s.level, value: 1, label: s.name });
                } else {
                    skillMap.push({ id: s.id, level: i, value: 0, label: s.name });
                }
            }
        }

        if (targetIdx >= 0) {
            skillMap[targetIdx].value += 1;
        }
    })

    return skillMap.map(s => { return { name: s.label, label: rateDescription[s.level - 1], value: s.value } });
}

const validLevel = (level) => {
    return (level > 0 && level < 4);
}