import axios from "axios";
import { useEffect, useState } from "react";
import { ResponseData, Station } from "../types/types";

const api = axios.create({
  baseURL: `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_BIKE_API_KEY}/json/bikeList`,
});

const useStations = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const promises = [
      api.get<ResponseData>("/1/1000"),
      api.get<ResponseData>("/1001/2000"),
    ];

    (async () => {
        setLoading(true)

        const responses = await Promise.all(promises)

        const tempStations: Station[] = []

        responses.forEach(res => {
            tempStations.push(...res.data.rentBikeStatus.row)
        })

        setStations(tempStations)

        setLoading(false)
    })()

  }, []);

  return {stations, loading}
};

export default useStations;