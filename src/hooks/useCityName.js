import { useState, useEffect } from "react";

const useCityName = (coordinates) => {
  const [state, setState] = useState({ loaded: false });

  useEffect(() => {
    const fetchCityName = async () => {
      if (!coordinates || !coordinates.lat || !coordinates.lng) {
        setState({ loaded: false });
        return;
      }

      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.lat}&longitude=${coordinates.lng}&localityLanguage=ko`
        );
        
        if (!response.ok) {
          throw new Error('도시 정보를 가져오는데 실패했습니다.');
        }

        const data = await response.json();
        setState({
          loaded: true,
          city: data.principalSubdivision || "",
          district: data.locality || "",
          country: data.countryName || "",
          error: null
        });
      } catch (error) {
        setState({
          loaded: true,
          city: "",
          district: "",
          country: "",
          error: error.message
        });
      }
    };

    fetchCityName();
  }, [coordinates]);

  console.log("City Name State: {coordinates.lat, coordinates.lng}", coordinates.lat, coordinates.lng);
  return state;
};

export default useCityName;