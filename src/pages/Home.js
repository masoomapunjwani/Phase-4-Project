import Hero from "../components/hero";
import Dashboard from "./dashboard";

export default function  Home({ user }) {
    if (user) {
      return <Hero username={user.username}/>;

    }else{
      return <Hero/>;
    }
}