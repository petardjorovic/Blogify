export const formatDatetime = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    const formattedDate = new Date(dateString).toLocaleString('rs-RS', options);
    return formattedDate.replace(/\//g, '.');
};
