
export type Notification = {

    id: number,
    data: {
      name: string,
      order_id: string,
      url: string,
      product_name: string,
    },
    created_at: Date,

}
export type Props = {
  notifications:Notification[];
  user:User;
}

export type Password = {
  current_password:string,
  new_password:string,
  confirm_password:string,
}
export type User = {
  id?:number;
  name:string;
  email:string;
  phone:string;
  role:string;
  company:CompanyType,
  created_at?:string
}
export type CompanyType = {
  id?:number;
  name:string;
  logo:string;
  address: string;
}
export type Employee = {
  id?:number,
    position:string,
    start_date:Date,
    end_date:Date,
    salary:number,
    departement:string,
    user:User,
    projects?:Project[],
    tasks?:Task[],
}

export type Project  = {
  id?:number,
  company:string,
  project_manager:string,
  name:string,
  description:string,
  start_date:Date,
  end_date:Date,
}

export type Task  = {
  id ?:number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: Date;
  assigned_to: object | number | string;
  project_id?:number,
  completed_at:Date,
  project?:string,
}

export type Credentials = {
  email:string,
  password:string
}
