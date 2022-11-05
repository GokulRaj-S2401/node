import './table.css'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

const Table  = (props) =>{

    const [isHide,setIsHide]= useState(false)
    const name = useRef()
    const email = useRef()
    const message = useRef()
    const subject = useRef()

    const [value,setValue] = useState("")
    const [svalue,setSvalue] = useState()

    const validate = () =>{
        if(name.current.value.length !== 0 && email.current.value.length !== 0 ){
            props.add(name.current.value,email.current.value)
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
                        <p>Email</p>
                        <input type="text" ref={email} />
                    </div>
                    <div>
                        <button className='save' onClick={()=>validate()} > save </button>
                    </div>
                </div>: ''
            }
            <table  width="100%" >
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>
                <tbody>
                   { props.data.length !== 0 ?  props.data.map((val,indx)=>{
                    return(
                        <tr key={indx} >
                        <td> {indx+1} </td>
                        <td> { val.name } </td>
                        <td> { val.email } </td>
                    </tr>
                    )
                    }) : <tr></tr>
                } 
                </tbody>
            </table>
            <div className='bottom' align="center" >
                <textarea ref={subject} onChange={()=>setSvalue(subject.current.value)} placeholder='Type subject Here.....' style={{minHeight:'30px',marginBottom:'10px'}}></textarea>
                <textarea ref={message} onChange={()=>setValue(message.current.value)} placeholder='Type message Here.....' style={{minHeight:'60px'}}></textarea>
                {
                    value.length !== 0?<button onClick={()=>props.send(value,svalue)}  className='send'>send to all</button>:''
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