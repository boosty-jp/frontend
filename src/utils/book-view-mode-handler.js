export const detectBookViewMode = (book, isPreview) => {
    if (isPreview) return "preview";
    if (book.status === "suspend" && book.purchased) return "suspend";
    if (book.puchased) return "view";
    return "purchse";
}