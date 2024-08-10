import {Route, Routes, Navigate} from 'react-router-dom';
import MultistepForm from '@/components/MultistepForm/MultistepForm.tsx';

export default function App() {
  return (
    <div className='layout'>
      <Routes location={location}>
        <Route index path='/1' element={<MultistepForm step={1}/>}/>
        <Route index path='/2' element={<MultistepForm step={2}/>}/>
        <Route index path='/3' element={<MultistepForm step={3}/>}/>
        <Route path='*' element={<Navigate to='/1' replace={true}/>}/>
      </Routes>
    </div>
  );
}
