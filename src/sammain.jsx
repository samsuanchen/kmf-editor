var React=require("react");
var E=React.createElement;
var fs=require("./socketfs");
var kcm=require("ksana-codemirror");
var CodeMirror=kcm.Component;

var Controls=require("./controls");
//var fn="1n8_o.js";
var content=require("../bible/test.kmf");

var maincomponent = React.createClass({
  getInitialState:function() {
    return {text:content.text};
  }
  ,markText:function(tags){
    for (var i=0;i<tags.length;i++) {
      var tag=tags[i];
      //if (tag[2]!=="p" || !tag[3] || !tag[3]["xml:id"]) continue;
      //if (tag[1]=="lb/")continue;

      
      if (tag[1]>0) {
        var start=this.doc.posFromIndex( tag[0]);
        var end=this.doc.posFromIndex(tag[0]+tag[1]);
        this.doc.markText(start,end,{className:tag[2],readOnly:true,payload:tag[3]})
      }  else {
        var marker = document.createElement('span');
        marker.className= "tag";
        marker.innerHTML="<";
        if (tag[2][0]=="/") marker.innerHTML=">"
        if (tag[2][tag[2].length-1]=="/") marker.innerHTML="&#8823;"
        var start=this.doc.posFromIndex( tag[0]);
        this.doc.setBookmark(start,{widget:marker});
      }


    }

  }
  ,componentDidMount:function(){
    this.editor=this.refs.cm.getCodeMirror();
    this.doc=this.editor.doc;

    this.editor.focus();

    this.markText(content.tags);
  }
  ,inSource:function(){

  }
  ,onKeyUp:function(cm,evt){
  }
  ,breakSource:function(marker,at) { //break marker into two, to allow input
    var pos=marker.find();
    var py=marker.payload||{};
    var part1len=at.ch-pos.from.ch;
    console.log(part1len)
    this.doc.markText(pos.from , at ,{className:marker.className,readOnly:true,payload:{s:py.s,l:part1len}});
    this.doc.markText(at , pos.to , {className:marker.className,readOnly:true,payload:{s:py.s+part1len,l:py.l-part1len}});
    marker.clear();
  }
  ,onKeyPress:function(cm,evt) {
    var pos=this.doc.getCursor("from");
    var markers=this.doc.findMarksAt(pos);
    if (markers.length==1) {
      var m=markers[0];
      if (m.readOnly) this.breakSource(m,pos);
    }

  }
  ,render: function() {
    return E("div",{"data-i":1},
        E(Controls,{}),
        E(CodeMirror,{ref:"cm",value:this.state.text,theme:"ambiance"
          ,onKeyUp:this.onKeyUp,onKeyPress:this.onKeyPress})
      );
  }
});
module.exports=maincomponent;
