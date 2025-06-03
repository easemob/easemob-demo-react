const serverConfigString = localStorage.getItem("serverConfig");

const serverConfig = serverConfigString ? JSON.parse(serverConfigString) : {};

export { serverConfig };
