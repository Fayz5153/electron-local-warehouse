import { useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { BASE_URL } from '../../constant/baseUrl';

const AddType = ({
  setRender, 
  loading,
  setLoading
}) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }
  
  const onFinish = (e) => {
    console.log(e)
    fetch(`${BASE_URL}/type`, {
      method: 'POST',
      body: JSON.stringify(e),
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
      <span type="text" onClick={()=>setOpen(true)}>Turini qo'shish</span>
      <Modal
        open={open}
        onOk={()=>form.submit()}
        okText="Qo'shish"
        cancelText="Bekor qilish"
        onCancel={handleCancel}
        onClose={handleCancel}
        title="Mahsulot turini qo'shish"
      >
        <Form
          form={form}
          onFinish={onFinish}
          name='add_type'
          layout="vertical"
        >
          <Form.Item name={"name"} label="Nomi" rules={[{required: true, message:"Bo'sh joyni to'ldiring"}]}>
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddType
