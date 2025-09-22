import serverless from 'serverless-http';
import app from '../index.js'; // your Express app that exports "app"
import { connectDB } from '../db.js';

const handler = serverless(app);

// Ensure Mongo is connected for each cold start / invocation
export default async (req, res) => {
    await connectDB();
    return handler(req, res);
};
