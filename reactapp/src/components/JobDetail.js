import React from 'react'

const JobDetail = (props) => {
  return (
    <><div>JobDetail</div>
    <h1>{props.name.repeat(props.count)}</h1></>
  )
}

export default JobDetail;