import React from 'react'

export default function Landing() {
  return (
    <main style={{background:'#f8fafc',minHeight:'100vh'}}>
      <section style={{position:'relative',overflow:'hidden'}}>
        <div style={{maxWidth:1440,margin:'0 auto',padding:48}}>
          <div style={{display:'flex',gap:20,alignItems:'center',flexWrap:'wrap'}}>
            <div style={{flex:1}}>
              <h1 style={{fontSize:36}}>TicketIQ — Intelligence for ticket managenment</h1>
              <p style={{opacity:0.85}}>Create, track and resolve tickets with a simple workflow.</p>
              <div style={{marginTop:16}}>
                <a href="/auth/login" style={{marginRight:12, textDecoration:"none"}}>Login</a>
                <a href="/auth/signup" style={{textDecoration:"none"}}>Get Started</a>
              </div>
            </div>
            <div style={{width:320,height:180,background:'white',borderRadius:20,boxShadow:'0 8px 30px rgba(2,6,23,0.08)',display:'flex',alignItems:'center',justifyContent:'center'}}>Feature Box</div>
          </div>
        </div>
        <div aria-hidden style={{position:'absolute',left:-60,top:-60,width:192,height:192,borderRadius:'50%',background:'#c7b9ff',opacity:0.6}} />
        <div aria-hidden style={{position:'absolute',right:32,top:96,width:128,height:128,borderRadius:'50%',background:'#fde68a',opacity:0.6}} />
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{display:'block',width:'100%'}} aria-hidden>
          <path d="M0,40 C200,120 400,0 720,40 C1040,80 1240,10 1440,40 L1440,120 L0,120 Z" fill="#ffffff" />
          </svg>
      </section>
    </main>
  )
}

