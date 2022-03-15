import React, {useState} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../pages.css'
import { TextareaAutosize } from '@mui/material';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
    const navigate = useNavigate()
    const today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() +1)

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState(false)
    const [titleErrorMessage, setTitleErrorMessage] = useState("")

    const [eventType, setEventType] = useState("")
    const [eventTypeError, setEventTypeError] = useState(false)
    const [eventTypeErrorMessage, setEventTypeErrorMessage] = useState("")

    const [shortDescription, setShortDescription] = useState("")
    const [shortDescriptionError, setShortDescriptionError] = useState(false)
    const [shortDescriptionErrorMessage, setShortDescriptionErrorMessage] = useState("")

    const [longDescription, setLongDescription] = useState("")
    const [longDescriptionError, setLongDescriptionError] = useState(false)

    const [remote, setRemote] = useState(true)

    const [streetOne, setStreetOne] = useState("")
    const [streetTwo, setStreetTwo] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [location, setLocation] = useState( "Remote")
    const [locationError, setLocationError] = useState(false)

    const [startDate, setStartDate] = useState(tomorrow)
    const [startDateError, setStartDateError] = useState(false)

    const [endDate, setEndDate] = useState(tomorrow)
    const [endDateError, setEndDateError] = useState(false)
    

    const [capacity, setCapacity] = useState(2)
    const [capacityError, setCapacityError] = useState(false)
    const [capacityErrorMessage, setCapacityErrorMessage] = useState("")

    const [image, setImage] = useState(null)


    const Input = styled('input')({
        display: 'none',
    });

    
    

    const imageSelectHandler = (e) => {
        console.log(e.target.files[0])
        setImage({
            selectedFile: e.target.files[0]
        })
    }

    const handleStartDateChange = (newValue) => {
        let date=parseInt(newValue.getMonth()+1) +"/"+newValue.getDate() + "/" +newValue.getFullYear();
        setStartDate(date)
    };

    const handleEndDateChange = (newValue) => {
        let date=parseInt(newValue.getMonth()+1) +"/"+newValue.getDate() + "/" +newValue.getFullYear();
        setEndDate(date)
    };

    async function handleCreate(){
        console.log(remote, "remote")
        if(remote){
            setLocation("Remote")
        }else{
            setLocation(`${streetOne} ${streetTwo}, ${city}, ${state} ${zipCode}`)
        }
        try{
            const fd = new FormData()
            if(image?.selectedFile){
                console.log(image)
                fd.append('image', image?.selectedFile, image?.selectedFile?.name)
                let upload = await axios.post('http://localhost:3001/api/event/upload', fd,
                {
                    headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}
                } )
                console.log(upload)
            }
            
            let payload = await axios.post('http://localhost:3001/api/event/create-event', 
            {
                title,
                eventType,
                shortDescription,
                longDescription,
                location,
                startDate,
                endDate,
                image: "uploads/" + image?.selectedFile?.name || "",
                capacity: capacity.toString(),
            },
            {
                headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}
            },fd,
            )
            console.log( payload)
            navigate('/')


        }catch(e){
            console.log(e.response)
            for( let key in e.response.data.error){
                if(key === "title"){
                    setTitleError(true)
                    setTitleErrorMessage(e.response.data.error[key])
                }
                if(key === "eventType"){
                    setEventTypeError(true)
                    setEventTypeErrorMessage(e.response.data.error[key])
                }
                if(key === "shortDescription"){
                    setShortDescriptionError(true)
                    setShortDescriptionErrorMessage(e.response.data.error[key])
                }
                if(key === "longDescription"){
                    setLongDescriptionError(true)
                }
                if(key === "location"){
                    setLocationError(true)
                }
            }
        }
    }

    return (
        <div>
            <h2>Create Event</h2>
            <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    className='text-input-area'
                    >
                    <div  className='text-area-width'>
                        <TextField 
                            error={titleError}
                            label="Title" 
                            variant="standard" 
                            style={{width : "72%"}}
                            helperText={titleErrorMessage || " "}
                            onChange={ e => {
                                setTitle(e.target.value)
                                setTitleError(false)
                                setTitleErrorMessage('')
                            }}
                        />
                    </div>

                    <div  className='text-area-width'>
                        <TextField 
                            error={eventTypeError}
                            label="Event Type" 
                            variant="standard" 
                            style={{width : "72%"}}
                            helperText={eventTypeErrorMessage || " "}
                            onChange={ e => {
                                setEventType(e.target.value)
                                setEventTypeError(false)
                                setEventTypeErrorMessage('')
                            }}
                        />
                    </div>

                    <div  className='text-area-width'>
                        <TextField
                            error={shortDescriptionError}
                            label="Short Description"
                            variant="standard" 
                            style={{width : "72%"}}
                            helperText={shortDescriptionErrorMessage || " "}
                            onChange={ e => {
                                setShortDescription(e.target.value)
                                setShortDescriptionError(false)
                                setShortDescriptionErrorMessage('')
                            }}
                        />
                    </div>

                    <div  className='text-area-width'>
                        <TextareaAutosize
                            minRows = {5}
                            placeholder="Long Description" 
                            variant="standard" 
                            style={{width : "72%", resize: "none", fontSize: "17px", border: `${longDescriptionError ? "2px solid #ba000d" : "" }`, borderRadius: `${longDescriptionError ? "5px" : "" }`,color: `${longDescriptionError ? "#ba000d" : "" }`, fontFamily: "roboto"}}
                            onChange={ e => {
                                setLongDescription(e.target.value)
                                setLongDescriptionError(false)
                            }}
                        />
                        
                    </div>

                    <div  className='text-area-width'>
                        <FormControl style={{width : "72%"}}>
                            <FormLabel style={{textAlign: "left"}} id="demo-radio-buttons-group-label">Location</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="remote"
                                name="radio-buttons-group"
                                onChange={(e) => {
                                    if(e.target.value === "remote"){
                                        setRemote(true)
                                    }else{
                                        setRemote(false)
                                    }
                                }}
                            >
                                <FormControlLabel value="remote" control={<Radio />} label="Remote" />
                                <FormControlLabel value='in person' control={<Radio />} label="In Person" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {remote ? "" :
                        <div style={{width: "72%", margin: "10px auto", border: "1 px solid black", borderRadius: "5px"}} onClick={() => setLocationError(false)}>
                                <div className='text-area-width'>
                                    <TextField 
                                        label="Address Line 1" 
                                        min="1"
                                        variant="standard"  
                                        style={{width : "90%"}} 
                                        onChange={ e => {
                                            setStreetOne(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className='text-area-width'>
                                    <TextField 
                                        error={locationError} 
                                        label="Address Line 2" 
                                        variant="standard"  
                                        style={{width : "90%"}} 
                                        onChange={ e => {
                                            setStreetTwo(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className='text-area-width address-bar'>
                                    <TextField 
                                        error={locationError} 
                                        label="City" 
                                        variant="standard"  
                                        style={{width : "40%"}} 
                                        helperText= " "
                                        onChange={ e => {
                                            setCity(e.target.value)
                                        }}
                                    />
                                    <TextField 
                                        error={locationError} 
                                        label="State" 
                                        variant="standard"  
                                        style={{width : "15%"}} 
                                        onChange={ e => {
                                            setState(e.target.value)
                                        }}
                                    />
                                    <TextField 
                                        error={locationError} 
                                        type="number"
                                        label="Zipcode" 
                                        variant="standard"  
                                        style={{width : "30%"}} 
                                        onChange={ e => {
                                            setZipCode(e.target.value)
                                        }}
                                    />
                                </div>
                        </div>
                    }

                    <div className='text-area-width'>
                        <Box style={{width : "72%", margin: "5px auto"}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DesktopDatePicker
                                label="Start date"
                                inputFormat="MM/dd/yyyy"
                                value={startDate}
                                minDate={tomorrow}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField {...params} onChange={(e) => {
                                    console.log(e.target.value)
                                }} />}
                                
                                />
                                <DesktopDatePicker
                                label="End date"
                                inputFormat="MM/dd/yyyy"
                                value={endDate}
                                minDate={tomorrow}
                                helperText=""
                                onChange={handleEndDateChange}
                                renderInput={(params) => <TextField {...params} />}
                                />
                        </LocalizationProvider>    
                        </Box>
                        
                    </div>
                    
                    <div  className='text-area-width'>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => imageSelectHandler(e)}/>
                            <Button variant="contained" component="span">
                                Upload <PhotoCamera style={{marginLeft: "5px"}} />
                            </Button>
                        </label>
                        <div className='uploaded-photo'>
                            {image? image.selectedFile.name : "No Photo"}
                        </div>
                    </div>
                    <div className='text-area-width'>
                                    <TextField 
                                        // error={firstNameError} 
                                        type="number"
                                        label="capacity" 
                                        defaultValue={2}
                                        variant="outlined"  
                                        style={{width : "72%"}} 
                                        onChange={ e => {
                                            setStreetTwo(e.target.value)
                                        }}
                                    />
                                </div>
                    <div  className='text-area-width button'>
                        <Button onClick={() => handleCreate()} variant="contained">Create</Button>
                    </div>
                </Box>
        </div>
    )
}

export default CreateEvent