export const formatDatetime = (dateString) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const formattedDate = new Date(dateString).toLocaleDateString('rs-RS', options);
    return formattedDate.replace(/\//g, '.');
};
