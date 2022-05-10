import React, {useEffect, useContext} from 'react'
import axios from 'axios'
import noImage from '../images/noImage.png'
import './pages.css'
import {Link} from 'react-router-dom'
import { UserContext } from '../../App'
// import AxiosBackend from '../lib/axiosBackend'
import { toast } from "react-toastify";

function Home() {
    const {user, events, setEvents, dateFormat} = useContext(UserContext)
    const notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    async function getEvents(){
        try{
            let payload = await axios.get(`http://localhost:3001/api/event/`)
            setEvents(payload.data.payload)
        }catch(e){
            console.log(e.response)
        }
    }
    

    useEffect(() => {
        getEvents()
    })

    async function handleAddEvent(event){
        const id = event._id
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
    
    return (
        <>
        {user?.username ? <> {events ?
            <div>
                {
                    events.map(event => {
                        return (<div key={event._id} className="event-card">
                            <Link to={`/event/${event._id}`} className="flex">
                                {
                                    event.image === "" || event.image === null ? 
                                    <img className='event-thumbnail' src={noImage} alt="" /> :
                                    <img className='event-thumbnail' src={event.image} alt='' />
                                }
                                <div>
                                    
                                    <table className='desc-table'>
                                        <tbody>
                                            <tr>
                                                <td className='title'><h3>{event.title}</h3> <h5>By:{event.host.firstName} {event.host.lastName}</h5></td>
                                            </tr>
                                            <tr>
                                                <td><h4>{event.eventType}</h4></td>
                                            </tr>
                                            <tr>
                                                <td>{event.shortDescription}</td>
                                            </tr>
                                            <tr>
                                                <td>{dateFormat(event.startDate)} to {dateFormat(event.endDate)}</td>
                                            </tr>
                                            <tr>
                                                <td style={{fontWeight: "500", color: event.capacity-event.attendees.length > 0 ? event.capacity-event.attendees.length > 1 ? "green" : "orange" : "red"}}>{event.capacity-event.attendees.length} Spot(s) remaining </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Link>
                            { event?.capacity-event?.attendees.length !== 0 ?
                                user?
                                <div className='event-button'>
                                    {
                                        user.events.filter(element => element._id === event._id).length > 0 ?
                                        <button className='remove-button' onClick={() => handleRemoveEvent(event)}>Remove</button>:
                                        <button className='add-button' onClick={() => {handleAddEvent(event)}}>Add</button> 
                                    }
                                    
                                </div> : "" : ""
                            }
                            
                        </div>)
                    })
                }
            </div> : " Loading..."
        } </> : <h1>Welcome to Event lister. Please login to view avalible events.</h1>}
        </>
    )
}

export default Home