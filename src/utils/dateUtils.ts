export const formatDistanceToNow = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 10) {
        return 'há instantes';
    } else if (diffInSeconds < 60) {
        return `há ${diffInSeconds}s`;
    } else if (diffInMinutes < 60) {
        return `há ${diffInMinutes} min`;
    } else if (diffInHours < 24) {
        return `há ${diffInHours}h`;
    } else {
        return `há ${diffInDays}d`;
    }
};
