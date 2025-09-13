import { addGift, getUserId } from './storage.js';
import { Gift, renderGift } from './gift.js';

//html gift form
let giftFormHTML = `
    <h1>Gift Form</h1>
    <form id="giftForm">
        <label for="giftName">Gift Name:</label>
        <input type="text" id="giftName" name="giftName" required>
        <br><br>
        <label for="description" id="giftDescription">Description:</label>
        <textarea id="description" name="description" required></textarea>
        <br><br>
        <label for="price" id="giftPrice">Price:</label>
        <input type="number" id="price" name="price" required>
        <br><br>
        <label for="link" id="giftLink">Link:</label>
        <input type="url" id="link" name="link">
        <br><br>
        <button type="submit">Add gift</button>
    </form>
`;

// html login form
let loginFormHTML = `
    <h1>Login</h1>
    <form id="loginForm">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br><br>    
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br><br>
        <button type="submit">Login</button>
    </form>
`;

// html registration form
let registrationFormHTML = `
    <h1>Register</h1>
    <form id="registrationForm">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br><br>
        <button type="submit">Register</button>
    </form>
`;

// load gift form and handle submission
export async function loadGiftForm() {
    document.getElementById('app').innerHTML = giftFormHTML;
    document.getElementById('giftForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('giftName').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const link = document.getElementById('link').value;
        const gift = new Gift(name, description, price, link);
        try {
            const userId = getUserId();
            await addGift(userId, gift);
            alert('Gift added successfully');
            document.getElementById('giftForm').reset();
            await renderGift(gift);
        } catch (error) {
            alert('Error adding gift: ' + error.message);
            console.error('Error adding gift:', error);
        }
    });
};

// load login form and handle submission
export async function loadLoginForm() {
    document.getElementById('app').innerHTML = loginFormHTML;
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const response = await loginUser(username, password);
            localStorage.setItem('userId', response.userId);
            let receiverStatus = localStorage.getItem('reciever');
            alert('Login successful');
            // redirect to receiver page or gift form after login
            if (receiverStatus === 'null') {
                // load reciever page if no reciever is defined
            }
            else {
                // load gift form if reciever is defined
                loadGiftForm();
            }
        } catch (error) {
            alert('Error logging in: ' + error.message);
            console.error('Error logging in:', error);
        }
    });    
};