import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/tickets/Tickets'
import TicketForm from './pages/tickets/TicketForm'
import { getSession } from './utils/session'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function Protected({children}:{children:JSX.Element}){
  const s = getSession()
  if(!s) return <Navigate to="/auth/login" replace />
  return children
}

export default function App(){
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/auth/login' element={<Login/>} />
        <Route path='/auth/signup' element={<Signup/>} />
        <Route path='/dashboard' element={<Protected><Dashboard/></Protected>} />
        <Route path='/tickets' element={<Protected><Tickets/></Protected>} />
        <Route path='/tickets/new' element={<Protected><TicketForm/></Protected>} />
        <Route path='/tickets/:id/edit' element={<Protected><TicketForm/></Protected>} />
        <Route path='*' element={<div style={{padding:40}}>Page not found</div>} />
      </Routes>
      <ToastContainer />
    </>
  )
}




// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import Landing from './pages/Landing'
// import Login from './pages/auth/Login'
// import Signup from './pages/auth/Signup'
// import Dashboard from './pages/Dashboard'
// import Tickets from './pages/tickets/Tickets'
// import TicketForm from './pages/tickets/TicketForm'
// import { getSession } from './utils/session'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import ThemeToggle from './pages/ThemeToggle'

// function Protected({ children }: { children: JSX.Element }) {
//   const s = getSession()
//   if (!s) return <Navigate to="/auth/login" replace />
//   return children
// }

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
//       <div className="fixed top-4 right-4 z-50">
//         <ThemeToggle />
//       </div>

//       <Routes>
//         <Route path='/' element={<Landing />} />
//         <Route path='/auth/login' element={<Login />} />
//         <Route path='/auth/signup' element={<Signup />} />
//         <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
//         <Route path='/tickets' element={<Protected><Tickets /></Protected>} />
//         <Route path='/tickets/new' element={<Protected><TicketForm /></Protected>} />
//         <Route path='/tickets/:id/edit' element={<Protected><TicketForm /></Protected>} />
//         <Route path='*' element={<div style={{ padding: 40 }}>Page not found</div>} />
//       </Routes>

//       <ToastContainer />
//     </div>
//   )
// }


