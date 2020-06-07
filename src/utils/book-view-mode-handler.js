export const detectBookViewMode = (book) => {
    if (book.purchased) return "read";
    if (book.status === "suspend") return "suspend";
    if (book.price === 0) return "add";
    return "purchse";
}