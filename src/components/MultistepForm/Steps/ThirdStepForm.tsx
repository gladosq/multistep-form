import {DEFAULT_START_SUM, DEFAULT_TIME} from '@/store/form.ts';
import {InputNumber, InputNumberProps, Slider} from 'antd';
import s from '@/components/MultistepForm/MultistepForm.module.scss';
import {Form} from 'antd';
import {useState} from 'react';

export default function ThirdStepForm() {
  const [inputSumValue, setInputSumValue] = useState(DEFAULT_START_SUM);
  const [inputTimeValue, setInputTimeValue] = useState(DEFAULT_TIME);

  const onChangeSum: InputNumberProps['onChange'] = (newValue) => {
    setInputSumValue(newValue as number);
  };

  const onChangeTime: InputNumberProps['onChange'] = (newValue) => {
    setInputTimeValue(newValue as number);
  };

  return (
    <>
      <div className={s.captionContainer}>
        <h3 className={s.titleCaption}>Выберите сумму займа</h3>
        <InputNumber
          disabled
          min={200}
          max={1000}
          type={'number'}
          step={100}
          style={{margin: '0 16px'}}
          value={inputSumValue}
        />
      </div>
      <Form.Item
        name='sum'
      >
        <Slider
          className={s.slider}
          min={200}
          max={1000}
          step={100}
          onChange={onChangeSum}
          value={inputSumValue}
        />
      </Form.Item>
      <div className={s.captionContainer}>
        <h3 className={s.titleCaption}>Выберите срок займа</h3>
        <InputNumber
          min={10}
          max={30}
          type={'number'}
          step={1}
          style={{margin: '0 16px'}}
          value={inputTimeValue}
          disabled
        />
      </div>
      <Form.Item
        name='time'
        valuePropName='checked'
      >
        <Slider
          className={s.slider}
          min={10}
          max={30}
          step={1}
          onChange={onChangeTime}
          value={inputTimeValue}
        />
      </Form.Item>
    </>
  );
}
