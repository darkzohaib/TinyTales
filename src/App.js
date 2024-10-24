import RegisterComponent from "./components/RegisterComponent/RegisterComponent";
import ContainerComponent from "./components/ContainerComponent/ContainerComponent";

function App() {
  return (
    <ContainerComponent>
      <RegisterComponent></RegisterComponent>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <p>@Contact Us</p>
            <span style={{ fontSize: "14px" }}>
              <i className="fa-solid fa-envelope">: szaparadox786@gmail.com</i>
            </span>
            <br></br>
            <span style={{ fontSize: "14px" }}>
              <i className="fa-solid fa-phone">: 8957201698</i>
            </span>
          </div>
          <div className="col">
            <p>@Follow Us</p>
            <i className="fa-brands fa-facebook">: @TinyTalesOfficial</i>
            <br></br>
            <span style={{ fontSize: "14px" }}>
              <i className="fa-brands fa-square-instagram">
                : @TinyTalesOfficial
              </i>
            </span>
          </div>
          <div className="col">
            {" "}
            <p>@TradeMark</p>
            <i className="fa-solid fa-building">: TinyTalesOfficial.Ltd</i>
            <br></br>
            <span style={{ fontSize: "14px" }}>
              <i className="fa-solid fa-calendar-days">: @Since 2024</i>
            </span>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default App;
