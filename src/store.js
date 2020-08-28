import React from 'react';
import io from 'socket.io-client'



const initState = {
    general:[
        {from:'Paola', msg:'Bienvenido a academlo'},
        {from:'Oscar', msg:'Bienvenido a academlo'},
        {from:'Georg', msg:'Bienvenido a academlo'}
    ],
    topic2:[
        {from:'Orlando', msg:'continuamos en el mundo de react'},
        {from:'Orlando', msg:'continuamos en el mundo de react'},
        {from:'Orlando', msg:'continuamos en el mundo de react'},
    ]
}
export const CTX = React.createContext(initState);

function reducer(state, action){
    const{from,msg,topic} = action.payload;
    switch(action.type){
        case 'RESEIVE_MESSAGE':
            return{
                ...state,
                [topic]:[
                    ...state[topic],
                    {
                        from,
                        msg
                    }
                ]
            }
        default:
            return state
    }
}

let socket;

function sendChatAction(value){
    socket.emit('chat message', value);
}


 export default function Store(props){
     
    const [allChats, dispatch]= React.useReducer(reducer, initState)
    
    if(!socket){
        socket = io(':3001')
        socket.on('chat message', function(msg){
            dispatch({type: 'RESEIVE_MESSAGE', payload: msg});
          });
    }
     
    const user = 'paola ' + Math.random(100).toFixed(2)
    
   
    
     return(
         <CTX.Provider value={allChats, sendChatAction, user}>
             {props.children}
         </CTX.Provider>
     )
 }
