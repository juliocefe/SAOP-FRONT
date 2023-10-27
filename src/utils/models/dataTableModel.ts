export interface IDatatable {
    columns: any[]
    data: any[]
    pagination: any
    rowId: string
    showEdit?: boolean
    showDelete?: boolean
    showDetail?: boolean,
    hideActions?:boolean,
    fixedActions?:boolean
}
