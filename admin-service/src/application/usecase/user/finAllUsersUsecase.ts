export default (dependencie: any) => {

    const {
        userRepositories: { findAllUsers }
    } = dependencie;

    if (!findAllUsers) {
        throw new Error('Dependency is required for find all users!');
    }

    const interactor = async (
        page: number, limit: number
    ) => {
        return await findAllUsers(page, limit);
    }

    return { interactor }
}