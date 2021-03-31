import React,{ useEffect, useRef, useState } from 'react'

import { createToken } from "./helper";

function Members({socket,group}) {
    const mtoken = useRef();

    

    useEffect(() => {
        mtoken.current = createToken();

        socket.emit("getMembers",{mtoken:mtoken.current, g_id:group.g_id});

        socket.on("allMembers",(data)=>{
            const { re_mtoken, onlineMembers, offlineMembers } = data;
            if(re_mtoken!==mtoken.current) return;

            const onlineset = {};
            onlineMembers.forEach((member)=>{
                onlineset[member.user_id] = member;
            });
            setOnline(onlineset);

            const offlineSet = {};
            offlineMembers.forEach((member)=>{
                offlineSet[member.user_id] = member;
            });
            setOffline(offlineSet);
        })

        socket.on("newOnline",({id,name})=>{
            let state = {...online};
            delete state[id];
            setOnline(state);


        })


        socket.on("")
        return () =>{

        }
    },[group])

    return (
        <div>
            
        </div>
    )
}

export default Members
