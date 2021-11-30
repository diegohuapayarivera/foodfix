import React from "react";

const TableFinished = ({ command }) => {
  const { observation, start, state, tablet } = command;
  return (
    <>
      <thead>
 
      </thead>
      <tbody>
        <tr>
          <th scope="row">Mesa: </th>
          <td>{tablet}</td>
        </tr>
        <tr>
          <th scope="row">Estado: </th>
          <td>{state === "T" ? "Terminado" : ""}</td>
        </tr>
        <tr>
          <th scope="row">Hora: </th>
          <td>{start}</td>
        </tr>
        <tr>
          <th scope="row">Observación: </th>
          <td>{observation}</td>
        </tr>
      </tbody>
    </>
  );
};

export default TableFinished;
