import { ByodDataTable } from './DataTable';
import { ByodMenu } from './Menu';

export const DataList =()=> {
  return (
    <div className='card flex w-full flex-row gap-2'>
      <div className='flex w-15rem flex-column'>
        <ByodMenu/>
      </div>
      <div className='card flex w-full flex-column gap-2'>
        <div className='p-4 font-large font-bold text-primary-50 align-items-center justify-content-center'>Automated Report</div>
        <ByodDataTable/>
      </div>
    </div>
  )
}
