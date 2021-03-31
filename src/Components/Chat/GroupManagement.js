import React,{useState,useContext,useEffect} from 'react'

import styles from "./Chat.module.css";
import { LoginContext } from "../../Context/loginContext";


const GroupManagement = ({setGroup, setGroupSet, socket, setGroupToggle}) => {

    const {
        LoginDetail : {username, id}
    } = useContext(LoginContext);

    useEffect(()=>{
        socket.on("joinComplete",data=>{
            setGroupToggle(false);
            setGroupSet(set => ({[data.g_id]:data,...set}));
            setGroup(data);
        });

        socket.on("createComplete",data=>{
            setGroupToggle(false);
            setGroupSet(set => ({[data.g_id]:data,...set}));
            setGroup(data);
        });

        socket.on("createJoimError",(data)=>{
            setGroupToggle(false);
            console.log(data);
        });

        return ()=>{
            socket.off("joinComplete");
            socket.off("createComplete");
            socket.off("createJoimError");
        }
    })

    const [createG,setCreateG] = useState("");
    const [joinG,setJoinG] = useState("");
    const createGroup = (e)=>{
        e.preventDefault();
        if(createG.length===0) return;
        socket.emit("createGroup",{g_name:createG,a_name:username,a_id:id});
    }

    const joinGroup = (e)=>{
        e.preventDefault();
        if(joinG.length===0) return;
        socket.emit("joinGroup",{g_id:joinG,u_id:id,u_name:username});
    }
    
    return (
        <div className={styles.groupManagement} onClick={() => setGroupToggle(value => !value)}>
            <div className={styles.formContainer} onClick={(e)=>e.stopPropagation()}>
                <form onSubmit={createGroup}>
                    <label>Create a new Group:</label>
                    <div>
                        <input type="text" onChange={(e)=> setCreateG(e.target.value)} placeholder="Group Name"/>
                        <input type="submit" value="Create"/>
                    </div>     
                </form>
                <form onSubmit={joinGroup}>
                    <label>Join a group:</label>
                    <div>
                        <input type="text" onChange={(e)=> setJoinG(e.target.value)} placeholder="Group Code"/>
                        <input type="submit" value="Join"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GroupManagement
