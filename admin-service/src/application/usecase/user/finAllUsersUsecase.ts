export default (dependencies: any) => {

    const {
        userRepositories: { FindAllUser }
    } = dependencies;

    if (!FindAllUser) {
        throw new Error('Dependency is required for find all users!');
    }

    const interactor = async (
        page: number, limit: number
    ) => {
        return await FindAllUser(page, limit);
    }

    return { interactor }
}