import React, { useState, useContext, } from 'react';
import { AuthContext } from "../auth/AuthProvider";
import { UserContext } from './UserProvider.jsx';
import ServiceForm from './ServiceForm.jsx';
import ServiceCard from './ServiceCard.jsx';
import ToggleButton from './buttons/ToggleButton.jsx';
import MySession from './MySession.jsx';
import DeleteButton from './buttons/DeleteButton.jsx';
import CreateSession from './CreateSessionForm.jsx';
import { Detail } from './ReservationCard.jsx';

function MyService({ service }) {
  const { user, updateUser } = useContext(UserContext);

  const toggleState = {};
  ["sessions", "addSession", "edit"].forEach(e => toggleState[e] = useState(false));
  const { sessions: [showSessions], addSession: [showSessionForm], edit: [isEditting] } = toggleState;

  const sessions = service?.sessions ?? [];
  const location = service?.location ?? user?.location;

  let details = [
    ["Tags", service.tags],
    ["Description", service.description],
    ["Rate", `$${service.rate} per ${service.rate_time}`],
    ["Address", location?.street_address, true],
    ["City", location?.city],
    ["State", location?.state],
    ["Zip Code", location?.zip_code, true],
  ];
  details = details.map(e => { return { label: e[0], content: e[1], hideEmpty: e[2] } });

  return <div className="primary-color-t card p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <div className='flexItemUniformSize'>
        <span className="text-lg font-bold text-orange-500 textShadow">{service.name}</span>
      </div>
      <div className='flexItemUniformSize justify-center'>
        <ToggleButton state={toggleState.edit} text={['Edit Mode', 'Cancel Edit']} cssType='submit' />
        <DeleteButton subRoutes={["services", service?.id]} updateFn={updateUser} />
      </div>
      <div className='flexItemUniformSize justify-end'>
        <ToggleButton state={toggleState.sessions} text={['Show Sessions', 'Hide Sessions']} />
      </div>
    </div>
    {isEditting
      ? <ServiceForm editService={service} />
      : <div className="surface-text p-3 m-6">{details.map(d => <Detail {...d} />)}</div>
    }
    {showSessions &&
      <div>
        <div className='flex'>
          <div className='flexItemUniformSize'></div>
          {sessions.length === 0 && <div className="text-xl text-black font-semibold">No sessions</div>}
          <div className='flexItemUniformSize justify-end'>
            <ToggleButton state={toggleState.addSession} text={['Create New Session', 'Cancel New Session']} cssType='submit' />
          </div>
        </div>
        {showSessionForm && <CreateSession service={service} />}
        {sessions.map((session, i) => <MySession key={i} session={session} />)}
      </div>
    }
  </div>
}

export default MyService;