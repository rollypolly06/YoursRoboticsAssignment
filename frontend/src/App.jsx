import './App.css'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <div className='flex flex-col items-center max-h-screen'>
      <Header/>
      <section className='main-section flex flex-col items-center justify-between mt-16 w-full lg:w-[100vw] h-[90vh] max-h-[90vh] gap-4 p-4'>
        <Dashboard/>
      </section>
      <Footer version={"0.1.0"}/>
    </div>
  )
}

export default App