import { ethers } from "ethers";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Banner = ({}) => {
  //   const loadsageDefi = useCallback(async () => {
  //     const tokenSymbol = await sagetoken.symbol();
  //     setSymbol(tokenSymbol);

  //     const tokenAmount = (await sageico.getTokenAmount()).toString();
  //     setTokenamount(ethers.utils.formatEther(tokenAmount));

  //     const totalToken = (await sageico.getTokenPurchase()).toString();
  //     setTotaltoken(totalToken.toString());
  //   }, [sagetoken, sageico]);

  //   useEffect(() => {
  //     loadsageDefi();
  //   }, [loadsageDefi]);

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
                <Button>Buy Ticket </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
