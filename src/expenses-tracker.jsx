import { useEffect, useRef, useState } from "react";
import {v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import './tracker.css'
import ClearIcon from '@mui/icons-material/Clear';
// // let ExpensesTracker = () =>{
// //     let [data,setdata] = useState(null)
// //     let [item,setitem] = useState([{todo:[],price:[]}])
// //     // let [abhishek,setabhishek] = useState([])
// //     let [number,setnumber] = useState(null)
// //     // let [price,setprice] = useState([])
// //     let HandleChange = (event) =>{
// //         let element = event.target.value
// //         setdata(element)
// //     }
// //     let Handlenumber = (event) =>{
// //         setnumber(event.target.value)
// //     }
// //     let HandleClick = () =>{
// //         if(data == '' && number == ''){
// //             alert("fill the data") 
// //         }
// //         else{
// //             setitem([...item,{todo : data, price : number}])
// //             console.log(...item)
// //             // setitem([...item,{price :number}])
// //             // item.map((abhishek)=>{
        
// //             //     if(abhishek){
// //             //         console.log("we have map")
// //             //         console.log(abhishek)
// //             //         console.log(abhishek.todo)
// //             //         console.log(abhishek.price)
// //             //     }
// //             //     else{
// //             //         console.log("we don't have")
// //             //     }
// //             // })
// //             // console.log(item.price)
// //             // console.log(item.todo)
// //         }
// //     }
    
// //     return(
// //         <>
// //         <div style={{display:"flex",flexDirection:"column"}}>
// //             <input type="text" value={data} onChange={HandleChange}/>
// //             <p>Item is required</p>
// //             <input type="number" value={number} onChange={Handlenumber}/>
// //             <p>Number is required</p>
// //             <div>
// //             <button onClick={HandleClick}>Click</button>
// //             </div>
// //         </div>
// //         <div>
// //             {
// //                 item.map((abhishek)=>{
// //                     <>  
// //                     <span>{abhishek ? 'yes': 'no'}</span>
// //                     {/* <span>{abhishek.price}</span> */}
// //                     </>
// //                 })
// //             }
// //         </div>
// //         </>
// //     )
// // }
// // export {ExpensesTracker}
// import { useState } from "react";

// let ExpensesTracker = () => {
//   let [data, setData] = useState('');
//   let [item, setItem] = useState([{todo:[],price:[]}]);
//   let [number, setNumber] = useState('');

//   // Handle input change for data
//   let HandleChange = (event) => {
//     let element = event.target.value;
//     setData(element);
//   };

//   // Handle input change for number
//   let HandleNumber = (event) => {
//     setNumber(event.target.value);
//   };

//   // Handle click to add item
//   let HandleClick = () => {
//     if (data === '' || number === '') {
//       alert("Fill the data");
//     } else {
//       setItem([...item, { todo: data, price: number }]);
//       setData(''); // Clear input field after adding
//       setNumber(''); // Clear number field after adding
//     }
//   };

//   return (
//     <>
//       <div style={{ display: "flex", flexDirection: "column" }}>
//         <input type="text" value={data} onChange={HandleChange} placeholder="Item" />
//         {/* {data === '' && <p>Item is required</p>} */}
        
//         <input type="number" value={number} onChange={HandleNumber} placeholder="Price" />
//         {/* {number === '' && <p>Price is required</p>} */}

//         <button onClick={HandleClick}>Add Expense</button>
//       </div>
      
//       <div>
//         {item.map((expense) => (
//           <div>
//             <span>Item: {expense.todo ? expense.todo : 'No Item'}</span><br />
//             <span>Price: {expense.price ? expense.price : 'No Price'}</span>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
const getMonthName = (monthIndex) => {
    const months = [
        "Jan", "Feb", "Mar", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    return months[monthIndex];
};
let ExpensesTracker = () =>{
    let [item,setitem] = useState('')
    let [number,setnumber] = useState('')
    let [data,setdata] = useState([])
    let [tot,settot] = useState(null)
    let divref = useRef()
    let pref1 = useRef()
    let pref2 = useRef()
    let Itemchange = (event) =>{
        setitem(event.target.value)
    }
    let Numberchange = (event) =>{
        setnumber(event.target.value)
    }
    let HandleClick = (event) =>{
        event.preventDefault()
        let Time = new Date()
        let min = Time.getMinutes();
        let hour = Time.getHours();
        let date = Time.getDate();
        let month = getMonthName(Time.getMonth())
        if(item == '' || number == '')
        {
            pref1.current.style.display = "block"
            pref2.current.style.display = "block"
        }
        else{
            setdata([...data, {product : item, price: parseFloat(number), id: uuidv4(),Hour:hour,Min: min > 10 ? 0+min : min,Date:date,Month:month}])
            console.log(...data)
            setitem('')
            setnumber('')
        }
    }
    let HanldeDelete = (del) =>{
            setdata((copy)=>(
                data.filter((copy)=>(
                    copy.id != del
                )) 
            ))
    }
    let DeleteAll = (event) =>{ 
        event.preventDefault()  
        if(data == ''){
           
        }
        else{
             divref.current.style.display = "flex"
        }
    }
    let sure = () =>{
        setdata([])
        divref.current.style.display = "none"
    }
    let notsure = () =>{
        divref.current.style.display = "none"
    }
    let total = () =>{
        const sum = data.reduce((acc,curr)=>acc+curr.price,0)
        settot(sum)
    }   
    useEffect(()=>{
        total()
    },[])
    return(
        <>
        <div className="tracker">
            <h3>Expenses Tracker</h3>
        <form action="">
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                <input type="text" placeholder="Item Name" value={item} onChange={Itemchange}/>
                {/* <p ref={pref1} style={{color:"red",display:"none"}}>Item is required</p> */}
                {/* {item != '' && <p>Fill the blank</p>} */}
                {/* {item == '' ? <p>Fill the blank</p>:[]} */}
                <input type="number" placeholder="Item Price"  value={number} onChange={Numberchange}/>
                {/* <p ref={pref2} style={{color:"red",display:"none"}}>Price is required</p>  */}
            </div>

                 <button onClick={HandleClick}>ADD</button>
                 <button onClick={DeleteAll}>Delete All</button>
        </form>
        <table>
            <thead>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Date</th>
                <th>Time</th>
                <th>Delete</th>
            </thead>   
                <tbody>
                    {
                        data.map((abhishek)=>(
                            <tr key={abhishek.id}>
                                <td>{abhishek.product}</td>
                                <td>₹{abhishek.price}</td>
                                {
                                    abhishek.product != '' ? 
                                        <>
                                            <td>{abhishek.Date}-{abhishek.Month}</td>
                                            <td>{abhishek.Hour}:{abhishek.Min}</td>
                                        </>
                                    :[]
                                }
                                <td>{abhishek.product != '' ? <button onClick={()=> HanldeDelete(abhishek.id)}><DeleteIcon/></button> : []}</td>
                        </tr>
                        ))
                    }
                </tbody> 
        </table>
        <div className="total">
           {
            data != ''? <> <button onClick={total}>Total</button>
            <span>₹{tot}</span></> :[]
           }
        </div>
        <div className="divref" ref={divref} style={{display:"none"}}>
                <div className="pop-up">
                    <h3>Are you sure ?</h3>
                    <div>
                        <button onClick={sure}><DeleteIcon/></button>
                        <button onClick={notsure}><ClearIcon/></button>
                    </div>
                </div>
        </div>
    </div>
        </>
    )
}
export { ExpensesTracker };
