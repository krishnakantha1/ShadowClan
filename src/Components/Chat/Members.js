import React,{ useEffect, useRef, useState } from 'react'
import styles from "./Members.module.css";
import { createToken } from "./helper";

export const Members = ({socket,group}) => {
    const mtoken = useRef();

    const[members,setMembers] = useState({});

    useEffect(() => {
        setMembers({});
        mtoken.current = createToken();

        socket.emit("getMembers",{mtoken:mtoken.current, g_id:group.g_id});

        socket.on("allMembers",(data)=>{
            const { re_mtoken, membersList } = data;
            if(re_mtoken!==mtoken.current) return;
            let mem = {};
            membersList.forEach(m=>{
                mem[m.user_id] = m;
            })
            setMembers(mem);
        })

        socket.on("userOnline",(user)=>{
            
            setMembers((mem)=> {
                return {...mem,[user.user_id]:user};
            })
        })

        socket.on("test",(user)=>{
            setMembers((mem)=> {
                return {...mem,[user.user_id]:user};
            })
        })

        socket.on("userOffline",(user)=>{
            setMembers((mem)=> {
                return {...mem,[user.user_id]:user};
            })
        })

        return () =>{
            socket.off("allMembers");
            socket.off("userOnline");
            socket.off("userOffline");
            socket.off("test");
        }
    },[group])

    const copy=(e)=>{
        const temp = document.createElement("input");
        temp.style.position='absolute';
        temp.value = group.g_id;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
    }

    return (
        <div className={styles.Members}>
            <header>
                <h2>Members</h2>
                <button title="copy group code" onClick={()=>copy()}>Code</button>
            </header>
            <p className={styles.status}>Online</p>
            <div className={styles.onlineContainer}>
            {
                Object.keys(members).map((key) =>{
                    if(members[key].online) return (<Online key={members[key].user_id} member={members[key]}/>)
                })
            }
            </div>
            
            <p className={styles.status}>Offline</p>
            <div className={styles.offlineContainer}>
            {
                Object.keys(members).map((key) =>{
                    if(!members[key].online) return (<Online key={members[key].user_id} member={members[key]}/>)
                })
            }
            </div>
        </div>
    )
}

const Online = ({member})=>{
    return (
        <div className={styles.member}>
            <span className={styles.onlineTag}></span>
            <p>{member.user_name}</p>
            {member.admin_id!==null && (<div className={styles.crown}></div>)}
        </div>
    )
}

const Offline = ({member})=>{
    return (
        <div className={styles.member}>
            <span className={styles.offlineTag}></span>
            <p>{member.user_name}</p>
            {member.admin_id!==null && (<div className={styles.crown}></div>)}
        </div>
    )
}