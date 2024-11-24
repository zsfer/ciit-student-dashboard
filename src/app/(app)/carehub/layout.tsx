import React from "react";

const CarehubLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1 className="text-3xl font-bold pt-5">Your Carehub Records</h1>
      <p className="text-gray-500 pb-3">
        Please note that the Carehub form is only accessible to students
        enrolled this term. If you are not enrolled this term, please use the
        guest entry form available at the guard lobby.
      </p>
      {children}
    </>
  );
};

export default CarehubLayout;
