const SUFFIX = '_COURSE_SECTIONS_EDIT';
const SET_SECTIONS = 'SET_SECTIONS' + SUFFIX;
const CLEAR_SECTIONS = 'CLEAR_SECTIONS' + SUFFIX;
const ADD_SECTION = 'ADD_SECTION' + SUFFIX;
const UPDATE_SECTIONS = 'UPDATE_SECTIONS' + SUFFIX;
const UPDATE_SECTION = 'UPDATE_SECTION' + SUFFIX;
const DELETE_SECTION = 'DELETE_SECTIONS' + SUFFIX;

export const setSections = (sections) => ({
    type: SET_SECTIONS,
    sections: sections
})

export const clearSections = () => ({
    type: CLEAR_SECTIONS,
})

export const addSection = (section) => ({
    type: ADD_SECTION,
    section: section
})

export const updateSections = (sections) => ({
    type: UPDATE_SECTIONS,
    sections: sections
})

export const updateSection = (section) => ({
    type: UPDATE_SECTION,
    section: section
})

export const deleteSection = (id) => ({
    type: DELETE_SECTION,
    id: id
})
const initialState = {
    sections: [],
    skillMaps: [],
}

export default function CourseEditSections(state = initialState, action) {
    switch (action.type) {
        case SET_SECTIONS:
            return {
                ...state,
                sections: action.sections,
                // skillMaps: convertToSkillMap(action.sections),
            };
        case CLEAR_SECTIONS:
            return {
                ...initialState,
            };
        case ADD_SECTION:
            return {
                ...state,
                sections: [...state.sections, action.section],
                // skillMaps: convertToSkillMap([...state.sections, action.section]),
            }
        case UPDATE_SECTIONS:
            return {
                ...state,
                sections: action.sections,
                // skillMaps: convertToSkillMap(action.sections),
            }
        case UPDATE_SECTION:
            const updateSections = state.sections.concat();
            for (let i = 0; i < updateSections.length; ++i) {
                if (updateSections[i].id === action.section.id) {
                    updateSections[i] = action.section;
                }
            }
            return {
                ...state,
                sections: updateSections,
                // skillMaps: convertToSkillMap(updateSections),
            }
        case DELETE_SECTION:
            const deleteSections = state.sections.concat();
            let idx = -1;
            for (let i = 0; i < deleteSections.length; ++i) {
                if (deleteSections[i].id === action.id) {
                    idx = i;
                }
            }

            if (idx >= 0) {
                deleteSections.splice(idx, 1);
                return {
                    ...state,
                    sections: deleteSections,
                    // skillMaps: convertToSkillMap(deleteSections),
                }
            } else {
                return { ...state }
            }

        default:
            return state;
    }
}