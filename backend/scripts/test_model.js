const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function testUserFlow() {
    try {
        const timestamp = Date.now();
        const username = `TestUser_${timestamp}`;
        const email = `test_${timestamp}@example.com`;
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(`\nAttempting to create user: ${username} (${email})`);

        const userId = await User.create({
            username,
            email,
            password: hashedPassword,
            isAdmin: false,
            subscription_plan: 'STARTER',
            is_verified: 0
        });

        console.log(`User created with ID: ${userId}`);

        console.log(`\nAttempting to find user by email: ${email}`);
        const foundUser = await User.findByIdentifier(email);

        if (foundUser) {
            console.log('User found:', foundUser);
            if (foundUser.username === username) {
                console.log('SUCCESS: Username matches.');
            } else {
                console.error('FAILURE: Username mismatch.');
            }
            if (foundUser.is_private === 0) {
                console.log('SUCCESS: is_private default is 0.');
            } else {
                console.log('INFO: is_private is ' + foundUser.is_private);
            }
        } else {
            console.error('FAILURE: User not found after creation.');
        }

    } catch (error) {
        console.error('TEST FAILED with error:', error);
    }
}

testUserFlow();
