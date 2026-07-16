from cryptography.fernet import Fernet

from app.core.config import settings


class EncryptionService:

    _cipher = Fernet(
        settings.ENTRY_ENCRYPTION_KEY.encode()
    )

    @classmethod
    def encrypt(cls, text: str) -> str:

        encrypted = cls._cipher.encrypt(
            text.encode()
        )

        return encrypted.decode()

    @classmethod
    def decrypt(cls, encrypted_text: str) -> str:

        decrypted = cls._cipher.decrypt(
            encrypted_text.encode()
        )

        return decrypted.decode()