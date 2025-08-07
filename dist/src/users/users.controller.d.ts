import { UsersService } from './users.service';
import type { CreateUserDto, UpdateUserDto } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    findAll(): Promise<import("./user.entity").User[]>;
    findOne(id: number): Promise<import("./user.entity").User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("./user.entity").User | null>;
    remove(id: number): Promise<void>;
}
