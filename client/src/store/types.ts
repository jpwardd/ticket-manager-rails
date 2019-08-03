// Auth Types
export type User = {
  firstName: string;
  lastName: string;
  email: string;
  owner: boolean;
  manager: boolean;
  receptionist: boolean;
};

// Services Types
export interface Service {
  id: string
  name: string
  price: string
  category: string
  user: User
}

export type formElement = React.FormEvent<HTMLFormElement>
export type inputElement = React.ChangeEvent<HTMLInputElement>