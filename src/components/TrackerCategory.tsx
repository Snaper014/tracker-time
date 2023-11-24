const TrackerCategory = ({category}: {category: string}) => {
  return (
    <tr>
      <th className="th-category" colSpan={4} >
        {category}
      </th>
    </tr>
  )
}
export {TrackerCategory}