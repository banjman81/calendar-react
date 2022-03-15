import React, {useEffect, useContext, useState} from 'react'
import noImage from '../../images/noImage.png'
import './profile.css'
import {Link} from 'react-router-dom'
import { UserContext } from '../../../App'
import AxiosBackend from '../../lib/axiosBackend'
import { toast } from "react-toastify";

function Profile() {
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
            {
                user ? 
                <div>
                    {
                        user.events.map(event => {
                            return(
                                <div key={event._id} className="event-cards">
                                    <div className='left-table'>
                                    {
                                        event.image === "" ? 
                                        <img className='event-thumbnail' src={noImage} alt="" /> :
                                        <img className='event-thumbnail' src={`http://localhost:3001/${event.image}` } alt='' />
                                    }
                                    <button className='remove-button' onClick={() => handleRemoveEvent(event)}>Remove</button>
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
        </>
    )
}

export default Profile