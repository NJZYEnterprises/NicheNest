import { useNavigate } from "react-router-dom";
import MyButton from "./buttons/MyButton";

const ServiceField = ({ title, content }) => {
  if (typeof (content) !== "string" || content.length < 1)
    return null;

  return <div className="mt-2">
    <div className="font-semibold">{title}</div>
    <div className="text-orange-500">{content}</div>
  </div>
}

const ServiceCard = ({ service, freelancer, linkAvailability = true }) => {

  const navigate = useNavigate();
  const seeAvailability = () => {
    //TODO: Alert if no sessions active
    navigate(`/availabilities/${service.id}`)

  }

  const location = service.location ?? freelancer.location;

  return <section className="flex justify-center">
    <div className="flex primary-color-t card m-4 px-16 py-8 textShadow">
      <div div className="flex flex-col justify-around" style={{minWidth: "16rem"}}>
        <h2 className="text-2xl font-bold text-orange-500">{service.name}</h2>
        <div className="surface-text m-2 p-2">
          <div className="text-orange-500">{service.tags}</div>
          {[
            ["Description", service.description],
            ["Rate", `$${service.rate} per ${service.rate_time}`],
            ["Address", location?.street_address],
            ["City", location?.city],
            ["State", location?.state],
            ["Zip Code", location?.zip_code],
          ].map(([title, content]) => <ServiceField {...{ title, content }} />)}
        </div>
        {linkAvailability && <div className="">
          <MyButton text={"See Availability"}
            cssSpacing={"px-4 py-2 mt-4"} isBold={false}
            onClick={seeAvailability} />
        </div>}
      </div>
    </div>
  </section>
}

export default ServiceCard;