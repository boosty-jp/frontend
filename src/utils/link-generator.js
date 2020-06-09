import { getCurrentUser } from "services/local-user"

export const createBookDetailLink = (id) => ("/book/?id=" + id)
export const createBookDetailUrl = (id) => ("https://boosty.jp/book/?id=" + id)

export const createTestLink = (id) => ("/test/?id=" + id)

export const createAnswerLink = (id) => ("/answer/?id=" + id)

export const createCourseEditLink = (id) => ("/course/edit/?id=" + id)

export const createUserLink = (id) => ("/user/?id=" + id)
export const createUserUrl = (id) => ("https://boosty.jp/user/?id=" + id)

export const createSearchLink = (name, id) => ("/search/?type=tag&q=" + name + "&id=" + id)

export const createSiteUrl = (path) => ("https://wever.co.jp" + path)

export const createTermsUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return "https://boosty.jp/terms";
    }
    return "http://localhost:8000/terms";
}

export const createBookEditLink = (id) => ("/book/edit/base/?id=" + id)
export const createBookEditUrl = (id) => ("https://boosty.jp/book/edit/base/?id=" + id)

export const createBookSectionsEditLink = (id) => ("/book/edit/sections/?id=" + id)

export const createPageEditLink = (id, bookId) => ("/book/edit/page/?id=" + id + "&bookId=" + bookId)

export const createPageViewLink = (id, bookId) => ("/book/view/page/?id=" + id + "&bookId=" + bookId)

export const createPageViewUrl = (id, bookId) => ("https://boosty.jp/book/view/page/?id=" + id + "&bookId=" + bookId)

export const createNotificationLink = (slug) => ("/notification/" + slug)

export const createStripeRegistrationLink = () => {
    const userId = getCurrentUser().userId;
    const link = process.env.GATSBY_STRIPE_AUTH_LINK;
    return link + "&state=" + userId;
}

export const createBookOgpImageUrl = imageUrl => {
    if (!imageUrl) return '';
    return imageUrl.replace(/\.png\?alt=media$/g, '_ogp.png?alt=media');
}