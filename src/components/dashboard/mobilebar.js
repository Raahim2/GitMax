"use client";

import Link from "next/link";

export default function MobileBar() {
  return (
    <>
      <div className="mobile-bar">
        <div className="mobile-bar-menu">
          <Link href="#" className="mobile-bar-link w-inline-block">
            <img
              src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/60586b1639502416b88ec95a_home%20(2).svg"
              loading="lazy"
              alt=""
            />
          </Link>
          <Link href="#" className="mobile-bar-link w-inline-block">
            <img
              src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/6058703e233c35f06d95eeab_Projects.svg"
              loading="lazy"
              alt=""
            />
          </Link>
          <Link
            href="#"
            className="mobile-menu-button w-inline-block"
            data-w-id="da3d71f2-0efd-7bc8-77ff-08fc09cd7904"
          >
            <div
              data-is-ix2-target="1"
              className="lottie-menu-icon"
              data-w-id="da3d71f2-0efd-7bc8-77ff-08fc09cd7905"
              data-animation-type="lottie"
              data-src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/60587725e051a2be05473dcc_Lottie%20Menu%20Animation.json"
              data-loop="0"
              data-direction="1"
              data-autoplay="0"
              data-renderer="svg"
              data-default-duration="2"
              data-duration="0"
              data-ix2-initial-state="0"
            ></div>
          </Link>
          <Link href="#" className="mobile-bar-link w-inline-block">
            <img
              src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/6058703e3a273545cf97d31b_Profile.svg"
              loading="lazy"
              alt=""
            />
          </Link>
          <Link href="#" className="mobile-bar-link w-inline-block">
            <img
              src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/6058703ecc16b10bf2981896_Settings.svg"
              loading="lazy"
              alt=""
            />
          </Link>
        </div>
      </div>
    </>
  );
}
