import s from '@/components/MultistepForm/MultistepForm.module.scss';
import {Form, Input, Select} from 'antd';
import {MaskedInput} from 'antd-mask-input';
import clsx from 'clsx';

const genderOptions = [
  {
    value: 'male',
    label: 'Мужской'
  }, {
    value: 'female',
    label: 'Женский'
  }
];

export default function FirstStepForm() {
  return (
    <>
      <Form.Item
        name='phone'
        className={clsx(s.formItem, s.formItemMask)}
        rules={[{
          required: true,
          message: 'Введите корректный телефон',
          pattern: /^\+7\(\d{3}\)-\d{3}-\d{4}$/
        }]}
        label={'Телефон'}
      >
        <MaskedInput mask={'+7(000)-000-0000'}/>
      </Form.Item>
      <Form.Item
        name='name'
        className={s.formItem}
        rules={[{required: true, message: 'Введите имя'}]}
        label={'Имя'}
      >
        <Input placeholder='Имя'/>
      </Form.Item>
      <Form.Item
        name='surname'
        className={s.formItem}
        rules={[{required: true, message: 'Введите фамилию'}]}
        label={'Фамилия'}
      >
        <Input placeholder='Фамилия'/>
      </Form.Item>
      <Form.Item
        name='gender'
        className={s.formItem}
        rules={[{required: true, message: 'Укажите пол'}]}
        label={'Пол'}
      >
        <Select
          placeholder={'Пол'}
          options={genderOptions.map((gender) => ({label: gender.label, value: gender.value}))}
        />
      </Form.Item>
    </>
  );
}
