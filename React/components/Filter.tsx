import { useState } from "react";
import React from "react";
import {VehicleType, VehicleFilter, vehicleTypes, vehicleTypeTitles} from "../data/vehicles/contracts";

type PropsFilter = {
  change: (data: VehicleFilter) => void
}

export const Filter: React.FC<PropsFilter> = ({ change }) => {
  const [myInput, setMyInput] = useState("");
  const [mySelect, setMySelect] = useState(-1);

  const type = (mySelect: number) => {
    if (mySelect === -1) {
      return null;
    } else {
      return vehicleTypes[mySelect];
    }
  }

  React.useEffect(() => {change({title: myInput, type: type(mySelect)});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myInput, mySelect]);

  const changeEv = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setMyInput(event.target.value);
    } else {
      setMySelect(+event.target.value);
    }
  }

  const getPair = (vehicleTypeTitles : Record<VehicleType, string>) => {
    return Object.entries(vehicleTypeTitles);
    }

  
  return (
    <div>
      <h2> Поиск по названию </h2>
      <input type="text" value={myInput} onChange={changeEv} />
      {/* <h3> Фильтр по типу ТС </h3> */}
      <select name="select" value={mySelect} onChange={changeEv}>
        <option value= "-1"> Сбросить фильтр </option>
        {getPair(vehicleTypeTitles).map((el) => {
          return (<option value={el[0]}> {el[1]} </option>);
        })}
      </select>
    </div>
  );
};