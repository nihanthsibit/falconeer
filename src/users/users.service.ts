import { HttpStatus, Injectable } from '@nestjs/common';
import { role_id, status } from "../constants";
import { Response } from 'express';
import { SignUpRequest } from '../types/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUser(reqBody: SignUpRequest, res: Response): Promise<object> {
    try {
      const emailInUse: boolean = await this.checkIfEmailIsInUse(reqBody.email);
      if(emailInUse) {
        res.status(HttpStatus.PRECONDITION_FAILED);
        return {
          message: `Registration unsuccessful`,
          error: `Email already in use.`
        };
      }
      const saltOrRounds = 10;
      //hash the password before adding to db
      reqBody.password  = await bcrypt.hash(reqBody.password, saltOrRounds);
      const dbObj = this.mapToDb(reqBody);
      const result = await this.addUser(dbObj);
      res.status(HttpStatus.CREATED);
      return {
        message: `Successfully created a user profile with id - ${result['user_id']}.`
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: "Error creating user profile.",
        error: error.message
      };
    }
  }

  async getUserList(res: Response): Promise<object> {
    try {
      const users = await this.getUsers();
      res.status(HttpStatus.OK);
      return users;      
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.json({
        message: 'Error fetching user list.',
        error: error.message
      });
      return;
    }
  }

  async getUserById(id: string, res: Response): Promise<object> {
    try {
      const user = await this.getSingleUser(id);
      res.status(HttpStatus.OK);
      if(user.length) {
        return user[0];
      } else {
        return {};
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.json({
        message: 'Error fetching user details.',
        error: error.message
      });
      return;
    }
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    try {
      const user = await this.getUser(email);
      if(user.length) {
        return user[0];
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async deleteUserById(id: string, res: Response) {
    try {
      let resObj;
      const user = await this.getSingleUser(id);
      if(user.length) {
        await this.usersRepository.delete({
          user_id: id
        });
        res.status(HttpStatus.OK);
        resObj = {
          message: `Deleted user ${user[0].first_name} ${user[0].last_name}`
        }
      } else {
        res.status(HttpStatus.PRECONDITION_FAILED);
        resObj = {
          message: `The user with id ${id} doesn't exist.`
        }
      }
      return resObj;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error deleting user.',
        error: error.message
      }
    }
  }

  private mapToDb(regObj) {
    return {
      first_name: regObj.first_name,
      last_name: regObj.last_name,
      email: regObj.email,
      gender: regObj.gender,
      passhash: regObj.password,
      role_id: role_id.EMPLOYEE,
      status: status.ACTIVE
    }
  }

  private async checkIfEmailIsInUse(email: string): Promise<boolean> {
    try {
      const user = await this.usersRepository.findBy({ email });
      if(user.length) {
        return true;
      } else {
        return false;
      }  
    } catch (error) {
      throw error;
    }
  }

  private async addUser(dbObj): Promise<object> {
    try {
      const user = await this.usersRepository.save(dbObj);
      console.log("ADDED USER: ",user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  private async getUsers() {
    try {
      const users = await this.usersRepository.find({
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          gender: true,
          status: true,
          created_date: true
        }
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  private async getSingleUser(id: string) {
    try {
      const user = await this.usersRepository.find({ where: {
          user_id: id
        },
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          gender: true,
          status: true,
          role_id: true,
          created_date: true
        }
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  private async getUser(email: string) {
    try {
      const user = await this.usersRepository.find({ where: {
          email: email
        },
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          gender: true,
          status: true,
          role_id: true,
          passhash: true,
          created_date: true
        }
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
