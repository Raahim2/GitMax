import React from 'react';

const Navbar = () => {
  return (
    <div className="container-default w-container">
      <div className="header-content-wrapper">
        <a href="/" className="header-logo-link w-nav-brand">
          <img
            src="https://cdn.prod.website-files.com/61a6a6cae0915e1a66f08845/61a6a7a3ed8e3071b834b7d3_logo-landingly-template.svg"
            alt="Landingly X Webflow Template - Logo"
            className="header-logo"
          />
        </a>
        <div className="header-right-side">
          <nav role="navigation" className="header-nav-menu-wrapper w-nav-menu">
            <ul role="list" className="header-nav-menu-list">
              <li className="header-nav-list-item">
                <a href="/" className="text-200 medium nav-link text-size-25px-tablet">
                  Home
                </a>
              </li>
              <li className="header-nav-list-item">
                <div
                  data-hover="true"
                  data-delay="0"
                  data-w-id="d27ef3c3-8c88-d25b-9382-1e70750426da"
                  className="dropdown-wrapper w-dropdown"
                >
                  <div className="text-200 medium dropdown-nav-link text-size-25px-tablet w-dropdown-toggle">
                    <div>Pages</div>
                    <div className="line-rounded-icon dropdown-arrow"></div>
                  </div>
                  <nav className="dropdown-container w-dropdown-list">
                    <div className="dropdown-column-wrapper">
                      <div className="dropdown-pd">
                        <div className="w-layout-grid grid-2-columns _2-col-mbl _1-col-mbp">
                          <div
                            id="w-node-_718c5980-f4a0-8051-27a5-c13d90e5adf1-750426ce"
                            className="menu-wrapper"
                          >
                            <div className="text-200 bold menu-title">Menu</div>
                            <div className="nav-content">
                              <ul role="list" className="list-nav w-list-unstyled">
                                <li className="list-nav-item">
                                  <a href="/landing-pages/landing-page-v1" className="text-200 medium nav-link">
                                    Landing Page 1
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a
                                    href="/landing-pages/landing-page-v2"
                                    aria-current="page"
                                    className="text-200 medium nav-link w--current"
                                  >
                                    Landing Page 2
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/landing-pages/landing-page-v3" className="text-200 medium nav-link">
                                    Landing Page 3
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/webinar-pages/webinar-page-v1" className="text-200 medium nav-link">
                                    Webinar Page V1
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/webinar-pages/webinar-page-v2" className="text-200 medium nav-link">
                                    Webinar Page V2
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/webinar-pages/webinar-page-v3" className="text-200 medium nav-link">
                                    Webinar Page V3
                                  </a>
                                </li>
                              </ul>
                              <ul role="list" className="list-nav last w-list-unstyled">
                                <li className="list-nav-item">
                                  <a href="/ebook-pages/ebook-page-v1" className="text-200 medium nav-link">
                                    Ebook Page V1
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/ebook-pages/ebook-page-v2" className="text-200 medium nav-link">
                                    Ebook Page V2
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/ebook-pages/ebook-page-v3" className="text-200 medium nav-link">
                                    Ebook Page V3
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/coming-soon" className="text-200 medium nav-link">
                                    Coming Soon
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/thank-you-page" className="text-200 medium nav-link">
                                    Thank You Page
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div
                            id="w-node-_718c5980-f4a0-8051-27a5-c13d90e5ae18-750426ce"
                            className="menu-wrapper last"
                          >
                            <div className="text-200 bold menu-title">Utility Pages</div>
                            <div className="nav-content">
                              <ul role="list" className="list-nav last w-list-unstyled">
                                <li className="list-nav-item">
                                  <a href="/template-pages/start-here" className="text-200 medium nav-link">
                                    Start Here
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/template-pages/style-guide" className="text-200 medium nav-link">
                                    Style Guide
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a
                                    href="https://landinglytemplate.webflow.io/401"
                                    className="text-200 medium nav-link"
                                  >
                                    Password Protected
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a
                                    href="https://landinglytemplate.webflow.io/404"
                                    className="text-200 medium nav-link"
                                  >
                                    404 Not Found
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/template-pages/licenses" className="text-200 medium nav-link">
                                    Licenses
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a href="/template-pages/changelog" className="text-200 medium nav-link">
                                    Changelog
                                  </a>
                                </li>
                                <li className="list-nav-item">
                                  <a
                                    href="https://brixtemplates.com/more-webflow-templates"
                                    className="text-200 medium nav-link special"
                                  >
                                    Browse More Templates
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
              </li>
              <li className="header-nav-list-item show-in-tablet header-menu-button-mobile">
                <a
                  href="https://brixtemplates.com/"
                  target="_blank"
                  className="btn-primary menu-button-mobile w-button"
                >
                  Get Template
                </a>
              </li>
            </ul>
          </nav>
          <a
            href="https://webflow.com/templates/html/landingly-x-landing-page-website-template"
            target="_blank"
            className="btn-primary small header-btn-hidde-on-mb w-button"
          >
            Get Template
          </a>
          <div className="hamburger-menu-wrapper w-nav-button">
            <div className="hamburger-menu-bar top"></div>
            <div className="hamburger-menu-bar bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
