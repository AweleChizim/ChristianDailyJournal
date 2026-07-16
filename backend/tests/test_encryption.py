from app.encryption.encryption_service import EncryptionService

def test_encrypt_decrypt():
    text = "Today I thanked God."

    encrypted = EncryptionService.encrypt(text)

    assert encrypted != text
    assert EncryptionService.decrypt(encrypted) == text

    print("✅ Encryption works!")