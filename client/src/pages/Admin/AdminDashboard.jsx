import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { FaChartColumn } from "react-icons/fa6";
import { FaCartArrowDown, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#ff5a1f"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Ventes en tendance",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Ventes",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Ventes", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      console.log(salesDetail);
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Ventes", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="w-full px-[1rem] lg:px-[10rem] ">
        <div className="w-full flex flex-col md:flex-row justify-around flex-wrap gap-[3rem]">
          <div className="flex-1 w-full rounded bg-[#efecec] p-5 mt-5">
            <div className="font-bold rounded-full w-[50px] h-[50px] bg-orange-500 items-center flex justify-center p-3">
              <FaChartColumn className="text-white text-xl" />
            </div>

            <p className="mt-5">Ventes</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : sales.totalSales} F CFA
            </h1>
          </div>
          <div className="rounded flex-1 w-full bg-[#efecec] p-5 mt-5">
            <div className="font-bold rounded-full w-[50px] h-[50px] bg-orange-500 items-center flex justify-center p-3">
              <FaUsers className="text-white text-xl" />
            </div>

            <p className="mt-5">Clients</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded flex-1 w-full bg-[#efecec] p-5 mt-5">
            <div className="font-bold rounded-full w-[50px] h-[50px] bg-orange-500 items-center flex justify-center p-3">
              <FaCartArrowDown className="text-white text-xl" />
            </div>

            <p className="mt-5">Toutes les commandes</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="100%"
          />
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
