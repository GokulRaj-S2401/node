import './table.css'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

const Table  = (props) =>{

    const [isHide,setIsHide]= useState(false)
    const name = useRef()
    const pno = useRef()
    const message = useRef()
    const [pNo,setPNo] = useState('')
    const [value,setValue] = useState("")

    const validate = () =>{
        if(name.current.value.length !== 0 && pno.current.value.length !== 0 ){
            props.add(name.current.value,pno.current.value)
        }
    }

    return (
        <div className="tableContainer" >
            <div align="right" >
                <button className='add' onClick={()=>setIsHide(!isHide)} > 
                {
                
                isHide? <ion-icon name="close-outline"></ion-icon> : <ion-icon name="add"></ion-icon> 
                }
                </button>
            </div>
            {
                isHide ? 
                <div className="card" >
                    <div>
                        <p>Name</p>
                        <input type="text" ref={name} />
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <input type="text" ref={pno} onChange={()=>setPNo(pno.current.value)} />
                    </div>
                    <div>
                        {
                           
                         pNo.length === 10 ? 
                         <button className='save' onClick={()=>validate()} > save </button> :
                         null
                       
                        }
                    </div>
                </div>: ''
            }
            <table  width="100%" >
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>NAME</th>
                        <th>PHONE NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                   { props.data.length !== 0 ?  props.data.map((val,indx)=>{
                    return(
                        <tr key={indx} >
                        <td> {indx+1} </td>
                        <td> { val.name } </td>
                        <td> { val.pno } </td>
                    </tr>
                    )
                    }) : <tr></tr>
                } 
                </tbody>
            </table>
            <div className='bottom' align="center" >
                <textarea ref={message} onChange={()=>setValue(message.current.value)} placeholder='Type message Here.....' style={{minHeight:'60px'}}></textarea>
                {
                    value.length !== 0?<button onClick={()=>props.send(value)}  className='send'>send to all</button>:''
                }
            </div>
            {
                props.percent !==0 ?
                <div className='loading' >
                    {
                        <div> <h5> Completed </h5> </div>  
                    }
                        <Link to='/' className='send' > Retake </Link>
                </div>: ''
            }
        </div>
    )
}

export default Table