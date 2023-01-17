import { CookieOptions } from 'express';

export const authConfig = {
    accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '5m',
        issuer: process.env.AUTH_ISSUER || 'Rabbit',
    },
    refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET',
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '5m',
        issuer: process.env.AUTH_ISSUER || 'Rabbit',
    }
};

export const COOKIE_DOMAIN = (process.env.COOKIE_DOMAIN as string) || 'localhost';

export const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    domain: COOKIE_DOMAIN,
    secure: true,
    sameSite:
        process.env.NODE_ENV === 'production'
            ? 'strict'
            : process.env.NODE_ENV === 'staging'
                ? 'lax'
                : 'none',
};
