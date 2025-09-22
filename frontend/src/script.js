import { addGift, getUserId, getGifts, loginUser } from './storage.js';
import { Gift, renderRecieverGift, renderPersonalGift } from './gift.js';
import { pickReceiver } from './user.js';

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
    <li id="giftList"></li>
`;

// Defined reciever view html
let definedRecieverViewHTML = `
    <h1 id='recieverName'></h1>
    <div id="giftList"></div>
`;

// animation needed to show reciever being picked
let undefinedRecieverViewHTML = `
    <h1>you have yet to recieve a recipient</h1>
    <p>filler until animation is added</p>
    <button id="pickRecieverButton">Pick a Reciever</button>
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
// personal view consists of gift form and gift list from loadGiftForm function below
export async function loadGiftForm(userId) {
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
            // render every gift as a dropdown card
            const gifts = await getGifts(userId);
            gifts.forEach(gift => {
                const giftCard = renderPersonalGift(gift);
                document.getElementById('giftList').innerHTML += giftCard;
            });
        } catch (error) {
            alert('Error adding gift: ' + error.message);
            console.error('Error adding gift:', error);
        }
    });
};

// reciever view if reviever is defined consists of gift list from loadRecieverView function below
export async function loadDefinedRecieverView(userId) {
    document.getElementById('app').innerHTML = definedRecieverViewHTML;
    try {
        const gifts = await getGifts(userId);
        document.getElementById('recieverName').innerText = `Gifts for ${localStorage.getItem('reciever')}`;
        // render every gift as a dropdown card
        gifts.forEach(gift => {
            const giftCard = renderRecieverGift(gift);
            document.getElementById('giftList').innerHTML += giftCard;
        });
    } catch (error) {
        alert('Error loading gifts: ' + error.message);
        console.error('Error loading gifts:', error);
    }
};

// reciever view if reciever is undefined consists of button to pick reciever from loadUndefinedRecieverView function below
// this function needs to be changed 
export async function loadUndefinedRecieverView() {
    document.getElementById('app').innerHTML = undefinedRecieverViewHTML;
    document.getElementById('pickRecieverButton').addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const response = await pickReceiver();
            localStorage.setItem('reciever', response.receiver);
            alert("You've got " + response.receiver + '!');
            loadDefinedRecieverView(getUserId());
        } catch (error) {
            alert('Error picking reciever: ' + error.message);
            console.error('Error picking reciever:', error);
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

        // Store username for later use
        localStorage.setItem('username', username);

        try {
            const response = await loginUser(username, password);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('token', response.accessToken);

            let receiverStatus = localStorage.getItem('receiver');
            alert('Login successful');

            // redirect to receiver page or gift form after login
            if (receiverStatus === 'null' || !receiverStatus) {
                // load view to pick receiver if receiver is not defined
                loadUndefinedRecieverView();
            } else {
                // load gift form if receiver is defined
                loadGiftForm();
            }
        } catch (error) {
            alert('Error logging in: ' + error.message);
            console.error('Error logging in:', error);
        }
    });
};

// load registration form and handle submission
export async function loadRegistrationForm() {
    document.getElementById('app').innerHTML = registrationFormHTML;
    document.getElementById('registrationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    });    
};