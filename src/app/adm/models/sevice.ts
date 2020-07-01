export class companyServices {
    serviceId: number;
    serviceName: string;
    serviceDesc: string;
    active: boolean;
    lastUpdate: Date;
}

export class service {
    programId: number;
    programName: string;
    averageTime: string;
}

export class staffservice {
    programId: number;
    programName: string;
    averageTime: string;
    active: boolean;
    numStaff: number;
}