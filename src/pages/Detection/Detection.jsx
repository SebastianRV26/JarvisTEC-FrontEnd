import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import classes from "./Detection.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { env } from "../../env/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Data"];
const baseDataset = [
  {
    label: "Gun",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  },
  {
    label: "Fire",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    label: "Rifle",
    backgroundColor: "rgba(53, 162, 170, 0.5)",
  },
];

const Detection = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState();

  const pollRequest = useCallback(() => {
    axios
      .get(env.BACKEND_URL + "models/detectorResults/")
      .then(function (response) {
        if (response.data.code === 400) {
          return;
        }
        if (Array.isArray(response.data.data)) {
          setChartData({
            labels,
            datasets: baseDataset.map((dataset, idx) => ({
              ...dataset,
              data: [response.data.data[idx].total],
            })),
          });
          setIsLoading(false);
        }
      });
  }, []);

  const detectRequest = (url) => {
    axios
      .get(env.BACKEND_URL + "models/objectDetector/", { params: { url } })
      .then(function (response) {
        if (response.data.code === 400) {
          return;
        }
        setIsLoading(true);
      });
  };

  useEffect(() => {
    if (isLoading) {
      let pollRequestTimer = setInterval(pollRequest, 1000);
      return () => {
        clearTimeout(pollRequestTimer);
      };
    }
  }, [isLoading, pollRequest]);

  const submitHandler = (event) => {
    event.preventDefault();
    detectRequest(url);
  };

  return (
    <Card>
      <h1 className="text-center">Object detection</h1>
      <form onSubmit={submitHandler} className="mt-1">
        <h2>Video URL (YouTube)</h2>{" "}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
      {isLoading && (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      )}
      {!isLoading && chartData && (
        <Bar className="mt-1" options={options} data={chartData} />
      )}
    </Card>
  );
};

export default Detection;
