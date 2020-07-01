import { program, permisions } from './schemas';

export class staff {
    staffID: number;
    rolID: number;
    groupSecid: number[];
    userName: string;
    password: string;
    lastName: string;
    firstName: string;
    displayName: string;
    reportsToID: number;
    active: boolean;
    locationID: number;
    programTypes: program[];
    sex: string;
    systemUserId: number;
    languages: string[];
    staffSched: {
        StartH: string[],
        EndH: string[],
        StartDate: Date,
        EndDate: Date,
        WeekDays: string
    };
}

export class staffPermisions {
    staffID: number;
    staffPermisions: permisions[];
    rolId: number;
    groupsIds: number[];
}

export class staffSched {
    noSchedule: boolean;
};