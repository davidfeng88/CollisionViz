import React from 'react';

const DetailEntry = ({ name, value }) => {
  return(
    <tr>
      <th>{name}</th>
      <td>{value}</td>
    </tr>
  );
};

export default DetailEntry;
