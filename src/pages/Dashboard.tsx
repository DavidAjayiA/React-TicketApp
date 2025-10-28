import React, {useEffect, useState} from 'react'
import { api } from '../lib/api'
import { useNavigate } from 'react-router-dom'
import { clearSession } from '../utils/session'

export default function Dashboard(){
  const [tickets, setTickets] = useState<any[]>([])
  const nav = useNavigate()
  useEffect(()=>{ api.list().then(setTickets).catch(()=>{}) },[])
  const total = tickets.length
  const open = tickets.filter(t=>t.status==='open').length
  const closed = tickets.filter(t=>t.status==='closed').length
  return (

    <div style={{maxWidth:1200,margin:'24px auto',padding:24}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Dashboard</h2>
        <div>
          <button onClick={()=>nav('/tickets')}>Manage Tickets</button>
          <button onClick={()=>{ clearSession(); nav('/') }} style={{marginLeft:8}}>Logout</button>
        </div>
      </header>
      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginTop:18}}>
        <div style={{background:'white',padding:16,borderRadius:12,boxShadow:'0 6px 18px rgba(2,6,23,0.06)'}}><h3>Total tickets</h3><p>{total}</p></div>
        <div style={{background:'white',padding:16,borderRadius:12,boxShadow:'0 6px 18px rgba(2,6,23,0.06)'}}><h3>Open tickets</h3><p>{open}</p></div>
        <div style={{background:'white',padding:16,borderRadius:12,boxShadow:'0 6px 18px rgba(2,6,23,0.06)'}}><h3>Resolved tickets</h3><p>{closed}</p></div>
        <div style={{background:'white',padding:16,borderRadius:12,boxShadow:'0 6px 18px rgba(2,6,23,0.06)'}}><h3>Tickets due date</h3><p>{closed}</p></div>
                        <div style={{background:'white',padding:16,borderRadius:12,boxShadow:'0 6px 18px rgba(2,6,23,0.06)'}}><h3>Customer Satisfaction</h3><p>{open}</p></div>
                                <div style={{background:'white',padding:16,borderRadius:12,boxShadow:'0 6px 18px rgba(2,6,23,0.06)'}}><h3>High Priority Tickets</h3><p>{open}</p></div>
      </section>
    </div>
  )
}
