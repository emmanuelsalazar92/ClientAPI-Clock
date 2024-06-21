function getCurrentDateFormatted() {
    // Create a new Date object for the current date and time
    const date = new Date();

    // Get the year, month, and day from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format the date in yyyy-MM-dd format
    return `${year}-${month}-${day}`;
}

