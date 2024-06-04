import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { UserContext } from "../UserProvider";
import Fetcher from "../../fetcher";
import MyButton from "./MyButton";

const fetcher = new Fetcher("api");

const BookButton = ({ session, updateFn }) => {
  if (!session) return null;

  const { user, updateUser, updateFreelancers } = useContext(UserContext);
  const { userId } = useContext(AuthContext);
  const reservations = user?.reservations ?? [];

  const reserveSession = async (sessionId) => {
    const reservationData = {
      session_id: sessionId,
      client_id: user?.id,
      status: "joined"
    }
    await fetcher.setToken(userId.accessToken).route("reservations").post(reservationData);
    updateUser();
    updateFreelancers();
    if (updateFn instanceof Function) updateFn();
  }

  const alreadyBooked = (checkId) => {
    const sessionIds = reservations.map(ids => ids.session_id);
    if (sessionIds.includes(checkId)) {
      return (
        <div className="text-lg font-bold text-orange-500">
          ALREADY BOOKED!!
        </div>
      );
    };
  };
  
  //capacity check function
  const fullSession = (sessionInfo) => {
    if (sessionInfo.capacity <= sessionInfo.reservations.length) {
      return (
        <div className="text-lg font-bold text-orange-500">
          SESSION FULL!
        </div>
      )
    };
  };

  return <>{
    alreadyBooked(session.id) ??
    fullSession(session) ??
    <MyButton text={"Book Now!"} cssType={"submit"} onClick={() => reserveSession(session.id)} />
  }</>
}

export default BookButton;