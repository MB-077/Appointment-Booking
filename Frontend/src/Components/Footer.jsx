import React from "react";

const Footer = ({ className }) => {
  return (
    <div className={`${className} `}>
      <footer className=" text-center">
        <p className="text-gray-500 leading-6">
          © 2024 EasySlot. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
