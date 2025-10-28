import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { api } from '../../lib/api'
import { toast } from 'react-toastify'
export default function TicketForm(){
  const { id } = useParams()
  const nav = useNavigate()
  const {register, handleSubmit, setValue, formState:{errors}} = useForm()
  useEffect(()=>{ if(id){ api.list().then(list=>{ const t = list.find((x:any)=>x.id===id); if(t){ setValue('title',t.title); setValue('status',t.status); setValue('description',t.description||''); } }).catch(()=>{}) } },[id])
  async function onSubmit(data:any){
    try{
      if(id) await api.update(id, data)
      else await api.create(data)
      toast.success('Saved')
      nav('/tickets')
    }catch(e:any){ toast.error(e.message||'Failed to save') }
  }
  return (
    <div style={{maxWidth:720,margin:'24px auto',padding:24,background:'white',borderRadius:12}}>
      <h2>{id?'Edit Ticket':'New Ticket'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{marginBottom:12}}>
          <label>Title<input {...register('title',{required:true})} /></label>
          {errors.title && <div style={{color:'#b91c1c'}}>Title is required</div>}
        </div>
        <div style={{marginBottom:12}}>
          <label>Status
            <select {...register('status',{required:true})} defaultValue='open'>
              <option value='open'>open</option>
              <option value='in_progress'>in_progress</option>
              <option value='closed'>closed</option>
            </select>
          </label>
          {errors.status && <div style={{color:'#b91c1c'}}>Status is required</div>}
        </div>
        <div style={{marginBottom:12}}>
          <label>Description<textarea {...register('description',{maxLength:1000})}></textarea></label>
        </div>
        <div>
          <button type='submit'>{id?'Update':'Create'}</button>
          <button type='button' onClick={()=>nav('/tickets')} style={{marginLeft:8}}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
