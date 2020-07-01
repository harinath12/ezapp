import { client } from './client';

export class parameters {
    Page: number;
    PageSize: number;
    Total: number;
}

export class clientPagination {
    Parameters: parameters;
    Clients: client[];
}

export class group {
    delLocations: string[];
    groupActive: boolean;
    groupCode: string;
    groupDesc: string;
    groupID: number;
    groupName: string;
    groupPermisions: permisions[];
    indvRights: boolean;
    lastUpdate: string;
    modUser: number;
    selLocations: string[];
    skillGroup: boolean;
}

export class permisions {
    key: number;
    edit: boolean;
    view: boolean;
}

export class program {
    programId: number;
    programName: string;
    programCode: string;
    programType: string;
    capacity: number;
    averageTime: string;
    actualCharge: number;
    effectiveDate: Date;
    expirationDate: Date;
    programDesc: string;
    activeFlag: boolean;
    clientAcessibleFlag: boolean;
    scheduleAvailableFlag: boolean;
}

export class location {
    DepartmentID: number;
    PhoneNum: string;
    locationId: number;
    locationName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    locationContactInfo: string;
    active: boolean;
    groupid: number;
    departmentId:number;
}

export class genericFields {
    public cod: string;
    public value: string;
    public content: any;
    constructor(cod: string = 'EN', val: string = 'English', xcon: any = 'EN') {
        this.cod = cod;
        this.value = val;
        this.content = xcon
    }
}

export class status {
    tlkId: number;
    tlkName: string;
    active: boolean;
    modUser: number;
}

export class genericFieldsCombo {
    public cod: boolean;
    public value: string;
    public content: any;
    constructor(cod: boolean = false, val: string = 'English', xcon: any = 'EN') {
        this.cod = cod;
        this.value = val;
        this.content = xcon
    }
}
export class calendar {
    startDate: Date;
    groupID: number;
    DepartmentID: number;
    locationId: number;
    programId: number;
}