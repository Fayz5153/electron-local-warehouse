import { useEffect, useState } from 'react'
import { Flex, Input, Select, Table } from 'antd';
import { BASE_URL } from '../../constant/baseUrl';

import Edit from './Edit';
import Minus from './Minus';
import Delete from './Delete';

const DataTable = ({
  render, 
  current, 
  setRender,
  type,
  search,
  inpValue,
  setType,
  setInpValue,
  loading,
  setLoading
}) => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);

  const getData = async () => {
    setLoading(true)
    let searchValue = search == "" ? "" : `name_like=${search}`
    let typeValue = type == "" ? "" : `&type=${type}`
    fetch(`${BASE_URL}/${current}?${searchValue +typeValue}`)
    .then((res)=>res.json())
    .then(async(result)=>{
      // console.log(result)
      const list = await result.map((i, index)=>({
        key:index+1,
        num:index+1,
        id:i?.id,
        name:i?.name,
        type:i?.type,
        quantity:i?.quantity
      }))
      setData(list)
      setLoading(false)
    })
  }
  
  useEffect(() => {
    getData()
  }, [render, search, type, current]);

  useEffect(() => {
    (()=> {
      fetch(`${BASE_URL}/type`)
      .then((res)=>res.json())
      .then(async(result)=>{
        // console.log(result)
        const list = await result.map((i, index)=>({
          label:i.name,
          value:i.name,
        }))
        setOptions(list)
      })
    })()
  }, [render]);

  const columns = [
    {
      title: '№',
      dataIndex: 'num',
      key: 'num',
      width: 70
    },
    {
      title: 'Nomi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Turi',
      dataIndex: 'type',
      key: 'type',
      hidden: current == "materials" ? 0 : 1
    },
    {
      title: 'Soni',
      dataIndex: 'quantity',
      key: 'quantity',
      hidden: current == "materials" ? 0 : 1
    },
    {
      title: 'Harakatlar',
      dataIndex: 'id',
      key: 'id',
      render:(id)=> <>
        {current == "materials" && <Minus id={id} current={current} setRender={setRender}/>}
        <Edit id={id} current={current} setRender={setRender} options={options}/>
        <Delete id={id} current={current} setRender={setRender}/>
      </>
    }
  ]
  
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="middle"
      scroll={{ x: 'calc(75% + 100px)', y: 70 * 8, }}
      loading={loading}
      title={() => (
        <Flex justify='space-between' gap={10}>
          <Flex justify='flex-start' gap={10}>
            <Input 
              placeholder='Izlash...' 
              value={inpValue}
              style={{width:250}}
              onChange={(e)=>setInpValue(e.target.value)}
            />
            {current == "materials" && <Select 
              placeholder="Mahsulot turi"
              options={[
                {label:"Hammasi", value:""},
                ...options
              ]}
              value={type || undefined}
              style={{width:250}}
              onChange={(e)=>setType(e)}
            />}
          </Flex>
          <Flex>

          </Flex>
        </Flex>
      )}
    />
  )
}

export default DataTable
