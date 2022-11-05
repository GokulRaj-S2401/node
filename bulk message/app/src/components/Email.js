import Table from './Table'
import { useState } from 'react'

const Email = () =>{
    const [tableData,setTableData] = useState([])
    const add = (iname,iemail) =>{
        setTableData([...tableData,{name:iname,email:iemail}])
        
    }

    const [percent,setPercent] = useState(0)
    const [count,setCount] = useState(0)

    const send = (val,sval)=>{
        tableData.map((d,idx)=>{
            let item = {to:d.email,subject:sval,message:val}
            console.log(item)
            fetch('http://localhost:9000/email',{
                method:'POST',
                mode:'cors',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(item)
            })
            .then((res)=>res.json())
            .then((val)=>{
                console.log(val.status);
                if(val.status=="200"){
                    console.log(idx);
                    let c  = Math.floor(((idx+1)/tableData.length)*100)
                    console.log(c);
                    setPercent(c)
                }
            })
        })
    }
    return(
        <div>
            <Table add={add} send={send} data={tableData} percent ={percent} />
        </div>
    )
}

export default Email