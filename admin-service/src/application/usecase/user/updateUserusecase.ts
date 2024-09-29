
export default (dependencie: any) => {
  console.log(dependencie.userRepository,"ddud")
  const {
    userRepository: { updateProfile },
  } = dependencie;

  if (!updateProfile) {
    throw new Error("Dependency is required for update profile!");
  }

  const interactor = async (
    email:string ,
    data: {
      name: string;
      email: string;
    }
  ) => {
    return await updateProfile(email, data);
  };
  return { interactor };
};
