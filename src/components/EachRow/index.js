const EachRow = props => {
  const {details, onClickEachState} = props
  const {confirmed, name, active, deceased, recovered, population} = details
  return (
    <tr onClick={event => onClickEachState(event, details)}>
      <td className="tro">{name}</td>
      <td className="tr1">{confirmed}</td>
      <td className="tr2">{active}</td>
      <td className="tr3">{recovered}</td>
      <td className="tr4">{deceased}</td>
      <td className="tr4">{population}</td>
    </tr>
  )
}

export default EachRow
