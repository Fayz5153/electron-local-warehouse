import { useEffect, useState } from 'react';
import { BASE_URL } from '../../constant/baseUrl';
import { Form, Input, Modal, Select } from 'antd';

const AddSub = ({render, setRender}) => {
  const [form] = Form.useForm()
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }
  const onFinish = (e) => {
    console.log(e)
    fetch(`${BASE_URL}/materials`, {
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
  
  useEffect(() => {
    (()=> {
      fetch(`${BASE_URL}/type`)
      .then((res)=>res.json())
      .then(async(result)=>{
        const list = await result.map((i, index)=>({
          label:i.name,
          value:i.name,
        }))
        setOptions(list)
      })
    })()
  }, [render]);
  return (
    <>
      <span type="text" onClick={()=>setOpen(true)}>Mahsulot qo'shish</span>
      <Modal
        open={open}
        onOk={()=>form.submit()}
        okText="Qo'shish"
        cancelText="Bekor qilish"
        onCancel={handleCancel}
        onClose={handleCancel}
        title="Mahsulot qo'shish"
      >
        <Form
          form={form}
          onFinish={onFinish}
          name='add_material'
          layout="vertical"
        >
          <Form.Item name={"name"} label="Nomi" rules={[{required: true, message:"Bo'sh joyni to'ldiring"}]}>
            <Input/>
          </Form.Item>
          <Form.Item name={"type"} label="Turi" rules={[{required: true, message:"Bo'sh joyni to'ldiring"}]}>
            <Select options={options}/>
          </Form.Item>
          <Form.Item name={"quantity"} label="Soni" rules={[{required: true, message:"Bo'sh joyni to'ldiring"}]}>
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddSub
