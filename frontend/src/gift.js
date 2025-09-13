// gift object
export class Gift {
    constructor(name, description, price, link) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.link = link;
    }
};

// format and render gift drowpdown cards
export function renderGift(Gift) {
    const giftName = validateGiftName(Gift.name) ? Gift.name : 'Invalid gift name';
    const giftDescription = Gift.description || 'No description provided';
    const giftPrice = validatePrice(Gift.price) ? `$${Gift.price}` : 'Invalid price';
    const giftLink = validateLink(Gift.link) ? Gift.link : '#';
    const giftCard = `
    <div class="dropdown">
        <p class="dropDownText">${giftName}</p>
        <div class="dropdown-content">
            <p>${giftDescription}</p>
            <p>${giftPrice}</p>
            <a href="${giftLink}" target="_blank">Link</a>
        </div>
    </div>
    `;
    return giftCard;
}

// gift validation
function validateGiftName(giftName) {
    // Minimum three characters, only letters, numbers, spaces, underscores, and hyphens
    const re = /^[a-zA-Z0-9 _-]{3,}$/;
    return re.test(String(giftName));
}

function validatePrice(price) {
    // Positive number with up to two decimal places
    const re = /^\d+(\.\d{1,2})?$/;
    return re.test(String(price));
}

function validateLink(link) {
    // Valid URL format
    const re = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/;
    return re.test(String(link));
}