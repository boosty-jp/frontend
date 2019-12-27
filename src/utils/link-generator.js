export const createArticleLink = (id) => ("/article/?id=" + id)
export const createArticleUrl = (id) => ("https://wever.co.jp/article/?id=" + id)

export const createArticleEditLink = (id) => ("/article/edit/?id=" + id)
export const createArticleEditUrl = (id) => ("https://wever.co.jp/article/edit/?id=" + id)

export const createPlanLink = (id) => ("/plan/?id=" + id)
export const createPlanUrl = (id) => ("https://wever.co.jp/plan/?id=" + id)

export const createPlanEditLink = (id) => ("/plan/edit/?id=" + id)

export const createSectionLink = (articleId, sectionId) => ("/article/?id=" + articleId + "#" + sectionId)
export const createSectionUrl = (articleId, sectionId) => ("https://wever.co.jp/article/?id=" + articleId + "#" + sectionId)

export const createUserLink = (id) => ("/user/?id=" + id)
export const createUserUrl = (id) => ("https://wever.co.jp/user/?id=" + id)

export const createSearchLink = (name, id) => ("/search/?type=tag&q=" + name + "&id=" + id)

export const createPlanElementLink = (type, id) => ("/" + type + "/?id=" + id)

export const createSiteUrl = (path) => ("https://wever.co.jp" + path)