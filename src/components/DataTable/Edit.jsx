import { useState } from 'react';
import { EditOutlined} from '@ant-design/icons';
import { BASE_URL } from '../../constant/baseUrl';
import { Button, Form, Input, Modal, Select } from 'antd';

const Edit = ({id, current, setRender, options}) => {
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
        form.setFieldsValue(result)
      })
  }
  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }
  
  const onFinish = async (e) => {
    console.log(e, data)
    if (current == "type") {
      await fetch(`${BASE_URL}/materials?type=${data.name}`)
      .then((res)=>res.json())
      .then(async(result)=>{
        const list = await result.map((i)=>i?.id)
        console.log(list)
        list.forEach(el => {
          fetch(`${BASE_URL}/materials/${el}`, {
            method: 'PATCH',
            body: JSON.stringify({type: e.name}),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
        });
      })
    }
    fetch(`${BASE_URL}/${current}/${id}`, {
      method: 'PATCH',
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
      <Button type="text" onClick={handleOpen}><EditOutlined style={{fontSize:"20px"}}/></Button>
      <Modal
        open={open}
        onOk={()=>form.submit()}
        okText="Saqlash"
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
          {current == "materials" && <>
            <Form.Item name={"type"} label="Turi" rules={[{required: true, message:"Bo'sh joyni to'ldiring"}]}>
              <Select options={options}/>
            </Form.Item>
            <Form.Item name={"quantity"} label="Soni" rules={[{required: true, message:"Bo'sh joyni to'ldiring"}]}>
              <Input/>
            </Form.Item>
          </>}
        </Form>
      </Modal>
    </>
  )
}

export default Edit
