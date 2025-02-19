import { Flex, Menu } from "antd"
import AddSub from './AddSub';
import AddType from './AddType';

const Header = ({
  render, 
  setRender, 
  current, 
  setCurrent,
  setType,
  setInpValue,
  loading,
  setLoading
}) => {
  const onClick = (e) => {
    // console.log('click ', e);
    if (e.keyPath[1] != "setting") {
      setCurrent(e.key);
      setType("")
      setInpValue("")
    }
  };
  
  let props = {
    render: render,
    setRender: setRender,
    loading:loading,
    setLoading:setLoading
  }

  const items = [
    {
      label: 'Ombor',
      key: 'materials',
    },
    {
      label: 'Maxsulot turi',
      key: 'type',
    },
    {
      label: 'Sozlamalar',
      key: 'setting',
      children:[
        {
          label: <AddSub {...props}/>,
          key : "setting1"
        },
        {
          label: <AddType {...props}/>,
          key : "setting2"
        }
      ]
    },
  ]
  return (
    <Flex gap={5} justify='space-between'>
      {/* <h2>Ombordagi mahsulotlar</h2> */}
      <Menu 
        onClick={onClick} 
        selectedKeys={[current]} 
        mode="horizontal" 
        items={items} 
        style={{width: "100%"}}
      />
      {/* <Space>
        <AddType {...props}/>
        <AddSub {...props}/>
      </Space> */}
    </Flex>
  )
}

export default Header
