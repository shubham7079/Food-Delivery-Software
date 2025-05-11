import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const mapContainerStyle = { width: "100%", height: "400px" };
const defaultCenter = { lat: 28.7041, lng: 77.1025 }; // Default to New Delhi

function TrackOrder() {
    const { orderId } = useParams();
    const [agentLocation, setAgentLocation] = useState(defaultCenter);

    useEffect(() => {
        const fetchLocation = async () => {
            const res = await axios.get(`api/orders/${orderId}`);
            setAgentLocation(res.data.deliveryAgentLocation);
        };

        const interval = setInterval(fetchLocation, 5000); // Update location every 5 sec
        return () => clearInterval(interval);
    }, [orderId]);

    return (
        <>
        <Navbar/>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={agentLocation}>
                <Marker position={agentLocation} />
            </GoogleMap>
        </LoadScript>
        </>
        
    );
}

export default TrackOrder;
