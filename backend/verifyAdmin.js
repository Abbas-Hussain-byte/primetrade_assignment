const axios = require('axios');

const API_URL = 'http://localhost:5000/api/v1/auth';

const runTest = async () => {
    try {
        console.log('--- Starting Verification ---');

        // 1. Register first admin (should succeed if none exists, or fail if one does)
        const admin1 = {
            name: 'Admin One',
            email: 'admin1@example.com',
            password: 'password123',
            role: 'admin'
        };

        try {
            console.log('Attempting to register Admin 1...');
            const res1 = await axios.post(`${API_URL}/register`, admin1);
            console.log('Admin 1 registered successfully:', res1.data.role);
        } catch (err) {
            console.log('Admin 1 registration result:', err.response ? err.response.data.message : err.message);
        }

        // 2. Register second admin (should fail)
        const admin2 = {
            name: 'Admin Two',
            email: 'admin2@example.com',
            password: 'password123',
            role: 'admin'
        };

        try {
            console.log('\nAttempting to register Admin 2...');
            const res2 = await axios.post(`${API_URL}/register`, admin2);
            console.log('Admin 2 registered (UNEXPECTED):', res2.data);
        } catch (err) {
            console.log('Admin 2 registration result (EXPECTED):', err.response ? err.response.data.message : err.message);
            if (err.response && err.response.data.message === 'Admin already exists') {
                console.log('PASS: Single admin restriction works.');
            } else {
                console.log('FAIL: Unexpected error message.');
            }
        }

        // 3. Register user (should succeed)
        const user1 = {
            name: 'User One',
            email: 'user1@example.com',
            password: 'password123',
            role: 'user'
        };

        try {
            console.log('\nAttempting to register User 1...');
            const res3 = await axios.post(`${API_URL}/register`, user1);
            console.log('User 1 registered successfully:', res3.data.role);
        } catch (err) {
            console.log('User 1 registration result:', err.response ? err.response.data.message : err.message);
        }

    } catch (error) {
        console.error('Test script error:', error.message);
    }
};

runTest();
