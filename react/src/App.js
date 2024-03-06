import { useState } from "react";
import "./App.css";
import Welcome from "./Componentes/Welcome/Welcome";
import Login from "./Componentes/Login/Login";
import Summary from "./Componentes/Summary/Summary";
import Movements from "./Componentes/Movements/Movements";
import Balance from "./Componentes/Balance/Balance";

function App() {
  const [account, setAccount] = useState({});
  const [token, setToken] = useState();

  //Si no recogemos ningun dato en movimientos, me lo das como un array vacío
  const { movements = [], owner: user = "" } = account;

  const handleLogin = (user, pin) => {
    // Aquí realizamos la lógica de autenticación, por ejemplo, enviamos los datos a un servidor.
    // Validamos si el usuario y la contraseña son correctos.

    fetch(`http://localhost:4000/login?username=${user}&pin=${pin}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error en la llamada a la API");
        }
        return res.json();
      })
      .then((datos) => {
        setAccount(datos.account);
        setToken(datos.token);
        console.log(datos);
      })
      .catch((error) => console.error(error, "estas con error"));
  };

  return (
    <>
      <nav>
        {/* Crear el componente welcome 
            recibe una propiedad que sea el nombre de usuario
            si está vacío muestra "Log in to get started"
            si está lleno muestra "Bienvenido, {nombre de usuario}" */}
        <Welcome user={user} />

        {/* Hacer el componente Login -> usar useRef como ya hicimos para hacer el login */}
        <Login onLogin={handleLogin} />
      </nav>

      {/*Si existe usuario y, como este dato es verdadero, saca todo lo que se define a continuación*/}
      {user && (
        <main className="app">
          {/* Hacer los movimientos
          recibe una propiedad que es el array de movimientos
          muestra una lista de movimientos que son un componente llamado Movement
          que recibe una propiedad que es el movimiento */}



          <Balance movements={movements} />
          <Movements movements={movements} />
          <Summary movements={movements} />

          <div className="operation operation--transfer">
            <h2>Transfer money</h2>
            <form className="form form--transfer">
              <input type="text" className="form__input form__input--to" />
              <input
                type="number"
                className="form__input form__input--amount"
              />
              <button className="form__btn form__btn--transfer">&rarr;</button>
              <label className="form__label">Transfer to</label>
              <label className="form__label">Amount</label>
            </form>
          </div>

          <div className="operation operation--loan">
            <h2>Request loan</h2>
            <form className="form form--loan">
              <input
                type="number"
                className="form__input form__input--loan-amount"
              />
              <button className="form__btn form__btn--loan">&rarr;</button>
              <label className="form__label form__label--loan">Amount</label>
            </form>
          </div>

          <div className="operation operation--close">
            <h2>Close account</h2>
            <form className="form form--close">
              <input type="text" className="form__input form__input--user" />
              <input
                type="password"
                maxlength="6"
                className="form__input form__input--pin"
              />
              <button className="form__btn form__btn--close">&rarr;</button>
              <label className="form__label">Confirm user</label>
              <label className="form__label">Confirm PIN</label>
            </form>
          </div>

          <p className="logout-timer">
            You will be logged out in <span className="timer">05:00</span>
          </p>
        </main>
      )}
    </>
  );
}

export default App;
