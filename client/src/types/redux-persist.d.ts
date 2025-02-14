declare module 'redux-persist/es/persistStore' {
    import { Store } from 'redux';
    import { Persistor } from 'redux-persist';
    
    export default function persistStore(store: Store): Persistor;
}
