import { getCurrentUser } from "services/local-user";

export const canDisplayPreviewMode = (status, author) => {
    if (status !== 'draft') return false;

    const user = getCurrentUser();
    if (!user || !user.userId) return false;
    return author.id === user.userId;
}