import React, { createContext, useState } from 'react';
import { MainLayout } from './MainLayout';
import { LogIn } from './LogIn';


import {Routes, Route, useNavigate,} from 'react-router-dom'

import './scss/all.scss';
import { Profile } from './Profile';
import { Home } from './Home';
import { Workmates } from './Workmates';
import { AddNewWorkmates } from './AddNewWorkmates';
import { ProfileUser } from './ProfileUser';
import { ResetPassword } from './ResetPassword';
export const ProfileContext = createContext()
function App() {
  
  const navigate = useNavigate()
  const [preview, setPreview] = useState();
  const [name, setName] = useState();
  const [navphone, setNavPhone] = useState();
  const [navpoint, setNavPoint] = useState();
  const [fetch, setFetch] = useState(false)

  console.log(name);

  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")));


  // if (!localStorage.getItem('profile')) {
  //   return <LogIn />;
  // }


  return (
    <div className="App">

     <ProfileContext.Provider value={{profile,setProfile}}>
      <Routes>
        <Route path='/' element={<MainLayout fetch={fetch} name={name} navphone={navphone} preview={preview}/>}>
            <Route index element={<Home/>}/>
            <Route path='profile' element={<Profile setNavPoint={setNavPoint} setName={setName} preview={preview} setPreview={setPreview}/>}/>
            <Route path='workmates' element={<Workmates fetch={fetch} setFetch={setFetch} />}/>
            <Route path='workmates/user/:id/' element={<ProfileUser preview={preview} setPreview={setPreview}/>}/>
          </Route>
          <Route path='/add-new-workmates' element={<AddNewWorkmates/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          
        </Routes>
     </ProfileContext.Provider>

    </div>
  );
}

export default App;
