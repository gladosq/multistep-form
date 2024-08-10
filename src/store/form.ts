import {persist} from 'zustand/middleware';
import {create} from 'zustand';

export const DEFAULT_START_SUM = 300;
export const DEFAULT_TIME = 25;

type FieldType = string | null;

type FormData = {
  phone: FieldType;
  name: FieldType;
  surname: FieldType;
  gender: FieldType;
  job: FieldType;
  address: FieldType;
  sum: number;
  time: number;
};

export const initialData = {
  phone: null,
  name: null,
  surname: null,
  gender: null,
  address: null,
  job: null,
  sum: DEFAULT_START_SUM,
  time: DEFAULT_TIME,
}

type FormState = {
  formData: FormData;
  setFormData: (value: FormData) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      formData: initialData,
      setFormData: (value) => set({formData: value}),
    }),
    {name: 'formValues'}
  )
);
