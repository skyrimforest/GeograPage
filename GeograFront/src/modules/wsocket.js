const path = "ws://localhost:9000/websocket/";
function init() {
  let ws = new WebSocket(this.path);
  //监听是否连接成功
  this.ws.onopen = () => {
    console.log("ws连接状态:" + this.ws.readyState);
    //连接成功则发送一个数据
    this.ws.send("连接成功");
  };

  //接听服务器发回的信息并处理展示
  this.ws.onmessage = (data) => {
    console.log("接收到来自服务器的消息：");
    console.log(data);
  };

  //监听连接关闭事件
  this.ws.onclose = () => {
    //监听整个过程中websocket的状态
    console.log("ws连接状态:" + this.ws.readyState);
  };

  //监听并处理error事件
  this.ws.onerror = function (error) {
    console.log(error);
  };
}
