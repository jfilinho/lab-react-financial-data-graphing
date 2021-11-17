import Chart from "chart.js/auto";
import axios from "axios";
import { useState, useEffect } from "react";
import FiltDate from "./FiltDate";
import MaxMin from "./MaxMin";

function Graph() {
    const [priceData, setPriceData] = useState({});
    const [chart, setChart] = useState(null);
    const [data, setData] = useState({});
    const [link, setLink] = useState(
        "http://api.coindesk.com/v1/bpi/historical/close.json"
    );

    useEffect(() => {
        if (data !== {}) {
            setLink(
                `https://api.coindesk.com/v1/bpi/historical/close.json?start=${data.initialDate}&end=${data.finalDate}&currency=${data.currency}`
            );
        }
    }, [data]);

    useEffect(() => {
        axios
            .get(link)
            .then((response) => {
                setPriceData({ ...response.data.bpi });
            })
            .catch((err) => {
                console.log(err);
            });

    }, [link, data]);

    useEffect(() => {
        function renderChart() {
            const ctx = document.getElementById("myCanvas").getContext("2d");

            if (chart) {
                chart.destroy();
            }
            const chartInstance = new Chart(ctx, {
                type: "line",
                data: {
                    labels: Object.keys(priceData),
                    datasets: [
                        {
                            label: "Preço de fechamento Bitcoin",
                            data: Object.values(priceData),
                        },
                    ],
                },
            });
            setChart(chartInstance);
        }
        renderChart();
    }, [priceData]);

    return (
        <div>
           
            <div>
                <FiltDate setData={setData} />
            </div>
            <div className=" sticky-top  d-flex justify-content-end">
                <MaxMin />
            </div>
            <div className="mt-4">
                <canvas id="myCanvas" />
            </div>
           
        </div>
    );
}

export default Graph;