// User validation functions
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(password));
}

export function validateUsername(username) {
    // Minimum three characters, only letters, numbers, underscores, and hyphens
    const re = /^[a-zA-Z0-9_-]{3,}$/;
    return re.test(String(username));
}

// Simple receiver assignment (client-side simulation)
export async function pickReceiver() {
    try {
        // In a real implementation, this would call an API endpoint
        // For now, we'll simulate the receiver assignment
        const receivers = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
        const currentReceiver = localStorage.getItem('receiver');

        if (!currentReceiver) {
            const availableReceivers = receivers.filter(r => r !== localStorage.getItem('username'));
            const randomReceiver = availableReceivers[Math.floor(Math.random() * availableReceivers.length)];
            localStorage.setItem('receiver', randomReceiver);
            return { receiver: randomReceiver };
        }

        return { receiver: currentReceiver };
    } catch (error) {
        throw new Error('Error picking receiver: ' + error.message);
    }
}


