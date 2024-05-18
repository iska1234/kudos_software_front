import * as React from "react";
import Input from "../../components/Input/Input";
import Papa from "papaparse";
import s from "./Files.module.css";
import { BadgeCheck } from "lucide-react";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal";
import useTokenPayload from "../../hooks/useTokenPayload";
import toast, { Toaster } from "react-hot-toast";

const Files = () => {
  const [data, setData] = React.useState([]);
const [tableHeaders, setTableHeaders] = React.useState([]);

  const [errors, setErrors] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const { userId } = useTokenPayload();

  const handleSuccess = () => {
    setData([]);
    setErrors([]);
    setIsOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const rowData = results.data.map((row) => ({ ...row }));
        setData(rowData);
        setTableHeaders(Object.keys(rowData[0]));
        validateFields(rowData);
      },
    });
  };
  
  const validateFields = (data) => {
    const newErrors = data.map((row) => {
      let errors = {
        Name: !row.Name ? "No se encontró el nombre" : "",
        Email: !row.Email ? "No se encontró el correo electrónico" : "",
        Age: !row.Age ? "No se encontró la edad" : "",
      };

      if (row.Name && typeof row.Name !== "string") {
        errors.Name = "El nombre debe ser una cadena de texto";
      } else if (
        row.Name &&
        typeof row.Name === "string" &&
        !/^[a-zA-Z\s]*$/.test(row.Name)
      ) {
        errors.Name = "El nombre solo puede contener letras y espacios";
      }

      if (
        row.Email &&
        !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(row.Email)
      ) {
        errors.Email = "El correo electrónico no es válido";
      }
      if (row.Age && isNaN(row.Age)) {
        errors.Age = "La edad debe ser un número";
      }

      return errors;
    });

    setErrors(newErrors);
  };

  const handleInputChange = (e, rowIndex, columnName) => {
    const { value } = e.target;
    const updatedData = [...data];
    updatedData[rowIndex][columnName] = value;
    setData(updatedData);
  };

  const handleUpdateRegister = () => {
    const completeRows = data.filter((row) => {
      return (
        row.Name &&
        typeof row.Name === "string" &&
        /^[a-zA-Z\s]*$/.test(row.Name) &&
        row.Email &&
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(row.Email) &&
        row.Age &&
        !isNaN(row.Age)
      );
    });

    if (completeRows.length === data.length) {
      setErrors([]);
      console.log("Datos guardados:", completeRows);
    } else {
      const newErrors = data.map((row) => ({
        Name:
          !row.Name ||
          typeof row.Name !== "string" ||
          !/^[a-zA-Z\s]*$/.test(row.Name)
            ? "El nombre no es válido"
            : "",
        Email:
          !row.Email ||
          !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(row.Email)
            ? "El correo electrónico no es válido"
            : "",
        Age: !row.Age || isNaN(row.Age) ? "La edad no es válida" : "",
      }));
      setErrors(newErrors);
    }
  };

  const handleSaveRegister = () => {
    if (!errors.length && data.length) {
      setIsOpen(true);
    }else{
      toast.error("There cannot be unfilled fields.")
    }
  };

  return (
    <div className={s.container}>
      <div className={s.input}>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} userId={userId} savedData={data} onSuccess={handleSuccess} />}
      {data.length ? (
        <>
          <p className={s.successData}>
            <BadgeCheck />
            Rows saved:{" "}
            {data.length -
              errors.filter((error) =>
                Object.values(error).some((value) => value !== "")
              ).length}
          </p>
          <div className={s.btnActionsContainer}>
            <Button onClick={handleUpdateRegister}>Update Registry</Button>
            <Button onClick={handleSaveRegister}>Save data</Button>
          </div>
          {errors.length ? (
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
                {data.map((row, rowIndex) => {
                  const hasError =
                    errors[rowIndex]?.Name ||
                    errors[rowIndex]?.Email ||
                    errors[rowIndex]?.Age;
                  return (
                    hasError && (
                      <tr key={rowIndex}>
                        <td>{rowIndex + 1}</td>
                        <td>
                          <Input
                            type="text"
                            value={row.Name}
                            onChange={(e) =>
                              handleInputChange(e, rowIndex, "Name")
                            }
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
                            onChange={(e) =>
                              handleInputChange(e, rowIndex, "Email")
                            }
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
                            onChange={(e) =>
                              handleInputChange(e, rowIndex, "Age")
                            }
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
                    )
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className={s.successMessage}>
              There are no errors. All data is valid.
            </p>
          )}
        </>
      ) : (
        <p className={s.successMessage}>Select a file to view the data</p>
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default Files;
