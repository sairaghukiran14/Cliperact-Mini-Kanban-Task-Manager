const http = require('http');
const https = require('https');

// Dynamic configuration via Environment Variables or Command Line Arguments
// Usage: 
//   node api-ping.js <URL> <INTERVAL_IN_MINUTES>
//   API_URL=http://localhost:5001/api/tasks INTERVAL_MINUTES=14 node api-ping.js

const API_URL = process.env.API_URL || process.argv[2] || 'http://localhost:5001/api/tasks';
const INTERVAL_MINUTES = parseInt(process.env.INTERVAL_MINUTES || process.argv[3] || '14', 10);
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;

if (!API_URL) {
    console.error("Please provide an API URL.");
    process.exit(1);
}

function pingApi() {
    console.log(`\n[${new Date().toISOString()}] 🚀 Initiating request to: ${API_URL}`);
    const startTime = process.hrtime();

    const client = API_URL.startsWith('https') ? https : http;

    client.get(API_URL, (res) => {
        let data = '';

        // A chunk of data has been received.
        res.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        res.on('end', () => {
            const diff = process.hrtime(startTime);
            const timeTakenMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2); // Convert to milliseconds

            console.log(`[${new Date().toISOString()}] ✅ Status Code: ${res.statusCode}`);
            console.log(`[${new Date().toISOString()}] ⏱️  Time taken: ${timeTakenMs} ms`);
            
            // Print out a preview of the response (limiting to 200 chars to avoid console spam)
            const responsePreview = data.length > 200 ? data.substring(0, 200) + '... (truncated)' : data;
            console.log(`[${new Date().toISOString()}] 📦 Response: ${responsePreview}`);
            console.log('-'.repeat(60));
        });

    }).on('error', (err) => {
        const diff = process.hrtime(startTime);
        const timeTakenMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);

        console.error(`[${new Date().toISOString()}] ❌ Error: ${err.message}`);
        console.error(`[${new Date().toISOString()}] ⏱️  Failed after: ${timeTakenMs} ms`);
        console.log('-'.repeat(60));
    });
}

console.log(`=======================================================`);
console.log(`Starting API Pinger Script`);
console.log(`Target URL: ${API_URL}`);
console.log(`Interval  : Every ${INTERVAL_MINUTES} minutes`);
console.log(`=======================================================`);

// Run immediately the first time
pingApi();

// Schedule to run every X minutes
setInterval(pingApi, INTERVAL_MS);
