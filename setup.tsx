import {CONFIG_KEY, validateMapping} from './config.mjs';
import React, {useState} from 'react';
import {renderWidget, usePlugin} from '@remnote/plugin-sdk';
function Setup(){
  const plugin=usePlugin();
  const [value,setValue]=useState('');
  const [status,setStatus]=useState('');
  const save=async()=>{
    try {
      const records=validateMapping(JSON.parse(value));
      await plugin.storage.setSynced(CONFIG_KEY,records);
      setValue('');setStatus('Saved recording configuration to your RemNote plugin storage.');
    }catch(error){setStatus(error.message || 'Could not save configuration.');}
  };
  return <div style={{padding:20,fontFamily:'sans-serif'}}><h2>Flashcard audio configuration</h2><p>Import your card-to-audio JSON configuration. It is stored using RemNote synced plugin storage, separately from the downloadable plugin. Only import recording links you are authorized to use.</p><textarea aria-label="Recording configuration" value={value} onChange={e=>setValue(e.target.value)} style={{width:'100%',height:160}}/><p><button onClick={()=>void save()}>Save recordings</button> <button onClick={()=>void plugin.widget.closePopup()}>Close</button></p><p role="status">{status}</p></div>;
}
renderWidget(Setup);
