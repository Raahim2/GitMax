import React from 'react';

const HeroSection = () => {
  return (
    <section className="section hero-primary hero-v6">
      <div className="container-default z-index-1 w-container">
        <div className="inner-container _565px center-element">
          <div className="text-center text-left-mbp">
            <h1>Sign up for a 14-day free trial of Landingly</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit faucibus fermentum adipiscing facilisi eu
              massa habitant penatibus vitae.
            </p>
          </div>
        </div>

        <div className="mg-bottom-large-v5">
          <div className="inner-container _1044px center-element">
            <div className="w-layout-grid grid-3-columns _3-icon-list">
              <div className="icon-list-item-wrapper">
                <img
                  src="https://cdn.prod.website-files.com/61a6a6cae0915e1a66f08845/61a7940cc2c6905eae15cc36_icon-check-landingly-template.svg"
                  alt="Check Icon"
                  className="icon-list"
                />
                <div className="text-300 bold color-neutral-800 list">Over 500K customers</div>
              </div>
              <div className="icon-list-item-wrapper">
                <img
                  src="https://cdn.prod.website-files.com/61a6a6cae0915e1a66f08845/61a7940cc2c6905eae15cc36_icon-check-landingly-template.svg"
                  alt="Check Icon"
                  className="icon-list"
                />
                <div className="text-300 bold color-neutral-800 list">100% free - No payment setup</div>
              </div>
              <div className="icon-list-item-wrapper">
                <img
                  src="https://cdn.prod.website-files.com/61a6a6cae0915e1a66f08845/61a7940cc2c6905eae15cc36_icon-check-landingly-template.svg"
                  alt="Check Icon"
                  className="icon-list"
                />
                <div className="text-300 bold color-neutral-800 list">No commitments or contracts</div>
              </div>
            </div>
            <div className="flex center">
              <a href="#form" className="btn-primary w-button">
                Start free trial today
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="position-absolute bottom bg-neutral-200 min-height-113px"></div>
    </section>
  );
};

export default HeroSection;
