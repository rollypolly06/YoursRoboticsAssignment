import './App.css'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Dashboard from './components/Dashboard'
import { useState } from 'react'
import FileUploader from './components/FileUpload'


function App() {

  const [showUpload, setShowUpload] = useState(false);

  const toggleShowUpload = () => {
    setShowUpload(!showUpload);
  }
  
  return (
    <div className='flex flex-col items-center max-h-screen'>
      <Header toggleShowUpload={toggleShowUpload} />
      <section className='main-section flex flex-col items-center justify-between mt-16 w-full lg:w-[100vw] h-[90vh] max-h-[90vh] gap-4 p-4'>
        <Dashboard/>
      </section>

      {showUpload && <FileUploader onClose={() => {setShowUpload(false)}}/>}
      <Footer version={"1.0.0"}/>
    </div>
  )
}

export default App