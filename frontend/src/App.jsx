import { useState } from 'react'
import { NavbarSimple as Header } from './components/header.jsx';
import {SimpleFooter as Footer} from './components/footer.jsx';
import './App.css'
import UserInfoCard  from './components/viewMentors.jsx';
function App() {
  

  return (
    <>
      <Header />
      <UserInfoCard name={"sathish"} email={"sathish111j@gmail.com"} id={1} />
      {/* <Footer/> */}
    </>
  )
}

export default App
