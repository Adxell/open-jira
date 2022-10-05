import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './'
import { v4 as uuidv4} from "uuid"
import { entriesApi } from '../../apis';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC<PropsWithChildren> = ({children}) => {
   const [state, dispatch] = useReducer(entriesReducer,Entries_INITIAL_STATE)
   const addNewEntry = async (description: string)=>{
    const {data} = await entriesApi.post<Entry>('/entries', {description})
    dispatch({type:'[Entry] Add-entry', payload: data})
   }
   
   const updateEntry = async ({_id, description, status }: Entry) =>{
        try{
            const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status})
            dispatch({type: '[Entry] Entry-updated', payload: data})

            
        }catch(error){
            console.log({error})
        }
    }
    const refreshEntries = async() => {
        const {data} = await entriesApi.get<Entry[]>('/entries')
        dispatch({type: '[Entry] Reresh-Data', payload: data})
    }
    useEffect(() => {
        refreshEntries()
    }, [])
   return (
    <EntriesContext.Provider value={{
        ...state,

        addNewEntry,
        updateEntry
        }}>
     {children}
    </EntriesContext.Provider>
   )
}

