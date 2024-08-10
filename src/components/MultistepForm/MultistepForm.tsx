import s from './MultistepForm.module.scss';
import {initialData, useFormStore} from '@/store/form.ts';
import FirstStepForm from '@/components/MultistepForm/Steps/FirstStepForm.tsx';
import SecondStepForm from '@/components/MultistepForm/Steps/SecondStepForm.tsx';
import ThirdStepForm from '@/components/MultistepForm/Steps/ThirdStepForm.tsx';
import {Button, Form, message, Modal} from 'antd';
import {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {createRequestFetcher} from '@/api/request.ts';
import {useNavigate} from 'react-router-dom';

export default function MultistepForm({step}: { step: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {formData, setFormData} = useFormStore();
  const [form] = Form.useForm();

  const {mutate, isPending,} = useMutation({mutationFn: createRequestFetcher});
  const navigate = useNavigate();

  useEffect(() => form.resetFields(), [form, formData]);

  const onNextStepHandler = async () => {
    try {
      await form.validateFields();
      const formValues = form.getFieldsValue();
      setFormData({...formData, ...formValues})
    } catch {
      return;
    }

    if (step === 3) {
      mutate(
        {title: `${formData?.name} ${formData?.surname}`,},
        {
          onSuccess: () => setIsModalOpen(true),
          onError: () => message.error('Ошибка сервера')
        },
      );

      return;
    }

    navigate(`/${step + 1}`);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return <FirstStepForm/>
      case 2:
        return <SecondStepForm/>;
      case 3:
        return <ThirdStepForm/>;
      default:
        return <FirstStepForm/>;
    }
  };

  return (
    <div className={s.root}>
      <Form
        form={form}
        scrollToFirstError
        className={s.form}
        initialValues={{...formData}}
        layout={'vertical'}
      >
        <h2>Шаг {step}</h2>
        {renderForm()}
      </Form>
      <div className={s.buttons}>
        <Button
          disabled={step === 1}
          type='primary'
          onClick={() => {
            if (step === 1) return;
            navigate(`/${step - 1}`);
          }}
        >
          Назад
        </Button>
        <Button
          type='primary'
          loading={isPending}
          onClick={onNextStepHandler}
        >
          {step === 3 ? 'Подать заявку' : 'Вперед'}
        </Button>
      </div>
      <Modal
        title={'Заявка успешно отправлена'}
        open={isModalOpen}
        centered
        footer={null}
        closeIcon={false}
      >
        <p className={s.modalCaption}>Поздравляем, {formData?.name} {formData?.surname}. Вам одобрена сумма {formData?.sum} на
          срок {formData?.time} дней!</p>
        <Button
          type='primary'
          onClick={() => {
            setFormData(initialData);
            setIsModalOpen(false);
            form.resetFields();
            navigate(`/1`, {replace: true});
          }}
        >
          Отлично
        </Button>
      </Modal>
    </div>
  );
}
