import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to KidVest</h1>
      <Link to="/mini-games">
        <button>Play Mini Games</button>
      </Link>
    </div>
  );
}

export default Home;
