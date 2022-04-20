import React from 'react'
import  {data}  from "../../common/actions/data.js"
export default function ProductGrupos(props) {
  const grouName = props.group;
  console.log(data)
  const groupList = grouName.map((group, k) => {
    return (
      <div key={k}>{group}</div>
    )
  })
  return (
    <div>{
     groupList
    }</div>
  )
}
