import { Button, Popconfirm } from 'antd';
import { BASE_URL } from '../../constant/baseUrl';
import { DeleteOutlined } from '@ant-design/icons';

const Delete = ({id, current, setRender}) => {
  const onConfirm = () => {
    console.log(id)
    fetch(`${BASE_URL}/${current}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setRender(Math.random())
        // handleCancel()
      });
  }
  
  return (
    <>
      <Popconfirm 
        placement="topRight"
        title={"O'chirilsinmi"}
        okText={"Ha"}
        cancelText={"Yoq"}
        onConfirm={()=>onConfirm()}
      >
        <Button danger type="text"><DeleteOutlined style={{fontSize:"20px"}}/></Button>
      </Popconfirm>
    </>
  )
}

export default Delete
