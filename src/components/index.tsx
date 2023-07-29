import { useState } from 'react';
import {
  numberrs,
  uppercaseLetters,
  lowercaseLetters,
  specialCharacters,
} from './charater';
import { SwitchComponent } from '../custom/switch/SwitchComponent';
import { Notification } from '../custom/notification/Notficattion';
import { CustomIcon } from '../custom/icons/CustomIcon';

export const Home = () => {
  const initialState = {
    upperCase: false,
    lowerCase: false,
    numbers: false,
    special: false,
  };
  const [password, setPassword] = useState<string>('');
  const [passwordLength, setPasswordLength] = useState<number>(20);
  const [options, setOptions] = useState(initialState);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    type: '',
    message: '',
  });

  const handleShowNotification = (type: string, message: string) => {
    setNotification({ type: type, message: message });
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleGneratePassword = () => {
    let char = '';
    if (options.lowerCase) char += lowercaseLetters;
    if (options.upperCase) char += uppercaseLetters;
    if (options.numbers) char += numberrs;
    if (options.special) char += specialCharacters;

    if (char === '') {
      handleShowNotification('error', 'Please select at least one option.');
      return;
    }
    setPassword(createPas(char));
    handleShowNotification('success', 'Password generated successfully!');
  };

  const createPas = (itm: string) => {
    let pwd = '';
    const charlength = itm.length;

    for (let i = 0; i < passwordLength; i++) {
      const chIdx = Math.floor(Math.random() * charlength);
      pwd = pwd + itm.charAt(chIdx);
    }
    return pwd;
  };

  const copyToClipboard = async () => {
    if (!password) {
      handleShowNotification('error', 'Nothing to copied!');
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      handleShowNotification('success', 'Password copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy password: ', err);
      handleShowNotification('error', 'Failed to copy password.');
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    name === 'passwordLength'
      ? setPasswordLength(parseInt(value, 10))
      : setOptions((prev) => ({ ...prev, [name]: checked }));
  };
  return (
    <div className="mainWrapper">
      <div className="mainNotification">
        {showNotification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>

      <div className="mainContainer">
        <div>
          <h1>Password Generator</h1>
        </div>
        <div className="textCopy">
          <h2>{password}</h2>
          <CustomIcon
            icon="copy"
            color="white"
            size={20}
            onClick={copyToClipboard}
          />
        </div>
        <div className="fieldWrapper">
          <div className="slider_container">
            <input
              type="range"
              value={passwordLength}
              name="passwordLength"
              max={20}
              min={10}
              onChange={changeHandler}
            />
            <span className="slider_value">{passwordLength}</span>
          </div>
          {Object.entries(options).map(([name, checked]) => (
            <div key={name} className="field">
              <label htmlFor="">{name}</label>
              {SwitchComponent({
                name: name,
                checked: checked,
                onChange: changeHandler,
              })}
            </div>
          ))}
        </div>

        <div className="btnContainer">
          <CustomIcon icon="key" color="white" size={20} />
          <button className="btn" onClick={handleGneratePassword}>
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};
