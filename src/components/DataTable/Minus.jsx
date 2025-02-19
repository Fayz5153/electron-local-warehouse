import { useState } from 'react';
import { BASE_URL } from '../../constant/baseUrl';
import { Button, Form, Input, Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const Minus = ({id, current, setRender}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [form] = Form.useForm()
  const handleOpen = async () => {
    setOpen(true)
    fetch(`${BASE_URL}/${current}/${id}`)
      .then((res)=>res.json())
      .then((result)=>{
        console.log(result)
        setData(result)
      })
  }
  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }
  
  const onFinish = (e) => {
    let min = Number(data.quantity) - Number(e.quantity)
    let value = {
      quantity: min
    }
    fetch(`${BASE_URL}/${current}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setRender(Math.random())
        handleCancel()
      });
  }

  return (
    <>
      <Button type="text" onClick={handleOpen}><ShoppingCartOutlined style={{fontSize:"20px"}}/></Button>
      <Modal
        open={open}
        onOk={()=>form.submit()}
        okText="Saqlash"
        cancelText="Bekor qilish"
        onCancel={handleCancel}
        onClose={handleCancel}
        title="Mahsulot ayirish"
      >
        <Form
          form={form}
          onFinish={onFinish}
          name='minus_material'
          layout="vertical"
        >
          <Form.Item name={"quantity"} label="Soni" rules={[{required: true, message:"Bo'sh joyni to'ldiring"}]}>
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Minus
