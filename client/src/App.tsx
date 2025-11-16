import './App.css'
import Button from './components/Button/Button'
import Card from './components/Card/Card'
import Input from './components/Input/Input'
import Loading from './components/Loading/Loading'

function App() {

  return (
    <>
      <Card hover>
        <Button size='large' loading>Day 319</Button>
        <Input placeholder='Test' error='Oh No' label='Hell nah' fullWidth/>
      </Card>
      <Card>
        <Loading size='large' fullScreen />
      </Card>
    </>
  )
}

export default App
