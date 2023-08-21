import React from "react";

export default function Input(props) {
  const {
    type,
    className,
    style,
    placeholder,
    id,
    name,
    onChange,
    isError,
    helperText,
  } = props;

  return (
    <>
      <input
        type={type}
        className={className || ""}
        style={style || {}}
        placeholder={placeholder || ""}
        id={id || ""}
        name={name || ""}
        onChange={onChange || null}
      />

      {isError ? <span className="text-danger">{helperText}</span> : ""}
    </>
  );
}
