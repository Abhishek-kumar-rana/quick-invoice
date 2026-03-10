import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/Landingpage/Landingpage';
import Dashboard from './pages/Dashboard';
import MainPage from './pages/MainPage';
import PreviewPage from './pages/PreviewPage';
import MenuBar from './components/MenuBar';
import UserSyncHandler from './components/UserSyncHandler';
import { RedirectToSignIn, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';


const App = () => {
  return (
     <BrowserRouter>
     <UserSyncHandler />
     <MenuBar />
     <Toaster position="top-right" />
     <Routes>
      <Route path="/" element={
        <LandingPage/>
        // <>
        // <SignedIn>
        //   <LandingPage/>
        // </SignedIn>
        // <SignedOut>
        //   <RedirectToSignIn />
        // </SignedOut>
        // </>
        } />
     <Route path="/dashboard" element={
       <>
        <SignedIn>
       <Dashboard/>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        </>
      } />
     <Route path="/generate" element={
       <>
        <SignedIn>
       <MainPage/>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        </>
      } />
     <Route path="/preview" element={
       <>
        <SignedIn>
       <PreviewPage/>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        </>
      } />
     </Routes>
     </BrowserRouter>
  )
}

export default App;
