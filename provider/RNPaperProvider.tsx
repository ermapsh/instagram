import React, { memo, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export type PaperProviderProps = {
    children: React.ReactNode;
};

function RNPaperProvider({ children }: PaperProviderProps) {
    const colorScheme = useColorScheme();
    useEffect(() => {
        console.log("RNPaperProvider - colorScheme:", colorScheme);
    }, [colorScheme])

    return (
        <PaperProvider>
            {children}
        </PaperProvider>
    )
}

export default memo(RNPaperProvider);