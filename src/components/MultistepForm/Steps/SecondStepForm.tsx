import s from '@/components/MultistepForm/MultistepForm.module.scss';
import {Form, Input, Select} from 'antd';
import {useEffect, useState} from 'react';
import useJobs from '@/api/jobs.ts';

export default function SecondStepForm() {
  const [jobPlaces, setJobPlaces] = useState([]);
  const {data, isSuccess, isLoading} = useJobs();

  useEffect(() => {
    if (isSuccess && data) {
      setJobPlaces(data);
    }
  }, [data, isSuccess]);

  return (
    <div>
      <Form.Item
        name='job'
        className={s.formItem}
        rules={[{required: true, message: 'Выберите место работы'}]}
        label={'Местро работы'}
      >
        <Select
          placeholder={'Место работы'}
          loading={isLoading}
          options={jobPlaces && jobPlaces.map((item: string) => ({label: item, value: item}))}
        />
      </Form.Item>
      <Form.Item
        name='address'
        className={s.formItem}
        rules={[{required: true, message: 'Введите адрес'}]}
        label={'Адрес'}
      >
        <Input placeholder='Адрес'/>
      </Form.Item>
    </div>
  );
}
