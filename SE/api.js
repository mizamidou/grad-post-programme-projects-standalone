import axios from "axios";

const getEvents= () =>{
    return axios
        .get("https://api.datathistle.com/v1/events")
        .then(response =>{
            return response.data.events;
        })
        .catch(error =>{
            console.log("That's an error:", error)
        })
};



export{ getEvents};