import React from 'react'
import s from "./SharedDetails.module.css";
import { Link, useParams } from 'react-router-dom';
import { getSharedDataById } from '../../../data/useSharedData';
import Button from '../../../components/Button/Button';
import { parseDataContent } from '../../../utils/parseDataContent';
import { formatDate } from '../../../utils/formatDate';

const SharedDetails = () => {
  const { id } = useParams();
  const [savedData, setSavedData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const data = await getSharedDataById(id);
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
        <div className={s.headers}>
          <h1>Shared Details</h1>
          <Link className={s.btnLink} to={"/user"}>
            <Button>Volver</Button>
          </Link>
        </div>
        {savedData ? (
          <div>
            <p>Description: {savedData.description}</p>
            <p>Shared By Admin: {savedData.admin_name}</p>
            <p>Shared At: {formatDate(savedData.updated_at)}</p>
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
    </>
  );
};

export default SharedDetails;
