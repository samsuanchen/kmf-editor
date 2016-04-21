var React=require("react");
var ReactDOM=require("react-dom");
require("ksana2015-webruntime/livereload")(); 
var ksanagap=require("ksana2015-webruntime/ksanagap");
ksanagap.boot("kmf-editor",function(){
	var Main=React.createElement(require("./src/sammain.jsx"));
	ksana.mainComponent=ReactDOM.render(Main,document.getElementById("main"));
});