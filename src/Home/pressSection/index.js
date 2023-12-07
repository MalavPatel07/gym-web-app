import React from 'react';
import './press.css'; 
import brand1 from "../../images/brand-1.png";
import brand2 from "../../images/brand-2.png";
import brand3 from "../../images/brand-3.png";
import brand4 from "../../images/brand-4.png"
function PressSection() {
  return (
    <section id="press">
        <img className="press-img " src={brand1} alt="tc-logo"/>
        <img className="press-img " src={brand2} alt="tnw-logo"/>
        <img className="press-img " src={brand3} alt="biz-insider-logo"/>
        <img className="press-img " src={brand4} alt="mashable-logo"/>
    </section>
  );
}

export default PressSection;
