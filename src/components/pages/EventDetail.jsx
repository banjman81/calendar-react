import React, {useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../App'
import axios from 'axios'
// import AxiosBackend from '../lib/axiosBackend'
import { toast } from "react-toastify";
import noImage from '../images/noImage.png'
import { useNavigate } from 'react-router-dom'

function EventDetail() {
    const navigate = useNavigate()
    const params = useParams()
    const {user} = useContext(UserContext)
    const [event, setEvent] = useState(null)

    const notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    async function loadEvent(){
        try{

            let payload =await axios.get(`http://localhost:3001/api/event/get-event/${params.id}`)
            setEvent(payload.data.payload)

        }catch(e){
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        loadEvent()
    })
    
    
    
    const dateFormat = (val) => {
        const newValue = new Date(val)
        let date=parseInt(newValue.getMonth()+1) +"/"+newValue.getDate() + "/" +newValue.getFullYear();
        return date
    };

    async function handleAddEvent(event){
        const id = event._id
        console.log('clicked')
        try{
            let payload = await axios.post(`http://localhost:3001/api/users/add-event/${id}`, {},
            {
                headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}
            })
                console.log(payload)
                window.location.reload()
        }catch(e){
            notifyFailed(e.response.data.error)
        }
        
    }

    async function handleRemoveEvent(event){
        const id = event._id
        console.log(localStorage.getItem('loginToken'))
        try{
            let payload = await axios.put(`http://localhost:3001/api/users/remove-event/${id}`, {},
            {
                headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}
            })
                console.log(payload)
                window.location.reload()
        }catch(e){
            notifyFailed(e.response.data.error)
        }
        
    }

    async function handleDeleteEvent(event){
        const id = event._id
        // console.log(localStorage.getItem('loginToken'))
        try{
            let payload = await axios.delete(`http://localhost:3001/api/event/delete-event/${id}`,
            {
                headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}
            })
            console.log(payload.data)
            navigate('/')
        }catch(e){
            notifyFailed(e.response.data.error)
        }
    }
    return (
        <div style={{backgroundImage: event? `url(${event.image})` : ""}} className="bg-container">{ event ?
            <div>
                <table key={event._id} className="info-table">
                    <tbody>
                        <tr>
                            <td>
                                <h3>Title:</h3> 
                            </td>
                            <td>
                                <h3>{event.title}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Created By:</h4> 
                            </td>
                            <td>
                                <h4>{event.host.username}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Type:</h4> 
                            </td>
                            <td>
                                <h4>{event.eventType}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Dates:</h4> 
                            </td>
                            <td>
                                <h4>{dateFormat(event.startDate)} to {dateFormat(event.endDate)}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Length:</h4> 
                            </td>
                            <td>
                                <h4>{event.duration} days</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Slots:</h4> 
                            </td>
                            <td>
                                <h4>{event.attendees.length}/ {event.capacity}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="info-box">
                                <h4>Information:</h4> 
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}  className="info-box long-des">
                                <p>{event.longDescription}</p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {
                                    event.image === "" ? 
                                    <img className='event-image' src={noImage} alt="" /> :
                                    <img className='event-image' src={event.image} alt='' />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className='detail-event-button' colSpan={2}>
                                { event.attendees.length-event.capacity !== 0 ?
                                    user ? user.events.filter(element => element._id === event._id).length > 0 ?
                                    <button className='remove-button' onClick={() => handleRemoveEvent(event)}>Remove</button>:
                                    <button className='add-button' onClick={() => {handleAddEvent(event)}}>Add</button>
                                    : "" : ""
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className='detail-event-button' colSpan={2}>
                                {event.host._id === user?.id ? 
                                    <button className='remove-button' onClick={() => handleDeleteEvent(event)}>Cancel Event</button>
                                : ""}
                            </td>
                        </tr>
                        
                        
                    </tbody>
                </table>
            </div>
            : "Loading..." }
            
            
        
        </div>
    )
}

export default EventDetail