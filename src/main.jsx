var React=require("react");
var E=React.createElement;
var fs=require("./socketfs");
var CodeMirror=require("ksana-codemirror").Component;

var maincomponent = React.createClass({
  getInitialState:function() {
    return {value:"君子"};
  }
  ,componentDidMount:function(){
    this.editor=this.refs.cm.getCodeMirror();
    this.doc=this.editor.doc;

    this.editor.focus();
    fs.readFile("test.kmf","utf8",function(err,data){

    })
  }
  ,render: function() {
    return E(CodeMirror,{ref:"cm",value:this.state.value,theme:"ambiance"});
  }
});
module.exports=maincomponent;