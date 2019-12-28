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