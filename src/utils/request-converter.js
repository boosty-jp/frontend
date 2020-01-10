export const makeTestRequest = (id, title, description, referenceCourseId, questions) => {
    return {
        id: id,
        title: title,
        description: description,
        referenceCourseId: referenceCourseId,
        questions: questions.map(q => { return makeQuestionRequest(q) }),
    }
}

export const makeQuestionRequest = (question) => {
    if (question.type === 'text') {
        return {
            questionText: JSON.stringify({ textBlocks: question.questionBlocks }),
            type: question.type,
            textAnswer: makeTextAnswerRequest(question.answer),
            explanations: question.explanations.map(e => { return makeExplanationRequest(e) }),
        }
    } else if (question.type === 'select') {
        return {
            questionText: JSON.stringify({ textBlocks: question.questionBlocks }),
            type: question.type,
            selectAnswers: question.answer.map(a => { return makeSelectAnswerRequest(a) }),
            explanations: question.explanations.map(e => { return makeExplanationRequest(e) }),
        }
    }
    throw new Error('無効なデータ形式です。');
}

export const makeTextAnswerRequest = (textAnswer) => {
    return {
        answer: textAnswer.text,
        showCount: textAnswer.showCount,
    }
}

export const makeSelectAnswerRequest = (selectAnswer) => {
    return {
        answer: selectAnswer.answer,
        text: selectAnswer.text,
    }
}

export const makeExplanationRequest = (explanation) => {
    return {
        text: JSON.stringify({ textBlocks: explanation.blocks }),
        referenceIds: explanation.references.map(r => { return r.id }),
    }
}