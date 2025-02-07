export const isValidEmail = (email) => {
    const rejex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return rejex.test(email);
};
