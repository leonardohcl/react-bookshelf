import { Container } from "react-bootstrap";
import Navigation from "./organisms/Navigation";
import SearchCard from "./organisms/SearchCard";

function App() {
  return (
    <>
      <Navigation />
      <Container>
        <SearchCard />
      </Container>
    </>
  );
}

export default App;
