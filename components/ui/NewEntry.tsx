import React,{useState, ChangeEvent, useContext} from 'react'

import { Button, Box, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
    const {addNewEntry} = useContext(EntriesContext)
    const {isAddingEntry, setIsAddingEntry} = useContext(UIContext)

    
    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const onTextFieldChanges = (event:ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value)
    }
    const onSave = () =>{
        if(inputValue.length === 0) return
        
        addNewEntry(inputValue)
        setIsAddingEntry(false)
        setTouched(false)
        setInputValue('')
    }
    return (
    <Box sx={{marginBottom: 2, paddingX: 1}}>
        {
            isAddingEntry ? (
                <>
                <TextField 
                    fullWidth
                    sx={{marginTop: 2, marginBottom:1}}
                    placeholder="Nueva entrada"
                    autoFocus
                    multiline
                    label='Nueva entrada'
                    helperText={inputValue.length <= 0  && touched && 'ingrese un valor'}
                    error={inputValue.length <= 0  && touched}
                    value={inputValue}
                    onChange={onTextFieldChanges}
                    onBlur={() => setTouched(true)}
                />
                <Box display='flex' justifyContent='space-between'>   
                    <Button
                        variant='text'
                       onClick={()=> setIsAddingEntry(false)}

                        >
                        Cancelar
                    </Button>
                    <Button
                        variant='outlined'
                        color='secondary'
                        endIcon={<SaveIcon/>}
                        onClick={onSave} 
                    >
                        Guardar
                    </Button>
                </Box>
                </>
            ):
            (
            <Button
                startIcon={<AddCircleOutlineOutlinedIcon/>}
                fullWidth
                variant='outlined'
                onClick={()=> setIsAddingEntry(true)}
            >
                Agregar nueva entrada
            </Button>
            )

        }


    </Box>
  )
}
