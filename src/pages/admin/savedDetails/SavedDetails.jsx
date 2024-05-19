import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { getSavedDataById } from "../../../data/useSavedData";
import s from "./SavedDetails.module.css";
import Button from "../../../components/Button/Button";
import { parseDataContent } from "../../../utils/parseDataContent";
import { formatDate } from "../../../utils/formatDate";
import ModalShareData from "../../../components/ModalShareData/ModalShareData";
import useTokenPayload from "../../../hooks/useTokenPayload";
import { Toaster } from "react-hot-toast";

const SavedDetails = () => {
  const { id } = useParams();
  const [savedData, setSavedData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { userId } = useTokenPayload();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const data = await getSavedDataById(id);
        setSavedData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Error al obtener los detalles guardados");
        setLoading(false);
      }
    };

    fetchSavedData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const parsedData = savedData ? parseDataContent(savedData.data_content) : [];

  return (
    <>
      <div className={s.detailsContainer}>
        {isOpen && (
          <ModalShareData
            setIsOpen={setIsOpen}
            adminId={userId}
            savedDataId={id}
            onSuccess={handleSuccess}
          />
        )}
        <div className={s.headers}>
          <h1>Saved Details</h1>
          <Link className={s.btnLink} to={"/saved"}>
            <Button>Volver</Button>
          </Link>
        </div>
        {savedData ? (
          <div>
            <div className={s.shareData}>
              <div>
                <p>Description: {savedData.description}</p>
                <p>User Name: {savedData.user_name}</p>
                <p>Created At: {formatDate(savedData.created_at)}</p>
              </div>
              <Button onClick={() => setIsOpen(true)}>Share Data</Button>
            </div>
            <h2>Data Content:</h2>
            <div className={s.tableContainer}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.Name}</td>
                      <td>{row.Email}</td>
                      <td>{row.Age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>No data found</p>
        )}
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default SavedDetails;
