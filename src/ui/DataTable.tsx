
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export interface Report {
    id: string;
    code?: string;
    name: string;
    description?: string;
    lastupdated?: string;
    created?: string;
    owner?: string;
    status?: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' | string;

}

export const ByodDataTable =()=>{
 const [data, _setData] = useState<Report[]>([]);
    return (
        <div className="card">
            <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="created" header="Created"></Column>
                <Column field="lastupdated" header="Last Updated"></Column>
                <Column field="owner" header="Owner"></Column>
                <Column field="status" header="Status"></Column>
            </DataTable>
        </div>
    );
}
        