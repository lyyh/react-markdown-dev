// auto-generated from index.js via build.js, do not edit directly
CodeMirrorEditor = (function (require, module) {
  'use strict';

  var React = require('react');
  var CodeMirror;

  // adapted from:
  // https://github.com/facebook/react/blob/master/docs/_js/live_editor.js#L16

  // also used as an example:
  // https://github.com/facebook/react/blob/master/src/browser/ui/dom/components/ReactDOMInput.js

  var IS_MOBILE = typeof navigator === 'undefined' || (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  );

  if (!IS_MOBILE) {
    CodeMirror = require('codemirror');
  }

  var CodeMirrorEditor = React.createClass({
    getInitialState: function () {
      return {
        isControlled: this.props.value != null
      };
    },

    propTypes: {
      value: React.PropTypes.string,
      defaultValue: React.PropTypes.string,
      style: React.PropTypes.object,
      className: React.PropTypes.string,
      onChange: React.PropTypes.func
    },

    componentDidMount: function () {
      var isTextArea = this.props.forceTextArea || IS_MOBILE;
      if (!isTextArea) {
        this.editor = CodeMirror.fromTextArea(this.refs.editor, this.props);
        this.editor.on('change', this.handleChange);
        this.editor.on('paste', this.handlePasteEvent);
        // this.editor.on('inputRead',this.handleInputRead)
      }
    },

    componentDidUpdate: function () {
      if (this.editor) {
        if (this.props.value != null) {
          if (this.editor.getValue() !== this.props.value) {
            this.editor.setValue(this.props.value);
          }
        }
      }
    },

    handleChange: function () {
      if (this.editor) {
        var value = this.editor.getValue();
        if (value !== this.props.value) {
          this.props.onChange && this.props.onChange({
            target: {
              value: value
            }
          });
          if (this.editor.getValue() !== this.props.value) {
            if (this.state.isControlled) {
              this.editor.setValue(this.props.value);
            } else {
              this.props.value = value;
            }
          }
        }
      }
    },
    /**
     * 粘贴事件 支持字符串、图片粘贴
     */
    handlePasteEvent: function (editorInstance, e) {
      if (!(e.clipboardData && e.clipboardData.items)) {
        alert('浏览器不支持该操作');
        return;
      }
      var cbd = e.clipboardData
      for (var i = 0, len = cbd.items.length; i < len; i++) {

        var item = cbd.items[i];

        // mac上粘贴文件得到的是文件缩略图，粘贴事件里带有文件名称，利用如下判断hack掉
        // if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
        //   cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
        //   ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
        //   return;
        // }

        if (item.kind === "string") {
          item.getAsString(function (str) {
            console.log('字符串:')
            console.log(str)
          })
        } else if (item.kind === "file") {
          var blobFile = item.getAsFile()
          if (blobFile.size === 0) return

          // 异步传代码
          // var uploadFileURL = 'http://127.0.0.1:8000/uploadFile'
          // var fileData = new FormData()
          // fileData.append('file',blobFile)

          // $.ajax({
          //     type: "post",
          //     url: uploadFileURL,
          //     data: fileData,
          //     dataType: "json",
          //     success: function (response) {
          //         console.log(response.data)
          //     }
          // });

          //封装FileReader对象
          function readBlobAsDataURL(blob, callback) {
            var reader = new FileReader();
            reader.onload = function (e) {
              callback(e.target.result);
            };
            reader.readAsDataURL(blob);
          }

          //传参
          readBlobAsDataURL(blobFile, function (dataurl) {
            var insertStr = "<img src='" + dataurl + "' />"
            console.log(editorInstance)
            editorInstance.replaceSelection(insertStr);
          });

          console.log(blobFile)
          // pasteFile就是获取到的文件
        }
      }
    },
    render: function () {
      var editor = React.createElement('textarea', {
        ref: 'editor',
        value: this.props.value,
        readOnly: this.props.readOnly,
        defaultValue: this.props.defaultValue,
        onChange: this.props.onChange,
        style: this.props.textAreaStyle,
        className: this.props.textAreaClassName || this.props.textAreaClass
      });

      return React.createElement('div', {
        style: this.props.style,
        className: this.props.className
      }, editor);
    }
  });

  module.exports = CodeMirrorEditor;

  return module.exports;
}(function (id) {
  if (id === "react") return React;
  else if (id === "codemirror") return CodeMirror;
  else throw new Error("Unexpected require of " + id);
}, {
  exports: {}
}));
