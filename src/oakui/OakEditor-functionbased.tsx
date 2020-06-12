import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import './styles/oak-editor.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const Delta = Quill.import('delta');
const Break = Quill.import('blots/break');
const Embed = Quill.import('blots/embed');

interface Props {
  id: string;
  data: any;
  handleChange: any;
  bubble?: boolean;
  label?: string;
  handleEnter?: Function;
}
const OakEditor = (props: Props) => {
  const [blockApiChangeEvents, setBlockApiChangeEvents] = useState(true);
  const modules = {
    toolbar: [
      [
        'bold',
        'italic',
        'underline',
        'strike',
        { align: 'left' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
        // { header: 1 },
        // { header: 2 },
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { color: [] },
        { background: [] },
        // 'blockquote',
        'code-block',
        { header: [1, 2, 3, 4, 5, 6, false] },
        { font: [] },
        // 'clean',
        'image',
      ],
    ],
    keyboard: {
      bindings: {
        linebreak: {
          key: 13,
          shiftKey: false,
          handler(range) {
            // do nothing
          },
        },
      },
    },
    // keyboard: {
    //   bindings: {
    //     linebreak: {
    //       key: 13,
    //       shiftKey: false,
    //       handler(range) {
    //         const currentLeaf = quill.getLeaf(range.index)[0];
    //         const nextLeaf = quill.getLeaf(range.index + 1)[0];

    //         quill.insertEmbed(range.index, 'break', true, 'user');
    //         if (nextLeaf === null || currentLeaf.parent !== nextLeaf.parent) {
    //           quill.insertEmbed(range.index, 'break', true, 'user');
    //         }
    //       },
    //     },
    //   },
    // },
    // keyboard: {
    //   bindings: {
    //     handleEnter: {
    //       shift: false,
    //       key: 13,
    //       handler() {
    //         // Do nothing
    //       },
    //     },
    //   },
    // },
  };

  const formats = [
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
  ];
  const handleChange = (value, delta, source) => {
    if (source === 'api' && blockApiChangeEvents) {
      setBlockApiChangeEvents(false);
    } else {
      props.handleChange({
        target: {
          name: props.id,
          value,
        },
      });
    }
  };
  const handleKeyUp = event => {
    // console.log(event.key);
    // event.preventDefault();
    // if (event.key !== 'Enter') {
    //   console.log('stop');
    //   event.preventDefault();
    // event.stopPropagation();
    // }
    if (event.keyCode === 13) {
      console.log('enter');
      props.handleEnter && props.handleEnter();
    }
  };
  return (
    <div className={props.bubble ? 'oak-editor bubble' : 'oak-editor'}>
      <label>{props.label}</label>
      <ReactQuill
        value={props.data[props.id]}
        onChange={handleChange}
        theme={props.bubble ? 'bubble' : 'snow'}
        modules={modules}
        formats={formats}
        // onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default OakEditor;
