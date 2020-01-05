export const getTitleError = (title) => {
    let status = "";
    let message = "";
    if (!title || title.length === 0 || title.search(/\S+/) === -1) {
        status = "error";
        message = "タイトルを入力してください"
    } else if (title.length > 60) {
        status = "error";
        message = "タイトルは60文字までです"
    } else {
        status = "";
        message = "";
    }

    return { status, message };
}

export const getTagsError = (tags) => {
    let status = "";
    let message = "";
    if (tags.length > 5) {
        status = "error";
        message = "設定できるタグは5つまでです"
    } else {
        status = "";
        message = "";
    }

    return { status, message };
}

export const getSectionsError = (sections) => {
    let status = "";
    let message = "";
    if (sections.length > 10) {
        status = "error";
        message = "設定できるセクションは10までです"
    } else {
        status = "";
        message = "";
    }

    return { status, message };
}

export const getDescriptionError = (description) => {
    let status = "";
    let message = "";
    if (description.length > 200) {
        status = "error";
        message = "説明は200文字までです"
    } else {
        status = "";
        message = "";
    }

    return { status, message };
}

export const getReferenceCourseError = (refrenceCourse) => {
    let status = "";
    let message = "";
    if (!refrenceCourse.id) {
        status = "error";
        message = "対象のコースを選択してください"
    } else {
        status = "";
        message = "";
    }

    return { status, message };
}

export const getAnswerTypeError = (type) => {
    let status = "";
    let message = "";
    if (!type || (type !== 'select' && type !== 'text')) {
        status = "error";
        message = "タイプを選んでください"
    }

    return { status, message };
}

export const getQuestionError = (blockCount, textCount) => {
    let status = "";
    let message = "";
    if (blockCount === 0 || textCount === 0) {
        status = "error";
        message = "問題内容を入力してください"
    }

    if (blockCount > 10) {
        status = "error";
        message = "入力できる問題文は10ブロックまでです。"
    }

    if (textCount > 1000) {
        status = "error";
        message = "入力できる問題文は1000文字までです。"
    }

    return { status, message };
}

export const getExplanationTextError = (blockCount, textCount) => {
    let status = "";
    let message = "";
    if (blockCount === 0 || textCount === 0) {
        status = "error";
        message = "解説内容を入力してください"
    }

    if (blockCount > 10) {
        status = "error";
        message = "入力できる解説内容は10ブロックまでです。"
    }

    if (textCount > 1000) {
        status = "error";
        message = "入力できる解説内容は1000文字までです。"
    }

    return { status, message };
}

export const getReferenceError = (referenceBlocks) => {
    console.log('re', referenceBlocks);
    let status = "";
    let message = "";
    if (!referenceBlocks || referenceBlocks.length === 0) {
        status = "error";
        message = "参考情報は1つ以上必要です。"
        return { status, message };
    }

    if (referenceBlocks.length > 5) {
        status = "error";
        message = "追加できる参考情報は5つまでです。"
    }

    return { status, message };
}