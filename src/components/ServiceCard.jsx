const ServiceField = ({ title, content }) => {
  if (typeof (content) !== "string" || content.length < 1)
    return null;

  return <div className="mt-2">
    <div className="font-semibold">{title}</div>
    <div>{content}</div>
  </div>
}

const ServiceCard = ({ service, freelancer }) => {
  const seeAvailability = () => {
    // TODO
  }

  const location = service.location ?? freelancer.location;

  return <section className="flex justify-center">
    <div className="flex birds-nest card m-4 px-16 py-8">
      <div div className="flex flex-col">
        <h2 className="text-2xl font-bold">{service.name}</h2>
        <div className="surface-text m-2 p-2">
          <div>{service.tags}</div>
          {[
            ["Description", service.description],
            ["Rate", `$${service.rate} per ${service.rate_time}`],
            ["Address", location?.street_address],
            ["City", location?.city],
            ["State", location?.state],
            ["Zip Code", location?.zip_code],
          ].map(([title, content]) => <ServiceField {...{ title, content }} />)}
        </div>
        <div>
          <button
            className="view-button text-white px-4 py-2 mt-4 rounded"
            onClick={seeAvailability}
          >See Availability</button>
        </div>
      </div>
    </div>
  </section>
}

export default ServiceCard;