import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

export const ByodMenu =()=> {
    const items: MenuItem[] = [
        {
            label: 'DHIS2',
            items: [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-table',
                    url: "/"
                }
            ]
        },
        {
            label: 'Reports',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    url: "#/new"
                },
                {
                    label: 'Search',
                    icon: 'pi pi-search',
                    url: "#/"
                }
            ]
        },
        {
            label: 'User Groups',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-cog',
                    url: "#/user"
                },
                {
                    label: 'List',
                    icon: 'pi pi-search',
                    url:"#/user_list"
                }
            ]
        }
    ];

    return (
        <div className="flex w-full h-full">
            <Menu model={items} />
        </div>
    )
}
        