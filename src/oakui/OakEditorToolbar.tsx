/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import './styles/oak-editor-toolbar.scss';

interface Props {
  indent?: boolean;
  font?: boolean;
  heading?: boolean;
  size?: boolean;
  color?: boolean;
  align?: boolean;
}
const OakEditorToolbar = (props: Props) => {
  return (
    <div className="oak-editor-toolbar">
      <div id="toolbar">
        <button className="toolbar-icon ql-bold" />
        <button className="toolbar-icon ql-italic" />
        <button className="toolbar-icon ql-underline" />
        <button className="toolbar-icon ql-strike" />
        {props.align && (
          <>
            <button className="toolbar-icon ql-align" value="center" />
            <button className="toolbar-icon ql-align" value="right" />
            <button className="toolbar-icon ql-align" value="justify" />
          </>
        )}
        <button className="toolbar-icon ql-list" value="ordered" />
        <button className="toolbar-icon ql-list" value="bullet" />
        {props.indent && (
          <button className="toolbar-icon ql-indent" value="-1" />
        )}
        {props.indent && (
          <button className="toolbar-icon ql-indent" value="+1" />
        )}
        {props.color && (
          <select className="toolbar-icon ql-color">
            <option value="red" />
            <option value="green" />
            <option value="blue" />
            <option value="#f0f0f0" />
            <option selected />
          </select>
        )}
        <button className="toolbar-icon ql-blockquote" />
        {props.font && <select className="toolbar-icon ql-font" />}
        {props.heading && <select className="toolbar-icon ql-header" />}
        {props.size && <select className="toolbar-icon ql-size" />}
        <button className="toolbar-icon ql-image" />
      </div>
    </div>
  );
};

export default OakEditorToolbar;
