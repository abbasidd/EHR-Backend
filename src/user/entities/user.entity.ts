import {
  BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany
} from 'typeorm';
import { UserRole } from '../user-roles.enum';
import * as bcrypt from 'bcryptjs';
@Entity('')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  Fullname: string;

  @Column({ nullable: true })
  Email: string;

  @Column({ nullable: true })
  Password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  Role: UserRole;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  patientID: string;

  @Column({ default: false })
  isActive: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.Password = await bcrypt.hash(this.Password, 8)
  }
  async validatePassword(Password: string): Promise<boolean> {
    return bcrypt.compare(Password, this.Password)
  }
}