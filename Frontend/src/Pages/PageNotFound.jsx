import React from "react";
import { TbError404 } from "react-icons/tb";
const PageNotFound = () => {
  return (
    <div className="h-[80vh]">
      <div className="text-white dark:text-black flexC text-[200px]">
        <div className="flexR">
          <TbError404 />
          !!!
        </div>
        <pre className="text-white dark:text-black text-[24px]">
          Error, Page not found
        </pre>
      </div>
    </div>
  );
};

export default PageNotFound;
