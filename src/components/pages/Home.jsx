import React, {useEffect, useContext, useState} from 'react'
import axios from 'axios'
import noImage from '../images/noImage.png'
import './pages.css'
import {Link} from 'react-router-dom'
import { UserContext } from '../../App'
import AxiosBackend from '../lib/axiosBackend'
import { toast } from "react-toastify";

function Home() {
    const {user, events, setEvents} = useContext(UserContext)
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
    }, [])

    async function handleAddEvent(event){
        const id = event._id
        try{
            let payload = await AxiosBackend.post(`http://localhost:3001/api/users/add-event/${id}`)
                console.log(payload)
                window.location.reload()
        }catch(e){
            notifyFailed(e.response.data.error)
        }
        
    }

    async function handleRemoveEvent(event){
        const id = event._id
        try{
            let payload = await AxiosBackend.put(`http://localhost:3001/api/users/remove-event/${id}`)
                console.log(payload)
                window.location.reload()
        }catch(e){
            notifyFailed(e.response.data.error)
        }
        
    }
    
    const dateFormat = (val) => {
        const newValue = new Date(val)
        let date=parseInt(newValue.getMonth()+1) +"/"+newValue.getDate() + "/" +newValue.getFullYear();
        return date
    };
    
    return (
        <>
        {events ?
            <div>
                {
                    events.map(event => {
                        // let added = false
                        // const filteredEvents = user?.events.filter(item => item._id === event._id)
                        // if(filteredEvents.length > 0){
                        //     added = true
                        // }
                        return (<div key={event._id} className="event-card">
                            <Link to={`/event/${event._id}`} className="flex">
                                {
                                    event.image === "" ? 
                                    <img className='event-thumbnail' src={noImage} alt="" /> :
                                    <img className='event-thumbnail' src={`http://localhost:3001/${event.image}` } alt='' />
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
                                        </tbody>
                                    </table>
                                </div>
                            </Link>
                            {
                                user?
                                <div className='event-button'>
                                    {
                                        user.events.filter(element => element._id === event._id).length > 0 ?
                                        <button className='remove-button' onClick={() => handleRemoveEvent(event)}>Remove</button>:
                                        <button className='add-button' onClick={() => {handleAddEvent(event)}}>Add</button> 
                                    }
                                    
                                </div> : ""
                            }
                            
                        </div>)
                    })
                }
            </div> : " Loading..."
        }
        </>
    )
}

export default Home