import Banner from "./Banner";
import AboutHome from "./AboutHome";
import HoverDevCards from "./HoverDevCards";
import PopularItem from "./PopularItem";
import { Link } from "react-router-dom";

import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from "react-awesome-button";
import UserReview from "./UserReview";
import Service from "./Service";
import Blog from "./Blog";
import Gallery from "./Gallery";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AboutHome></AboutHome>
      <Gallery></Gallery>
      <PopularItem></PopularItem>
      <div className="mx-auto text-center mb-10">
        <Link to="/availableCamp">
          <AwesomeButton type="primary">See all Camps</AwesomeButton>
        </Link>
      </div>
      <Service></Service>
      <HoverDevCards></HoverDevCards>
      <UserReview></UserReview>
      <Blog></Blog>
    </div>
  );
};

export default Home;
