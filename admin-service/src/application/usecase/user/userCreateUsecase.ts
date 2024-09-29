import { UserEntity } from "../../../domain/entities";


export default (dependencie: any) => {

  console.log("user-created ", dependencie.userRepository)
  const {
    userRepository: { createUser },
  } = dependencie;

  if (!createUser) {
    throw new Error("Dependency is required for update profile!");
  }

  console.log("user create rep", createUser);
  

  const interactor = async (data: UserEntity) => {
    console.log("calling", data, createUser);
    
    return await createUser(data);
  };
  return { interactor };
};
