import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-grow container mx-auto p-6">
        <div className="surface-color card p-8 textShadow">
          <h1 className="text-4xl font-bold mb-6 text-center">About Niche Nest</h1>
          <p className="text-lg mb-4">
            Welcome to Niche Nest, your go-to platform for connecting with top-notch freelancers.
            We provide a wide range of services to make your life easier and your projects successful.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <p className="text-lg mb-4">
            At Niche Nest, we believe in making the job easier for our customers by providing access to
            skilled freelancers who can handle a variety of tasks. Whether you need a cobbler, a UFO hunter,
            or a psychic, we have the right person for the job.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-lg mb-4">
            We are a team of dedicated professionals committed to connecting clients with the best freelancers
            in the industry. Our mission is to make it easy for you to find the right person for your needs,
            no matter how unique they may be.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

