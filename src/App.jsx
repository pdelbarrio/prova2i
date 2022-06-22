import "./App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import { useState } from "react";
import { inputValidation } from "./utils/validation";
import image from "./picto-tpv.png";
import { setErrorToast } from "./utils/toasts";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
        setErrorToast("No hay datos para esta consulta");
        setDataFromDB(null);
      }
    } catch (error) {
      console.log(error.response);

      return error.response;
    }
  };

  return (
    <div className="App">
      <div className="maincontainer">
        <div className="header">
          <img className="image" src={image} alt="image" />
          <p className="App-header">SERVICIOS</p>
        </div>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <label className="input">
            <div>
              <input
                type="number"
                {...register("clientCode", inputValidation, {
                  valueAsNumber: true,
                })}
              />
              {errors.clientCode ? (
                <p className="error">{errors.clientCode.message}</p>
              ) : null}
            </div>
            <p>Código Cliente</p>
          </label>

          <label className="input">
            <div>
              <input
                type="number"
                {...register("stationCode", inputValidation, {
                  valueAsNumber: true,
                })}
              />

              {errors.stationCode ? (
                <p className="error">{errors.stationCode.message}</p>
              ) : null}
            </div>
            <p>Código Estación</p>
          </label>
          <div className="buttoncontainer">
            <div></div>
            <button type="submit">Consultar</button>
          </div>
        </form>
      </div>
      <div className="download">
        {dataFromDB ? <CSVLink data={dataFromDB}>Download data</CSVLink> : null}
      </div>
    </div>
  );
}

export default App;
