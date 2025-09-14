import {
  ByodMenu 
} from './ui';
/**
 * The main component of the application, which renders a menu
 * on the left, and a card on the right, which contains a form
 * with various byod controls, and three buttons to save, publish,
 * or cancel the form.
 */
export const App =({ children }: any )=> {
  return (
    <div className='card flex w-full flex-row gap-2'>
      <div className='flex w-15rem flex-column'>
        <ByodMenu/>
      </div>
      { children }
    </div>
  )
}

export default App
