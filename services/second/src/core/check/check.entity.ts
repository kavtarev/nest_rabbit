import { Column, Entity, PrimaryGeneratedColumn } from '@nest_rabbit/nest';

@Entity({ name: 'check_users' })
export class CheckEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    userId: string;
}
