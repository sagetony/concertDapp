import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Banner = ({ davidoconcert }) => {
  const [address, setAddress] = useState(null);

  const loadsageDefi = async () => {
    await davidoconcert.buyTicket();
  };

  const handleChange = async (event) => {
    setAddress(event.target.value);
  };
  const verifyUser = async (event) => {
    event.preventDefault();
    console.log("dsd");
    const result = await davidoconcert.whitelist(address);
    console.log(result);
  };
  return (
    <div>
      <section className="banner-area banner-bg">
        <div className="banner-shape-wrap">
          <img
            src="assets/img/banner/featured-1.jpg"
            alt=""
            className="img-one"
          />
          <img
            src="assets/img/banner/featured-1.jpg"
            alt=""
            className="img-two"
          />
          <img
            src="assets/img/banner/featured-1.jpg"
            alt=""
            className="img-three"
          />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="banner-content text-center">
                <img src="assets/img/banner/featured-1.jpg" alt="" />
                <h2 className="title">
                  The Biggest Music
                  <span> Event of the </span> Year
                </h2>
                <Button onClick={loadsageDefi}>Buy Ticket </Button>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-lg-10">
              <div className="banner-content text-center">
                <img src="assets/img/banner/featured-1.jpg" alt="" />
                <h4>Check Address For Whitelist</h4>
                <Form onSubmit={verifyUser}>
                  <div className="mt-3 mb-3">
                    <input
                      type="text"
                      onChange={handleChange}
                      value={address}
                      placeholder="Enter Wallet Address"
                    />
                  </div>
                  <Button type="submit">Check Address</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
