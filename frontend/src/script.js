

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

// html dropdown gifts
let giftsHTML = `
    <div class="dropdown">
        <p class="dropDownText">// giftName</p>
        <div class="dropdown-content">
            <p>// description</p>
            <p>// price</p>
            <a href="// link" target="_blank">Link</a>
        </div>
    </div>
`;