import React, { useState } from 'react';

const CoverImg = () => {
  const [buttonText, setButtonText] = useState('log in');
  const [headText, setHeadText] = useState('Already have an account');
  const [imgMessLeft, setImgMessLeft] = useState('50%');

  const handleclick = () => {
    if (buttonText === 'log in') {
      setButtonText('sign-up');
      setHeadText('Create An Account');
      setImgMessLeft('23%');
    } else {
      setButtonText('log in');
      setHeadText('Already have an account');
      setImgMessLeft('50%');
    }
  };

  return (
    <div className="img" style={{ zIndex: '5',left: imgMessLeft  }}>
      <div className="img-mess" >
        <h3 className="head" style={{ color: 'aliceblue' }}>
          <b>{headText}</b>
        </h3>
        <button className="login-activate" onClick={handleclick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CoverImg;
