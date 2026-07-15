from app.models.user import User


class UserRepository:

    @staticmethod
    async def get_by_email(email: str):
        return await User.find_one(User.email == email)

    @staticmethod
    async def get_by_id(user_id: str):
        return await User.get(user_id)

    @staticmethod
    async def create(user: User):
        await user.insert()
        return user