import React, {useState} from 'react';
import {renderWidget, usePlugin} from '@remnote/plugin-sdk';
function Setup(){
  const plugin=usePlugin();
  const [value,setValue]=useState('');
  const [status,setStatus]=useState('');
  const save=async()=>{
    try {
      const records=JSON.parse(value);
      const entries=Object.entries(records);
      if(entries.length!==3) throw new Error('This trial requires exactly three cards.');
      for(const [cardId,record] of entries){
        const r=record as any;
        if(!cardId || typeof r.remId!=='string' || !r.remId || !['question','answer'].every(side=>typeof r[side]==='string' && new URL(r[side]).protocol==='https:')) throw new Error('Each card needs its Rem ID and HTTPS question and answer recordings.');
      }
      await plugin.storage.setSynced('trial-recordings',records);
      setValue('');setStatus('Saved three trial cards. Configuration stays in your RemNote account.');
    }catch(error){setStatus(error.message || 'Could not save configuration.');}
  };
  return <div style={{padding:20,fontFamily:'sans-serif'}}><h2>Algieba trial recordings</h2><p>Import the three-card configuration. It is saved in RemNote, never in the public GitHub repository.</p><textarea aria-label="Trial recording configuration" value={value} onChange={e=>setValue(e.target.value)} style={{width:'100%',height:160}}/><p><button onClick={()=>void save()}>Save trial recordings</button> <button onClick={()=>void plugin.widget.closePopup()}>Close</button></p><p role="status">{status}</p></div>;
}
renderWidget(Setup);
