import { useState, forwardRef, useImperativeHandle } from 'react';

const Toggle = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }));

  return (
    <>
      {visible ? (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleVisibility}>New Blog</button>
        </div>
      )}
    </>
  );
});

export default Toggle;
