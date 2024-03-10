import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/utils/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true })
  @IsString()
  readonly name: string;

  @Column()
  @IsEmail()
  readonly email: string;

  //   @Column()
  //   readonly password: string

  //   @Column()
  //   @IsBoolean()
  //   emailVerified: boolean;

  @Column()
  @IsEnum(Role)
  readonly role: Role;

  //   @IsString()
  //   phone: string;

  //   @Column()
  //   @IsString()
  //   readonly job?: string;

  //   @Column()
  //   @IsString()
  //   readonly manager?: string;

  //   @Column()
  //   @IsString()
  //   readonly department?: string;

  //   @Column()
  //   @IsString()
  //   @IsOptional()
  //   readonly refresh_token?: string;

  //   balances: Balances[];
}
