import React, { useEffect } from "react";

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} | ElectroVerse` : "ElectroVerse";
  }, [title]);

  return null;
};

export default PageTitle;
