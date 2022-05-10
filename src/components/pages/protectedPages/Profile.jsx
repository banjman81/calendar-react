import React, {useContext} from 'react'
import noImage from '../../images/noImage.png'
import './profile.css'
import {Link} from 'react-router-dom'
import { UserContext } from '../../../App'
import axios from 'axios'
import { toast } from "react-toastify";
import AddIcon from '@material-ui/icons/Add';

function Profile() {
    const {user, dateFormat} = useContext(UserContext)
    const notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    async function handleRemoveEvent(event){
        const id = event._id
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

    async function handleDeleteEvent(event){
        const id = event._id
        console.log(localStorage.getItem('loginToken'))
        try{
            let payload = await axios.delete(`http://localhost:3001/api/event/delete-event/${id}`,
            {
                headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}
            })
            // console.log(payload.data)
            window.location.reload()
        }catch(e){
            notifyFailed(e.response.data.error)
        }
    }
    
    return (
        <>
            {
                user ? 
                <div>
                    <h3>Up coming events</h3>
                    {
                        user.events.length === 0 ?
                        <div className='event-message'>
                            <h1 >Not signed for any event</h1>
                            <Link className='browse-link' to="/">Browse Events <AddIcon /></Link>
                        </div>: ""
                    }
                    {
                        user.events.map(event => {
                            return(
                                <div key={event._id} className="event-cards">
                                    <div className='left-table'>
                                    {
                                        event.image === "uploads/undefined" ? 
                                        <img className='event-thumbnail' src={noImage} alt="" /> :
                                        <img className='event-thumbnail' src={event.image} alt='' />
                                    }
                                    <button className='remove-button'  style={{marginTop: "20px"}} onClick={() => handleRemoveEvent(event)}>Remove</button>
                                    </div>
                                    <table key={event._id}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h3>Title:</h3> 
                                                </td>
                                                <td>
                                                    <Link className='event-link' to={`/event/${event._id}`}><h3>{event.title}</h3></Link>
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
                                                    <h4>Information:</h4> 
                                                </td>
                                                <td>
                                                    <h4>{event.shortDescription}</h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>    
                                </div>
                                
                            )
                        })
                    }
                <div>
                    
                </div>
                </div>
                
                : "Loading..."
            }
            <hr style={{width: "90%"}}/> 
            {
                user ?
                <div>
                    <h3>Created events</h3>
                    {  user.createdEvents.length === 0 ?
                        <div className='event-message'>
                            <h1 >You are not hosting any events</h1>
                            <Link className='browse-link' to="/create-event">Create Events <AddIcon /></Link>
                        </div>: 
                        <div className='created-events-display'>
                            {
                                user.createdEvents.map(createdEvent => {
                                    return(
                                        <div key={createdEvent._id}>
                                            <table className='created-card'>
                                                <tbody>
                                                    <tr>
                                                        <td colspan={2}>
                                                            <h2><Link className='event-link' to={`/event/${createdEvent._id}`}>{createdEvent.title}</Link></h2>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan={2}><hr /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan={2}>
                                                        {
                                                            createdEvent.image === "uploads/undefined" ? 
                                                            <img className='created-event-thumbnail' src={noImage} alt="" /> :
                                                            <img className='created-event-thumbnail' src={`http://localhost:3001/${createdEvent.image}` } alt='' />
                                                        }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan={2}><h4>{createdEvent.attendees.length} signed up</h4></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan={2}><h4>{dateFormat(createdEvent.startDate)} to {dateFormat(createdEvent.endDate)}</h4></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan={2}><hr /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            { createdEvent.attendees.length-createdEvent.capacity !== 0 ?
                                                                user ? user.events.filter(element => element._id === createdEvent._id).length > 0 ?
                                                                <button className='c-button red' onClick={() => handleRemoveEvent(createdEvent)}>Remove</button>:
                                                                <button className='c-button blue' onClick={() => {handleAddEvent(createdEvent)}}>Add</button>
                                                                : "" : ""
                                                            }
                                                        </td>
                                                        <td>
                                                            <button className='c-button red' onClick={() => handleDeleteEvent(createdEvent)}>Cancel Event</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        
                                                    </tr>
                                                </tbody>
                                            </table>
                                            
                                        </div>
                                        )
                                    
                                })
                            }
                        </div>  
                    }
                </div> : ""
            }
        </>
    )
}

export default Profile