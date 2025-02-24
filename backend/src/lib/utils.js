import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Missing JWT_SECRET environment variable");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevents client-side JavaScript access
        sameSite: 'lax', // Helps prevent CSRF
        secure: process.env.NODE_ENV === 'production', // Secure in production
        path: '/', // Ensure the cookie is available across the app
    });

    return token;
};
