export declare class Package {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    fares: PackageFare[];
    adultInstallments: AdultInstallment[];
    childInstallments: ChildInstallment[];
    infantInstallments: InfantInstallment[];
    adultAddons: AdultAddon[];
    childAddons: ChildAddon[];
    infantAddons: InfantAddon[];
}
export declare class Slot {
    id: number;
    name: string;
    seatCount: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
    fares: PackageFare[];
    adultInstallments: AdultInstallment[];
    childInstallments: ChildInstallment[];
    infantInstallments: InfantInstallment[];
    adultAddons: AdultAddon[];
    childAddons: ChildAddon[];
    infantAddons: InfantAddon[];
}
export declare class PackageFare {
    packageId: number;
    slotId: number;
    adultFare: number;
    childFare: number;
    infantFare: number;
    createdAt: Date;
    updatedAt: Date;
    package: Package;
    slot: Slot;
}
export declare class AdultInstallment {
    packageId: number;
    slotId: number;
    firstInstallment: number;
    firstInstallmentDueDate: Date;
    secondInstallment: number;
    secondInstallmentDueDate: Date;
    thirdInstallment: number;
    thirdInstallmentDueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    package: Package;
    slot: Slot;
}
export declare class ChildInstallment {
    packageId: number;
    slotId: number;
    firstInstallment: number;
    firstInstallmentDueDate: Date;
    secondInstallment: number;
    secondInstallmentDueDate: Date;
    thirdInstallment: number;
    thirdInstallmentDueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    package: Package;
    slot: Slot;
}
export declare class InfantInstallment {
    packageId: number;
    slotId: number;
    firstInstallment: number;
    firstInstallmentDueDate: Date;
    secondInstallment: number;
    secondInstallmentDueDate: Date;
    thirdInstallment: number;
    thirdInstallmentDueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    package: Package;
    slot: Slot;
}
export declare class AdultAddon {
    packageId: number;
    slotId: number;
    type: string;
    fare: number;
    createdAt: Date;
    updatedAt: Date;
    package: Package;
    slot: Slot;
}
export declare class ChildAddon {
    packageId: number;
    slotId: number;
    type: string;
    fare: number;
    createdAt: Date;
    updatedAt: Date;
    package: Package;
    slot: Slot;
}
export declare class InfantAddon {
    packageId: number;
    slotId: number;
    type: string;
    fare: number;
    createdAt: Date;
    updatedAt: Date;
    package: Package;
    slot: Slot;
}
