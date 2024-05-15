import * as React from "react";
import Input from "../../components/Input/Input";
import Papa from "papaparse";
import s from "./Files.module.css";

const Files = () => {
  const [data, setData] = React.useState([]);
  const [errors, setErrors] = React.useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const rowData = results.data.map((row) => ({
          ...row,
        }));
        setData(rowData);
        validateFields(rowData);
      },
    });
  };

  const validateFields = (data) => {
    const newErrors = data.map((row) => ({
      Name: !row.Name ? "No se encontró el nombre" : "",
      Email: !row.Email ? "No se encontró el correo electrónico" : "",
      Age: !row.Age ? "No se encontró la edad" : "",
    }));
    setErrors(newErrors);
  };

  const handleInputChange = (e, rowIndex, columnName) => {
    const { value } = e.target;
    const updatedData = [...data];
    updatedData[rowIndex][columnName] = value;
    setData(updatedData);
  };

  const handleSave = () => {
    console.log("Datos guardados:", data);
  };

  return (
    <div className={s.container}>
      <div className={s.input}>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>

      {data.length ? (
        <>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Row</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}</td>
                  <td>
                    <Input
                      type="text"
                      value={row.Name}
                      onChange={(e) => handleInputChange(e, rowIndex, "Name")}
                      disabled={!errors[rowIndex]?.Name}
                      className={`${s.normalInput} ${
                        errors[rowIndex]?.Name && s.errorInput
                      }`}
                    />
                    {errors[rowIndex]?.Name && (
                      <p className={s.error}>{errors[rowIndex].Name}</p>
                    )}
                  </td>
                  <td>
                    <Input
                      type="email"
                      value={row.Email}
                      onChange={(e) => handleInputChange(e, rowIndex, "Email")}
                      disabled={!errors[rowIndex]?.Email}
                      className={`${s.normalInput} ${
                        errors[rowIndex]?.Email && s.errorInput
                      }`}
                    />
                    {errors[rowIndex]?.Email && (
                      <p className={s.error}>{errors[rowIndex].Email}</p>
                    )}
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={row.Age}
                      onChange={(e) => handleInputChange(e, rowIndex, "Age")}
                      disabled={!errors[rowIndex]?.Age}
                      className={`${s.normalInput} ${
                        errors[rowIndex]?.Age && s.errorInput
                      }`}
                    />
                    {errors[rowIndex]?.Age && (
                      <p className={s.error}>{errors[rowIndex].Age}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSave}>Guardar</button>
        </>
      ) : (
        <div className={s.errorDiv}>
          <p>Select a file to view the data</p>
        </div>
      )}
    </div>
  );
};

export default Files;
