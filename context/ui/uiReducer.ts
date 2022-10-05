import { UIState } from './';

type UItype = 
| { type: 'UI - Open Sidebar'}
| { type: 'UI - Close Sidebar'}
| { type: 'UI - setIsAddingEntry', payload: boolean}
| { type: 'UI - Start Dragging'}
| { type: 'UI - End Dragging'}

export const uiReducer=(state: UIState, action: UItype): UIState=>{

    switch (action.type) {
        case 'UI - Open Sidebar':
           return{
               ...state,
               sidemenuOpen: true
           }
        case 'UI - Close Sidebar':
           return {
               ...state,
               sidemenuOpen: false
           }
        case 'UI - setIsAddingEntry':
           return {
               ...state,
               isAddingEntry: action.payload
           }
        case 'UI - Start Dragging':
           return {
               ...state,
               isDragging: true
           }
        case 'UI - End Dragging':
           return {
               ...state,
               isDragging: false
           }
        default:
            return state;
    }
}