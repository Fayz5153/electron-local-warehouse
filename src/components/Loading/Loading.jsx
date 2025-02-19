import React from 'react'
import "./style.scss"
import { Spin } from 'antd'

const Loading = ({loading}) => {
  // console.log(full)
  return (
    <div className={loading ? 'loadingScreen' : 'loadingScreen no_load'}>
      <Spin size='large'/>
    </div>
  )
}

export default Loading
