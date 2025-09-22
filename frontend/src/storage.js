const URL = 'http://localhost:3000';

// may have to change how token is stored/retrieved
function getToken() {
    return localStorage.getItem('token');
}

//get user ID from local storage
export async function getUserId() {
    return localStorage.getItem('userId');
}

export async function registerUser(username, email, password) {
    const response = await fetch(`${URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
}

export async function loginUser(username, password) {
    const response = await fetch(`${URL}/users/login`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
}

export async function getGifts(id) {
    const response = await fetch(`${URL}/users/${id}/gifts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Failed to fetch gifts');
    return await response.json();
}

export async function addGift(id, gift) {
    const response = await fetch(`${URL}/users/${id}/gifts`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gift)
    });
    if (!response.ok) throw new Error('Failed to add gift');
    return await response.json();
}

export async function updateGift(userId, giftId, updatedGift) {
    const response = await fetch(`${URL}/users/${userId}/gifts/${giftId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedGift)
    });
    if (!response.ok) throw new Error('Failed to update gift');
    return await response.json();
}