// ssl.ts

import { initializeSslPinning } from 'react-native-ssl-public-key-pinning';
const api_token = process.env.EXPO_PUBLIC_API_ACCESS_TOKEN;

export const initializeSSL = async () => {

    try {

        if (__DEV__) {
            console.warn('SSL pinning skipped in DEV');
            return;
        }

        if (!api_token) {
            console.warn('API token for SSL pinning is missing. SSL pinning will not be initialized.');
            return;
        }

        await initializeSslPinning({

            /**
             * Android Emulator:
             * 10.0.2.2
             *
             * iOS Simulator:
             * localhost
             *
             * Production:
             * api.yourdomain.com
             */

            'localhost': {
                includeSubdomains: true,
                publicKeyHashes: [
                    api_token || ""
                ],
            },

        });

        console.log('SSL pinning initialized');

    } catch (error) {

        console.log('SSL pinning error:', error);
    }
};