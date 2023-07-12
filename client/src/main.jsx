import React from 'react'
// import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom';

import App from './App.jsx'
import './index.css'
import authReducer from "./state/slice"
import { configureStore } from "@reduxjs/toolkit"
import { Provider} from "react-redux"
import {
persistStore,
persistReducer,
FLUSH,
REHYDRATE,
PAUSE,
PERSIST,
PURGE,
REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from 'redux-persist/integration/react'
const persistConfig = { key:"root", storage, version:1}

const persistedReducer=persistReducer(persistConfig,authReducer)
// const saveState= (state)=>{
// try{
//   const serializedState=JSON.stringify(state)
//   localStorage.setItem("reduxState",serializedState)
// }catch(error){
//   console.error(error)
// }
// }


// const loadState= () => {
// try{
// const serializedState=localStorage.getItem("reduxState");
// if(!serializedState){
//   return undefined
// }
// return JSON.parse(serializedState)
// }catch(error){
//   console.error(error)
// }
// }

// const persistedState=loadState();
const store=configureStore({
  reducer: persistedReducer,
//  preloadedState:persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

})
// store.subscribe(()=>{
// saveState(store.getState())
// })
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
