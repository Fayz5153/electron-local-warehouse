import { useState } from "react";
import { ConfigProvider } from "antd";
import { ThemeProvider } from 'antd-style';
import { useDebounce } from "use-debounce";
import Header from "./components/Header/Header";
import DataTable from "./components/DataTable/DataTable";

function App() {
  const [render, setRender] = useState(0);
  const [current, setCurrent] = useState("materials");
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("");
  const [inpValue, setInpValue] = useState("");
  const [search] = useDebounce(inpValue, 700);

  let props = {
    render: render,
    setRender: setRender,
    current: current,
    setCurrent: setCurrent,
    type:type,
    search:search,
    inpValue:inpValue,
    setType:setType,
    setInpValue:setInpValue,
    loading:loading,
    setLoading:setLoading
  }
  return (
    <div className="container">
      <ThemeProvider appearance={'dark'}>
        <ConfigProvider
          theme={{
            components:{
              Table:{
                headerBg: '#141414',
              }
            }
          }}
        >
          <Header {...props}/>
          <br />
          <DataTable {...props}/>
        </ConfigProvider>
      </ThemeProvider>
    </div>
  )
}

export default App