import "./App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { clientCode, stationCode } = data;
    console.log(clientCode, stationCode);
    const res = await axios.get("http://localhost:4000/api/data", {
      params: { clientCode, stationCode },
    });
    res.data;
    console.log(res.data.data.data[0]);
  };

  return (
    <div className="App">
      <header className="App-header">SERVICIOS</header>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <input
              type="number"
              {...register("clientCode", {
                valueAsNumber: true,
              })}
            />

            <p>Código Cliente</p>
          </label>
          <label>
            <input
              type="number"
              {...register("stationCode", {
                valueAsNumber: true,
              })}
            />

            <p>Código Estación</p>
          </label>
          <button type="submit">Descargar CSV</button>
        </div>
      </form>
    </div>
  );
}

export default App;
