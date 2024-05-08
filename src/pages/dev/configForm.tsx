import { Switch } from "easemob-chat-uikit";
import { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setSDKConfig } from "../../store/loginSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
const ConfigForm = () => {
  const dispatch = useAppDispatch();
  const saveConfig = () => {
    localStorage.setItem("serverConfig", JSON.stringify(config));
    dispatch(
      setSDKConfig({
        appKey: config.appkey,
        useDNS: !config.useCustomServer,
      })
    );
    toast.success("保存成功");
  };

  const [config, setConfig] = useState({
    appkey: "",
    msync: "",
    rest: "",
    useAppkey: false,
    useCustomServer: false,
  });

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem("serverConfig") || "{}");
    if (config) {
      setConfig(config);

      dispatch(
        setSDKConfig({
          appKey: config.appkey,
          useDNS: !config.useCustomServer,
        })
      );
    }
  }, []);

  const handleSwitchChange =
    (type: string) => (event: ChangeEvent<HTMLInputElement>) => {
      console.log(type, event.target.checked);
      setConfig({
        ...config,
        [type]: event.target.checked,
      });
    };

  const handleInputChange =
    (type: string) => (event: ChangeEvent<HTMLInputElement>) => {
      console.log(type, event.target.value);
      setConfig({
        ...config,
        [type]: event.target.value,
      });
    };

  return (
    <div className="dev-config">
      <div className="dev-config-header">
        <div>服务器配置</div>
        <div className="dev-config-header-save" onClick={saveConfig}>
          保存
        </div>
      </div>
      <div className="dev-config-switchItem">
        <div className="dev-config-switchItem-label">使用自定义配置</div>
        <Switch
          checked={config.useAppkey}
          onChange={handleSwitchChange("useAppkey")}
        ></Switch>
      </div>
      <div className="dev-config-label">Appkey</div>
      <div>
        <input
          value={config.appkey}
          className="dev-config-input"
          placeholder="请输入"
          onChange={handleInputChange("appkey")}
        ></input>
      </div>
      <div className="dev-config-switchItem">
        <div className="dev-config-switchItem-label">使用私有服务器</div>
        <Switch
          checked={config.useCustomServer}
          onChange={handleSwitchChange("useCustomServer")}
        ></Switch>
      </div>
      <div className="dev-config-label">IM 服务器地址</div>
      <div>
        <input
          value={config.msync}
          className="dev-config-input"
          placeholder="请输入"
          onChange={handleInputChange("msync")}
        ></input>
      </div>
      <div className="dev-config-label">Rest 服务器地址</div>
      <div>
        <input
          value={config.rest}
          className="dev-config-input"
          placeholder="请输入"
          onChange={handleInputChange("rest")}
        ></input>
      </div>
    </div>
  );
};

export default ConfigForm;
