import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { Loader } from "../../components/loader/loader";
import { useAuth0 } from "@auth0/auth0-react";
import { CoursCard } from "../../components/courscard/coursCard";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const CoursDisponible = () => {
  const [allCours, setAllCours] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  const getAllCours = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.get(url_back_node + "/getAllCours", config);
      setAllCours(data.allCours);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  const memoizedAllCours = useMemo(() => getAllCours, []);

  useEffect(() => {
    setAllCours(memoizedAllCours);
  }, [memoizedAllCours]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        COURS DISPO
        {isloading ? (
          <Loader />
        ) : (
          Array.isArray(allCours) &&
          allCours.map((coursByProf, index) => (
            <Box sx={{ display: "flex", flexDirection: "row", margin: 2 }}>
              {Array.isArray(coursByProf.cours) &&
                coursByProf.cours.map((cours, index) => (
                  <Box sx={{ marginRight: 2, marginLeft: 2 }}>
                    <CoursCard
                      id_prof={coursByProf.id_user_auth}
                      titre={cours.titre}
                      description={cours.description}
                      id={cours._id}
                    />
                  </Box>
                ))}
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default CoursDisponible;
