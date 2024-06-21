// Arrow function to get the current date in yyyy-MM-dd format
const getCurrentDateFormatted = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Export the function as a module
module.exports = getCurrentDateFormatted;
