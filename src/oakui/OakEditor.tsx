import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import './styles/oak-editor.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import OakEditorToolbar from './OakEditorToolbar';

interface Props {
  id: string;
  data: any;
  handleChange: any;
  handleEnter?: Function;
  bubble?: boolean;
  label?: string;
  indent?: boolean;
  font?: boolean;
  heading?: boolean;
  size?: boolean;
  color?: boolean;
  align?: boolean;
  bottom?: boolean;
  center?: boolean;
}
interface State {
  blockApiChangeEvents: boolean;
  customClass: string;
}

class OakEditor extends React.Component<Props, State> {
  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'color',
    'font',
    'code-block',
    'link',
    'image',
    'background',
    'align',
    'size',
  ];

  // modules = {
  //   toolbar: [
  //     [
  //       'bold',
  //       'italic',
  //       'underline',
  //       'strike',
  //       { align: 'left' },
  //       { align: 'center' },
  //       { align: 'right' },
  //       { align: 'justify' },
  //       // { header: 1 },
  //       // { header: 2 },
  //       { list: 'ordered' },
  //       { list: 'bullet' },
  //       { indent: '-1' },
  //       { indent: '+1' },
  //       { color: [] },
  //       { background: [] },
  //       // 'blockquote',
  //       'code-block',
  //       { header: [1, 2, 3, 4, 5, 6, false] },
  //       { font: [] },
  //       // 'clean',
  //       'image',
  //     ],
  //   ],
  //   keyboard: {
  //     bindings: {
  //       linebreak: {
  //         key: 13,
  //         shiftKey: false,
  //         handler(range) {
  //           // handleEnter();
  //         },
  //       },
  //     },
  //   },
  // };

  modules = {
    toolbar: {
      container: '#toolbar',
    },
    keyboard: {
      bindings: {
        linebreak: {
          key: 13,
          shiftKey: false,
          handler(range) {
            // handleEnter();
          },
        },
      },
    },
  };

  IMAGE_MIME_REGEX = /^image\/(p?jpeg|gif|png)$/i;

  constructor(props: any) {
    super(props);
    this.state = {
      customClass: '',
      blockApiChangeEvents: true,
    };
  }

  componentDidMount() {
    document.onpaste = e => {
      const items = e.clipboardData?.items;

      if (items) {
        for (let i = 0; i < items.length; i += 1) {
          if (this.IMAGE_MIME_REGEX.test(items[i].type)) {
            e.preventDefault();
            this.loadImage(items[i].getAsFile());
            return;
          }
        }
      }
    };
  }

  loadImage = function(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      if (e?.target?.result) {
        const img: any = document.createElement('img');
        img.src = e.target.result;

        const range = window?.getSelection()?.getRangeAt(0);
        if (range) {
          range.deleteContents();
          range.insertNode(img);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  handleEnter = event => {
    if (
      event.keyCode === 13 &&
      !event.shiftKey &&
      this.props.data[this.props.id] !== '<p><br></p>'
    ) {
      this.props.handleEnter && this.props.handleEnter();
    }
  };

  handleChange = (value, delta, source) => {
    if (source === 'api' && this.state.blockApiChangeEvents) {
      this.setState({ blockApiChangeEvents: false });
    } else {
      this.props.handleChange({
        target: {
          name: this.props.id,
          value,
        },
      });
    }
  };

  handleFocus = () => {
    this.setState({ ...this.state, customClass: 'active' });
  };

  handleBlur = () => {
    this.setState({ ...this.state, customClass: '' });
  };

  render() {
    return (
      <div
        className={`oak-editor ${this.props.bubble ? 'bubble' : ''} ${
          this.state.customClass
        } ${this.props.center ? 'center' : ''}`}
      >
        <label>{this.props.label}</label>
        {!this.props.bottom && (
          <OakEditorToolbar
            indent={this.props.indent}
            font={this.props.font}
            heading={this.props.heading}
            size={this.props.size}
            color={this.props.color}
            align={this.props.align}
          />
        )}
        <div className="quill-wrapper">
          <ReactQuill
            value={this.props.data[this.props.id]}
            onChange={this.handleChange}
            theme={this.props.bubble ? 'bubble' : 'snow'}
            modules={this.modules}
            formats={this.formats}
            onKeyUp={this.handleEnter}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {/* <div className="visibility-control">show</div> */}
        </div>
        {this.props.bottom && (
          <OakEditorToolbar
            indent={this.props.indent}
            font={this.props.font}
            heading={this.props.heading}
            size={this.props.size}
            color={this.props.color}
            align={this.props.align}
          />
        )}
      </div>
    );
  }
}

export default OakEditor;
