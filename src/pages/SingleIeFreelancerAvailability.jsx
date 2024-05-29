import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fetcher from "../fetcher";
import SessionCard from "../components/SessionCard";
//include available time slots to request time sessions
const Availabilities =() => {
  return(
    <SessionCard/>
  )
}

export default Availabilities