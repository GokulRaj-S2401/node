import STable from './STable'
import { useState } from 'react'

const Sms = () =>{
    const [tableData,setTableData] = useState([])
    const add = (iname,ipno) =>{
        setTableData([...tableData,{name:iname,pno:ipno}])
        
    }

    const [percent,setPercent] = useState(0)

    const send = (val)=>{
        tableData.map((d,idx)=>{
            let item = {to:d.pno,message:val}
            console.log(item)
            fetch('http://localhost:9000/sms',{
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
                if(val.status==="200"){
                    console.log(idx);
                    let c  = ((idx+1)/tableData.length)*100
                    console.log(c);
                    setPercent(c)
                }
            })
        })
    }
    return(
        <div>
            <STable add={add} send={send} data={tableData} percent ={percent} />
        </div>
    )
}

export default Sms