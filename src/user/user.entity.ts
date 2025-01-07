import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    avatar: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ select: false })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }

}