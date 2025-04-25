import React from "react";

const DoctorCard = ({ doctor }) => {
  const specialtiesText = Array.isArray(doctor.specialities)
    ? doctor.specialities.map(s => typeof s === "string" ? s : s.name).join(", ")
    : typeof doctor.specialities === "string"
    ? doctor.specialities
    : "No Specialities";

  return (
    <div className="doctor-card" data-testid="doctor-card">
      <div className="doctor-card-header">
        <h2 className="doctor-name" data-testid="doctor-name">
          {doctor.name}
        </h2>
      </div>

      <div className="doctor-card-body">
        <p className="doctor-specialty" data-testid="doctor-specialty">
          {specialtiesText}
        </p>
        <p className="doctor-experience" data-testid="doctor-experience">
          Experience: {doctor.experience}
        </p>
        <p className="doctor-fee" data-testid="doctor-fee">
          Fee: ₹{doctor.fees.replace(/\D/g, "")}
        </p>
      </div>

      <div className="doctor-card-actions">
        <button className="btn-action">View</button>
        <button className="btn-action">Book</button>
      </div>
    </div>
  );
};

export default DoctorCard;
