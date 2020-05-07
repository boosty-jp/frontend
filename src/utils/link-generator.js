import { getCurrentUser } from "services/local-user"

export const createArticleLink = (id) => ("/article/?id=" + id)
export const createArticleUrl = (id) => ("https://wever.co.jp/article/?id=" + id)

export const createArticleEditLink = (id) => ("/article/edit/?id=" + id)
export const createArticleEditUrl = (id) => ("https://wever.co.jp/article/edit/?id=" + id)

export const createCourseDetailLink = (id) => ("/course/detail/?id=" + id)
export const createCourseDetailUrl = (id) => ("https://wever.co.jp/course/detail/?id=" + id)

export const createBookDetailLink = (id) => ("/book/?id=" + id)
export const createBookDetailPreviewLink = (id) => ("/book/?id=" + id + "&preview=1")
export const createBookDetailUrl = (id) => ("https://boosty.jp/book/?id=" + id)

export const createTestLink = (id) => ("/test/?id=" + id)

export const createAnswerLink = (id) => ("/answer/?id=" + id)

export const createCourseEditLink = (id) => ("/course/edit/?id=" + id)

export const createUserLink = (id) => ("/user/?id=" + id)
export const createUserUrl = (id) => ("https://wever.co.jp/user/?id=" + id)

export const createSearchLink = (name, id) => ("/search/?type=tag&q=" + name + "&id=" + id)

export const createSiteUrl = (path) => ("https://wever.co.jp" + path)

export const createTermsUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return "https://boosty.jp/terms";
    }
    return "http://localhost:8000/terms";
}

export const createBookEditLink = (id) => ("/book/edit/base/?id=" + id)

export const createBookSectionsEditLink = (id) => ("/book/edit/sections/?id=" + id)

export const createPageEditLink = (id, bookId) => ("/book/edit/page/?id=" + id + "&bookId=" + bookId)

export const createPageViewLink = (id, bookId) => ("/book/view/page/?id=" + id + "&bookId=" + bookId)

export const createNotificationLink = (slug) => ("/notification/" + slug)

export const createStripeRegistrationLink = () => {
    const userId = getCurrentUser().userId;
    const link = process.env.GATSBY_STRIPE_AUTH_LINK;
    return link + "&state=" + userId;
}