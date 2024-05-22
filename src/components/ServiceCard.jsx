const ServiceField = ({title, content}) => {
  if (typeof(content) !== "string" || content.length < 1) 
    return null;

  return <div className="mt-2">
    <div className="block text-gray-400">{title}</div>
    <div className="text-white">{content}</div>
  </div>
}

const ServiceCard = ({ service, freelancer }) => {
  const seeAvailability = () => {
    // TODO
  }

  return <section className="flex justify-center">
    <div className="m-5 bg-gray-700 p-6 rounded-md shadow-md w-max">
      <h2 className="text-2xl font-bold">{service.name}</h2>
      <div>{service.tags}</div>
      {[
        ["Rate", `$${service.rate} per ${service.rate_time}`],
        ["Address", freelancer.location?.street_address],
        ["City", freelancer.location?.city],
        ["State", freelancer.location?.state],
        ["Zip Code", freelancer.location?.zip_code],
      ].map(([title, content]) => <ServiceField {...{title, content}} />)}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={seeAvailability}
      >See Availability</button>
    </div>
  </section>
}

export default ServiceCard;