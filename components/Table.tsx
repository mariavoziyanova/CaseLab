import React from "react";
import { CurrencyLabel } from "@skbkontur/react-ui";
import { Vehicle,  vehicleTypeTitles} from "../data/vehicles/contracts";
type PropsTableItem = {
    vehicle: Vehicle; 
    number: number;
}

type PropsTable = {
    vehicles: Vehicle[];
}

const TableItem: React.FC<PropsTableItem> = ({ vehicle, number }) => {
    return (
        <tr>
            <td>{number}</td>
            <td>{vehicle.title}</td>
            <td>
                <CurrencyLabel value={vehicle.price} fractionDigits={2} />
            </td>
            <td>
            {vehicleTypeTitles[vehicle.type]}
            </td>
        </tr>
    );
};

export const Table: React.FC<PropsTable> = ({ vehicles }) => {
    return (
        <table>
            <caption> <strong> Таблица данных о ТС </strong> </caption>
            <thead>
            <tr>
                <th>#</th>
                <th>Название</th>
                <th>Цена, ₽</th>
                <th>Тип ТС</th>
            </tr>
            </thead>
            <tbody>
            {vehicles.map((x, i) => (
                <TableItem key={x.id} number={i + 1} vehicle={x} />
            ))}
            </tbody>
        </table>
    );
};
