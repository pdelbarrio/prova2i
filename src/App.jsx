import "./App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import { useState } from "react";

function App() {
  const { register, handleSubmit } = useForm();
  const [dataFromDB, setDataFromDB] = useState(null);

  const onSubmit = async (data) => {
    try {
      const { clientCode, stationCode } = data;
      // console.log(clientCode, stationCode);
      const res = await axios.get("http://localhost:4000/api/data", {
        params: { clientCode, stationCode },
      });
      res.data;
      console.log(res.data.data.data);
      setDataFromDB(res.data.data.data);
      if (!res.data.data.data[0]) {
        alert("No hay datos para esta consulta"); // TODO: poner un error con toastify???
        setDataFromDB(null);
      }
    } catch (error) {
      console.log(error.response);

      return error.response;
    }
  };

  return (
    <div className="App">
      <header className="App-header">SERVICIOS</header>
      <div className="maincontainer">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="input">
              <input
                type="number"
                {...register("clientCode", {
                  valueAsNumber: true,
                })}
              />

              <p>Código Cliente</p>
            </label>

            <label className="input">
              <input
                type="number"
                {...register("stationCode", {
                  valueAsNumber: true,
                })}
              />

              <p>Código Estación</p>
            </label>
          </div>
          <button type="submit">Consultar</button>
        </form>
      </div>
      <div className="download">
        {dataFromDB ? <CSVLink data={dataFromDB}>Download data</CSVLink> : null}
      </div>
    </div>
  );
}

export default App;
