import { getTitleError, getDescriptionError } from "utils/content-validator"

export const getTestError = (title, description, questions) => {
    const titleError = getTitleError(title);
    if (titleError.status === 'error') {
        return titleError;
    }

    const descriptionError = getDescriptionError(description);
    if (descriptionError.status === 'error') {
        return descriptionError;
    }

    const questionsError = getQuestionsError(questions);
    if (questionsError.status === 'error') {
        return questionsError;
    }

    return { status: '', message: '' };
}

export const getQuestionsError = (questions) => {
    let status = "";
    let message = "";
    if (questions.length > 20) {
        status = "error";
        message = "設定できる問題は20までです"
    } else {
        status = "";
        message = "";
    }

    return { status, message };
}