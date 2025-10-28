import React, {useEffect, useState} from 'react'
import { api } from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Tickets(){
  const [tickets,setTickets]=useState<any[]>([])
  const nav = useNavigate()

  useEffect(()=>{ load() },[])
  function load(){ api.list().then(setTickets).catch(()=>toast.error('Failed to load tickets. Please retry.')) }
  function remove(id:string){
    if(!confirm('Delete this ticket?')) return
    api.remove(id).then(()=>{ toast.success('Deleted'); load() }).catch(()=>toast.error('Failed to delete'))
  }
  return (

    <div style={{maxWidth:1000,margin:'24px auto',padding:24}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Tickets</h2>
        <div>
          <button onClick={()=>nav('/tickets/new')}>New Ticket</button>
          <a href="http://localhost:5173/dashboard" style={{marginLeft:12, textDecoration:"none"}}>Home</a>
        </div>
      </header>
      <div style={{display:'grid',gap:12,marginTop:16}}>
        {tickets.length===0 && <div style={{padding:20,background:'white',borderRadius:12}}>No tickets yet</div>}
        {tickets.map(t=>(
          <div key={t.id} style={{background:'white',padding:12,borderRadius:12,display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 6px 18px rgba(2,6,23,0.04)'}}>
            <div>
              <div style={{fontWeight:600}}>{t.title}</div>
              <div style={{fontSize:13,opacity:0.7}}>{t.description||'—'}</div>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <span style={{padding:'6px 10px',borderRadius:999,background: t.status==='open'?'#ecfdf5': t.status==='in_progress'?'#fff7ed':'#f3f4f6'}}>{t.status}</span>
              <button onClick={()=>nav(`/tickets/${t.id}/edit`)}>Edit</button>
              <button onClick={()=>remove(t.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
