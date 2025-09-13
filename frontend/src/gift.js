
// gift validation
export function validateGiftName(giftName) {
    // Minimum three characters, only letters, numbers, spaces, underscores, and hyphens
    const re = /^[a-zA-Z0-9 _-]{3,}$/;
    return re.test(String(giftName));
}

export function validatePrice(price) {
    // Positive number with up to two decimal places
    const re = /^\d+(\.\d{1,2})?$/;
    return re.test(String(price));
}

export function validateLink(link) {
    // Valid URL format
    const re = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/;
    return re.test(String(link));
}