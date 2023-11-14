import React, { useState, useEffect } from "react";
import { Vehicle, VehicleFilter} from "./data/vehicles/contracts";
import { VehicleApi } from "./data/vehicles/api";
import { Filter } from "./components/Filter";
import { Table } from "./components/Table";

const initialFilter: VehicleFilter = {
    title: "",
    type: null
};

export default function App() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    
    useEffect(() => {
      const ans = VehicleApi.search(initialFilter);
      setVehicles(ans);
    }, []);

    const myFilter = (filter: VehicleFilter) => {
      const ans = VehicleApi.search(filter);
      setVehicles(ans);
    }
  
    return (
      <>
        <Filter change={myFilter} />
        <Table vehicles={vehicles} />
      </>
    );
  };
  
