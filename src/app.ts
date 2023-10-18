// Import necessary modules
import express, { Express, Request, Response } from 'express';

// Create an instance of Express
const app: Express = express();

// Define a route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
