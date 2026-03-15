import { store } from '@/store'
import React, { memo } from 'react'
import { Provider } from 'react-redux'

function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default memo(StoreProvider)