export interface Patient {
  id: string;
  name: string;
  age: number;
  schoolYear: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  phoneNumber: string;
  motherName: string;
  fatherName?: string;
}
