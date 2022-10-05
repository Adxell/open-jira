import { Paper, List } from '@mui/material';
import React, { FC, useMemo, useContext, DragEvent} from 'react'
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import style from './EntryList.module.css'

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({status}) => {
  const {entries, updateEntry} = useContext(EntriesContext)
  const {isDragging, endDragging} = useContext(UIContext)


  const entriesByStatus = useMemo(()=> entries.filter(entries => entries.status === status), [entries]) 
  
  const allowDrop = (event: DragEvent<HTMLDivElement>) =>{
    event.preventDefault()
  }
  const onDropEntry = (event: DragEvent<HTMLDivElement>) =>{
    const id = event.dataTransfer.getData('text');
    const entry = entries.find(e => e._id === id)!;
    entry.status = status;
    updateEntry(entry)
    endDragging()
  }


  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? style.dragging : ''}
    >
      <Paper sx={{ height: 'calc(100vh - 250px)', overflowY: 'auto', background: 'trasparent', padding: '1px 5px'}}>
              {/* Cambiara dependiendo si estoy haciendo drag o no */}
          <List sx={{opacity: isDragging ? 0.3 : 1, transition:'all .3s'}}>
              {
                entriesByStatus.map(entry => (
                  <EntryCard key={entry._id} entry={entry}/>
                ))
              }
          </List>
      </Paper>
    </div>
  )
}
