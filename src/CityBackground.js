import React, { useState, useEffect } from "react";
import axios from "axios";

const CityBackground = ({ city }) => {
  const [imageUrl, setImageUrl] = useState("");

const unsplashKey = "0E2TaoZBTxm5G-37pPI_zim714glMkKEW_WWi-steyY";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/random?query=${city}&orientation=landscape&client_id=${unsplashKey}
`
        );
        const imageData = response.data;
        const image = imageData.urls.regular;
        setImageUrl(image);

        document.body.style.backgroundImage = `url(${image})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [city]);

  return null; 
};

export default CityBackground;
