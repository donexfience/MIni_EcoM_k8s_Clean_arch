export default (dependencies: any) => {

    const {
        userRepositories: { findUser }
    } = dependencies;

    if (!findUser) {
        throw new Error('Dependency is required for find user!');
    }

    const interactor = async (
        id: string
    ) => {
        return await findUser(id);
    }

    return { interactor }
}