import crypto from 'crypto';

export const hashPhoneNumber = (phoneNumber: string): string => {
    return crypto.createHash('sha256').update(phoneNumber).digest('hex');
};
