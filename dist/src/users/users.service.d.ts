import { Repository } from 'typeorm';
import { User } from './user.entity';
export interface CreateUserDto {
    email: string;
    firstName: string;
    lastName: string;
}
export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
}
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User | null>;
    remove(id: number): Promise<void>;
}
